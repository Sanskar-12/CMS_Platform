import prismadb from "@/lib/prismadb";
import ColorForm from "./components/color-form";

const ColorPage = async ({
  params: { colorId },
}: {
  params: { colorId: string };
}) => {
  const colors = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={colors} />
      </div>
    </div>
  );
};

export default ColorPage;
