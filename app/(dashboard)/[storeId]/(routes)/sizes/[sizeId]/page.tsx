import prismadb from "@/lib/prismadb";
import SizeForm from "./components/size-form";

const SizePage = async ({
  params: { sizeId },
}: {
  params: { sizeId: string };
}) => {
  const sizes = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
};

export default SizePage;
