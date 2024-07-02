import db from "@/lib/db";
import React, { FC } from "react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const { storeId } = params;

  const store = await db.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
