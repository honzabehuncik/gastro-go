import { NextResponse } from "next/server";
import { createPrismaClient } from "@/lib/prisma";
import { auth } from "@/auth";
import { addToCartDB } from "@/lib/db";

const prisma = createPrismaClient();


export async function GET(request:Request){
    const session = await auth()
    if(!session?.user && session?.user.role !== "Admin"){
        return NextResponse.json(
            {
                error: "Unauthorized"
            }, {status: 401}
        );
    }
    const orders = await prisma.customerOrder.findMany({
        include: {
            orderItems: {
                include: {
                    menu: true
                }
            },
            user: true,
            restaurant: true
        }
    })
    return NextResponse.json(orders)
}

export async function POST(request:Request){
    const data = await request.json();
    const session = await auth()
    
    
    if(!session?.user && session?.user.role !== "Admin"){
        return NextResponse.json(
            {
                error: "Unauthorized"
            }, {status: 401}
        );
    }
    if(!data.userId || !data.itemId){
        return NextResponse.json(
            {
                error: "userId nebo itemId nevyplněno"
            }, {status: 400}
        );
    }
    const order = addToCartDB(data.itemId, data.userId)
    return NextResponse.json(order)
}