import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
