import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required!", { status: 400 });
    }

    const colors = await db.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_GET_ERROR]", error);
    return new NextResponse("INTERNAL_COLOR_GET_ERROR", {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    if (!params.colorId) {
      return new NextResponse("Colors id is required!", { status: 400 });
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

    const colors = await db.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_PATCH_ERROR]", error);
    return new NextResponse("COLOR_BILLBOARD_PATCH_ERROR", {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { userId } = auth();
    console.log("params.colorId", params);

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required!", { status: 400 });
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

    const colors = await db.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_DELETE_ERROR]", error);
    return new NextResponse("INTERNAL_COLOR_DELETE_ERROR", {
      status: 500,
    });
  }
};
