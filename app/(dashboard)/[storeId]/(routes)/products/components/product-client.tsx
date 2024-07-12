"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { ProductColumns, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import Image from "next/image";
import { ApiList } from "@/components/api-list";

interface ProductClientProps {
  data: ProductColumns[];
}

const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const { storeId } = params;

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          variant={"outline"}
          onClick={() => router.push(`/${storeId}/products/new`)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      {data.length ? (
        <DataTable columns={columns} data={data} searchKey="label" />
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Image
            src={require("../../../../../../public/empty.png")}
            alt="empty"
            width={250}
            height={250}
          />
          <h3 className="text-center tracking-tighter w-full text-slate-500 text-2xl">
            No products found
            <br />
            Please create new one.
          </h3>
        </div>
      )}
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
