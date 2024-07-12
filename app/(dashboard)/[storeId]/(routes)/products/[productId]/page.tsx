import db from "@/lib/db";
import React from "react";
import ProductForm from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = params;

  const products = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={products} />
      </div>
    </div>
  );
};

export default ProductPage;
