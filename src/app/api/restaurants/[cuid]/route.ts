import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
 
const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { cuid: string } }){
    const restaurants = await prisma.restaurant.findMany({
        where:{
            id: params.cuid
        }
    })

    return NextResponse.json(restaurants)
}