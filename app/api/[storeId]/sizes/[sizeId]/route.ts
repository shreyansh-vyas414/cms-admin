import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { sizeId: string } }
) => {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required!", { status: 400 });
    }

    const sizes = await db.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET_ERROR]", error);
    return new NextResponse("INTERNAL_SIZES_GET_ERROR", {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required!", {
        status: 400,
      });
    }
    if (!value) {
      return new NextResponse("Value is required!", {
        status: 400,
      });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required!", { status: 400 });
    }

    const storeByUserId = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UNAUTHROZED", {
        status: 403,
      });
    }

    const size = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_PATCH_ERROR]", error);
    return new NextResponse("SIZES_BILLBOARD_PATCH_ERROR", {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();
    console.log("params.billboardid", params);

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required!", { status: 400 });
    }

    const storeByUserId = db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UNAUTHROZED", {
        status: 403,
      });
    }

    const sizes = await db.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_DELETE_ERROR]", error);
    return new NextResponse("INTERNAL_SIZES_DELETE_ERROR", {
      status: 500,
    });
  }
};
