import { NextResponse } from "next/server";
import { createPrismaClient } from "@/lib/prisma";
import { auth } from "@/auth";
import { addToCartDB } from "@/lib/db";
import { headers } from "next/headers";

const prisma = createPrismaClient();


export async function GET(request:Request){
    const session = await auth()
    const headersList = headers()
    const key = headersList.get('API-KEY')
    
    
    if((!session?.user && session?.user.role !== "Admin") || key != process.env.DATA_API_KEY){
        return NextResponse.json(
            {
                error: "Unauthorized"
            }, {status: 401}
        );
    }

    const user = await prisma.user.findMany({
    })

}

export async function POST(request:Request){
    const data = await request.json();
    const session = await auth()
    
    const headersList = headers()
    const key = headersList.get('API-KEY')
    
    
    if((!session?.user && session?.user.role !== "Admin") || key != process.env.DATA_API_KEY){
        return NextResponse.json(
            {
                error: "Unauthorized"
            }, {status: 401}
        );
    }
    if(!data.userId && !data.role){
        return NextResponse.json(
            {
                error: "userId/role nevyplněno"
            }, {status: 400}
        );
    }
    const user = await prisma.user.update({
        where:{
            id: data.userId as string
        },
        data:{
            role: data.role
        }
    })
    return NextResponse.json(user)
}