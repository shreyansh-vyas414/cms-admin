import db from "@/lib/db";
import React from "react";
import SizeForm from "./components/size-form";

const SizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const { sizeId } = params;

  const sizes = await db.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
};

export default SizePage;
