import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required!", { status: 400 });
    }

    const category = await db.categories.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET_ERROR]", error);
    return new NextResponse("INTERNAL_CATEGORY_GET_ERROR", {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required!", {
        status: 400,
      });
    }
    if (!billboardId) {
      return new NextResponse("Billboard id is required!", {
        status: 400,
      });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required!", { status: 400 });
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

    const category = await db.categories.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH_ERROR]", error);
    return new NextResponse("INTERNAL_CATEGORY_PATCH_ERROR", {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("CAtegory id is required!", { status: 400 });
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

    const category = await db.categories.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE_ERROR]", error);
    return new NextResponse("INTERNAL_CATEGORY_DELETE_ERROR", {
      status: 500,
    });
  }
};
