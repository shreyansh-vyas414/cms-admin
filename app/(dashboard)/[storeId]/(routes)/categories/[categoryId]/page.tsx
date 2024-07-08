import db from "@/lib/db";
import React from "react";
import CategoriesForm from "./components/category-form";

const CategoriesPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const { categoryId, storeId } = params;

  const category = await db.categories.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoriesPage;
