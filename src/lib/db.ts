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

export async function getUser(id: string){
    const user = await prisma.user.findUnique({
        where:{
            id: id
        },
        include:{
            orders: true
        }
    })

    return user
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

export async function getItem(id: string){
    const item = prisma.menu.findUnique({
        where:{
            id: id
        },
        include: {
            category:{
                include:{
                    restaurant: true
                }
            }
        }
    })

    return item
}

export async function addToCartDB(id: string, userId: string){
    const menu = await getItem(id)
    const user = await getUser(userId)

    if(user?.orders && user.orders.length <= 0){
        if (menu?.category?.restaurant?.id) {
            const customerOrder = await prisma.customerOrder.create({
                data: {
                    userId: userId,
                    restaurantId: menu.category.restaurant.id,
                    statusId: "clwj4ynrt00025cjp41o2zuge",
                },
                include: {
                    status: true,
                    restaurant: true,
                    user: true
                }
            });

            const itemOrder = prisma.orderItem.create({
                data:{
                    orderId: customerOrder.id,
                    menuId: menu.id,
                    quantity: 1,
                    itemPrice: menu.price
                },
                include: {
                    order: true,
                    menu: true
                }
            })

            return itemOrder
        } else {
            console.log("success")
        }
    } else{
        const customerOrder = user?.orders[0]
        const customerOrderId = customerOrder?.id
        console.log(menu?.category?.restaurant?.id)

        if (menu?.category?.restaurant?.id && customerOrderId) {

            const itemOrder = prisma.orderItem.create({
                data: {
                    orderId: customerOrderId,
                    menuId: menu.id,
                    quantity: 1,
                    itemPrice: menu.price
                },
                include: {
                    order: true,
                    menu: true
                }
            })
            return itemOrder
        }
        
    }
}
