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

export async function getRestaurant(shortName: string){
    const restaurant = await prisma.restaurant.findMany({
        where: {
            shortName: shortName
        },
        include: {
            badges: true,
            Category: {
                include: {
                    menus: true
                }
            }
        }
    })

    return restaurant.length > 0 ? restaurant[0] : null
}