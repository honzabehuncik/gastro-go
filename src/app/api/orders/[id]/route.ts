import { auth } from "@/auth";
import { getOrders } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }){
    const { id } = params
    const session = await auth()
    
    
    if(!session?.user && session?.user.role !== "Admin"){
        return NextResponse.json(
            {
                error: "Unauthorized"
            }, {status: 401}
        );
    }
    if(!params.id){
        return NextResponse.json(
            {
                error: "userId nevyplněno"
            }, {status: 400}
        );
    }

    const order = await getOrders(params.id)


    return NextResponse.json(order)
}