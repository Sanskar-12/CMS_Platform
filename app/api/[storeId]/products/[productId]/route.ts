import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(`[SINGLE_PRODUCT_GET]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      images,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is Required", { status: 400 });
    }

    if (!images || images.length === 0) {
      return new NextResponse("Images is Required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is Required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is Required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size Id is Required", { status: 400 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(`[PRODUCT_PATCH]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(`[PRODUCT_DELETE]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
