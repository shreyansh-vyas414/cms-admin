"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import Image from "next/image";
import { ApiList } from "@/components/api-list";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient: FC<CategoriesClientProps> = ({ data }) => {
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
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button
          variant={"outline"}
          onClick={() => router.push(`/${storeId}/categories/new`)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      {data.length ? (
        <DataTable columns={columns} data={data} searchKey="name" />
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Image
            src={require("../../../../../../public/empty.png")}
            alt="empty"
            width={250}
            height={250}
          />
          <h3 className="text-center tracking-tighter w-full text-slate-500 text-2xl">
            No categories found
            <br />
            Please create new one.
          </h3>
        </div>
      )}
      <Heading title="API" description="API calls for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoriesClient;
