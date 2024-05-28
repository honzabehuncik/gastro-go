import { auth } from "@/auth";
import { delOrder, getOrders, updateOrderQuantity } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }){
    const { id } = params
    const session = await auth()
    const headersList = headers()
    const key = headersList.get('API_KEY')
    
    
    if((!session?.user && session?.user.role !== "Admin") || key != process.env.DATA_API_KEY){
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


export async function POST(request: Request, { params }: { params: { id: string } }){
    const { id } = params
    const data = await request.json();
    const session = await auth()
    
    const headersList = headers()
    const key = headersList.get('API_KEY')
    
    
    if((!session?.user && session?.user.role !== "Admin") || key != process.env.DATA_API_KEY){
        return NextResponse.json(
            {
                error: "Unauthorized"
            }, {status: 401}
        );
    }
    if(!params.id || !data.itemId || !data.quantity){
        return NextResponse.json(
            {
                error: "userId/itemId/quantity nevyplněno"
            }, {status: 400}
        );
    }

    const order = await updateOrderQuantity(params.id, data.itemId, data.quantity)


    return NextResponse.json(order)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    const { id } = params
    const data = await request.json();
    const session = await auth()
    
    const headersList = headers()
    const key = headersList.get('API_KEY')
    
    
    if((!session?.user && session?.user.role !== "Admin") || key != process.env.DATA_API_KEY){
        return NextResponse.json(
            {
                error: "Unauthorized"
            }, {status: 401}
        );
    }
    if(!params.id || !data.itemId){
        return NextResponse.json(
            {
                error: "userId/itemId nevyplněno"
            }, {status: 400}
        );
    }

    const order = await delOrder(params.id, data.itemId)

    return NextResponse.json(order)
}