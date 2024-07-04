import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!params.storeId) {
      return new NextResponse("Store ID is required!", {
        status: 400,
      });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UNAUTHENTICATED", {
        status: 403,
      });
    }

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST_ERROR]", error);
    return new NextResponse("INTERNAL_BILLBOARD_POST_ERROR", {
      status: 500,
    });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required!", {
        status: 400,
      });
    }

    const billboards = await db.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_GET_ERROR]", error);
    return new NextResponse("INTERNAL_BILLBOARD_GET_ERROR", {
      status: 500,
    });
  }
};
