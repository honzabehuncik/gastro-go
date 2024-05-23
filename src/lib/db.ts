import { createPrismaClient } from "@/lib/prisma";

const prisma = createPrismaClient();

export async function getRestaurants(){
    const restaurants = await prisma.restaurant.findMany({
        include: {
            badges: true
        }
    })
    return restaurants
}

export async function getCustomerOrder() {
    const customerOrder = await prisma.customerOrder.findMany({
    })
    return customerOrder
}