import prismadb from "@/lib/prismadb";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>This is a Dashboard Active Store : {store?.name}</div>;
};

export default DashboardPage;
