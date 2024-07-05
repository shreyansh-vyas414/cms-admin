import React from "react";
import BillboardClient from "./components/billboard-client";
import db from "@/lib/db";
import { BillboardColumn } from "./components/columns";
import {format} from "date-fns"

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboard = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboard.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
