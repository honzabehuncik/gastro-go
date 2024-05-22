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