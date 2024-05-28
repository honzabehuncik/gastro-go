import { createPrismaClient } from "@/lib/prisma";

const prisma = createPrismaClient();

export async function getRestaurants() {
    const restaurants = await prisma.restaurant.findMany({
        include: {
            badges: true
        }
    });
    return restaurants;
}

export async function getUser(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            orders: true
        }
    });

    return user;
}

export async function getCustomerOrder() {
    const customerOrder = await prisma.customerOrder.findMany({
        include: {
            restaurant: true,
            orderItems: {
                include: {
                    menu: true
                }
            },
            driver: true,
            status: true,
        }
    });
    return customerOrder;
}

export async function getCustomerOrderRestaurant() {
    const customerOrder = await prisma.customerOrder.findMany({
        where: {
            statusId: 'clwj4ynrt00025cjp41o2zuge'
        },
        include: {
            restaurant: true,
            orderItems: {
                include: {
                    menu: true
                }
            },
            driver: true,
            status: true,
        }
    });
    return customerOrder;
}

export async function getCustomerOrderDriver() {
    const customerOrder = await prisma.customerOrder.findMany({
        where: {
            statusId: 'clwq0pv890000siwaxfcxp85g'
        },
        include: {
            restaurant: true,
            orderItems: {
                include: {
                    menu: true
                }
            },
            driver: true,
            status: true,
        }
    });
    return customerOrder;
}

export async function getRestaurant(shortName: string) {
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
    });

    return restaurant.length > 0 ? restaurant[0] : null;
}

export async function getItem(id: string) {
    const item = await prisma.menu.findUnique({
        where: {
            id: id
        },
        include: {
            category: {
                include: {
                    restaurant: true
                }
            }
        }
    });

    return item;
}

export async function addToCartDB(id: string, userId: string) {
    const menu = await getItem(id);
    const user = await getUser(userId);

    if (user?.orders && user.orders.length <= 0) {
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

            const itemOrder = await prisma.orderItem.findFirst({
                where: {
                    orderId: customerOrder.id,
                    menuId: menu.id
                }
            });

            if (itemOrder) {
                const updatedItemOrder = await prisma.orderItem.update({
                    where: {
                        id: itemOrder.id
                    },
                    data: {
                        quantity: itemOrder.quantity + 1
                    },
                    include: {
                        order: true,
                        menu: true
                    }
                });
                return updatedItemOrder;
            } else {
                const newItemOrder = await prisma.orderItem.create({
                    data: {
                        orderId: customerOrder.id,
                        menuId: menu.id,
                        quantity: 1,
                        itemPrice: menu.price
                    },
                    include: {
                        order: true,
                        menu: true
                    }
                });
                return newItemOrder;
            }

            return itemOrder;
        } else {
            console.log("success");
        }
    } else {
        const customerOrder = user?.orders[0];
        const customerOrderId = customerOrder?.id;
        console.log(menu?.category?.restaurant?.id);

        if (menu?.category?.restaurant?.id && customerOrderId) {
            const itemOrder = await prisma.orderItem.create({
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
            });
            return itemOrder;
        }
    }
}

export async function getOrders(id: string) {
    const user = await getUser(id);
    const order = user?.orders[0];
    const orderId = order?.id;

    const orders = await prisma.customerOrder.findMany({
        where: {
            id: orderId
        },
        include: {
            orderItems: {
                include: {
                    menu: true
                }
            },
            restaurant: true,
            user: true
        }
    });
    return orders;
}

export async function createRequestUser(userId: string, userName: string) {
    try {
        const newRequest = await prisma.requests.create({
            data: {
                userId: userId,
                userName: userName
            },
        });
        return newRequest;
    } catch (error) {
        console.error('Error creating request:', error);
        throw error;
    }
}

export async function createRequestRestaurant(restaurantId: string, restaurantName: string, restaurantEmail: string, restaurantNumber: number, restaurantOpenTime: Date, restaurantCloseTime: Date) {
    try {
        const newRequest = await prisma.requests.create({
            data: {
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                restaurantEmail: restaurantEmail,
                restaurantNumber: restaurantNumber,
                restaurantOpenTime: restaurantOpenTime,
                restaurantCloseTime: restaurantCloseTime
            },
        });
        return newRequest;
    } catch (error) {
        console.error('Error creating request:', error);
        throw error;
    }
}

export async function getAllRequests() {
    const requests = await prisma.requests.findMany()
    
    return requests;
}



export async function getItemsToCart(userId: string){
    let orders = await getOrders(userId)
    let order
    if(orders && orders.length > 0){
        order = orders[0].orderItems 
        return order
    }
    return null
}