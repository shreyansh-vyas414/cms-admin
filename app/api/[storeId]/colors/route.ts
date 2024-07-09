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

    const colors = await db.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_POST_ERROR]", error);
    return new NextResponse("INTERNAL_COLORS_POST_ERROR", {
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

    const colors = await db.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET_ERROR]", error);
    return new NextResponse("INTERNAL_COLORS_GET_ERROR", {
      status: 500,
    });
  }
};
