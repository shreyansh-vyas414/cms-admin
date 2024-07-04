import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { billboardId: string } }
) => {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required!", { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET_ERROR]", error);
    return new NextResponse("INTERNAL_BILLBOARD_GET_ERROR", {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required!", {
        status: 400,
      });
    }
    if (!imageUrl) {
      return new NextResponse("Image is required!", {
        status: 400,
      });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required!", { status: 400 });
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

    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH_ERROR]", error);
    return new NextResponse("INTERNAL_BILLBOARD_PATCH_ERROR", {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();
    console.log("params.billboardid", params);

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required!", { status: 400 });
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

    const billboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE_ERROR]", error);
    return new NextResponse("INTERNAL_BILLBOARD_DELETE_ERROR", {
      status: 500,
    });
  }
};
