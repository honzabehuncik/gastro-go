import { createPrismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

const prisma = createPrismaClient();

export async function GET(request: Request){
    const restaurants = await prisma.restaurant.findMany()

    return NextResponse.json(restaurants)
}