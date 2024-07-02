import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required!", {
        status: 400,
      });
    }

    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST_ERROR]", error);
    return new NextResponse("INTERNAL_STORES_POST_ERROR", {
      status: 500,
    });
  }
};
