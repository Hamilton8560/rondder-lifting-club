import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { defaultProducts, Product } from "@/lib/products";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function getProducts(): Promise<Product[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // First run — write defaults
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultProducts, null, 2));
    return defaultProducts;
  }
}

async function saveProducts(products: Product[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
}

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function PUT(request: Request) {
  const products: Product[] = await request.json();
  await saveProducts(products);
  return NextResponse.json({ success: true, products });
}

export async function POST(request: Request) {
  const newProduct: Product = await request.json();
  const products = await getProducts();
  products.push(newProduct);
  await saveProducts(products);
  return NextResponse.json({ success: true, products });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let products = await getProducts();
  products = products.filter((p) => p.id !== id);
  await saveProducts(products);
  return NextResponse.json({ success: true, products });
}
