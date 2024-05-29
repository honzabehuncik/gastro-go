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
            statusId: 'clwj4ynrv00035cjptyk5a0dt'
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

    if (!menu) {
        throw new Error('Menu item not found');
    }

    let customerOrder;

    // Check if user has any orders
    if (user?.orders && user.orders.length > 0) {
        customerOrder = user.orders[0];
    } else {
        // Create a new customer order if none exists
        if (menu.category?.restaurant?.id) {
            customerOrder = await prisma.customerOrder.create({
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
        } else {
            throw new Error('Restaurant not found for the menu item');
        }
    }

    if (!customerOrder) {
        throw new Error('Customer order not found or could not be created');
    }

    // Check if the order item already exists in the order
    const existingOrderItem = await prisma.orderItem.findFirst({
        where: {
            orderId: customerOrder.id,
            menuId: menu.id
        }
    });

    if (existingOrderItem) {
        // If the order item exists, increase the quantity
        const updatedOrderItem = await prisma.orderItem.update({
            where: {
                id: existingOrderItem.id
            },
            data: {
                quantity: existingOrderItem.quantity + 1
            },
            include: {
                order: true,
                menu: true
            }
        });
        return updatedOrderItem;
    } else {
        // If the order item does not exist, create a new one
        const newOrderItem = await prisma.orderItem.create({
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
        return newOrderItem;
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

export async function updateOrderQuantity(userId: string, itemId: any, quantity: any){
    const customerOrder = await prisma.customerOrder.findFirst({
        where: {
            userId: userId
        }
    });
    const item = await prisma.orderItem.findFirst({
        where: {
            orderId: customerOrder!.id,
            menuId: itemId
        }
    })
    const order = await prisma.orderItem.update({
        where: {
            id: item!.id
        },
        data: {
            quantity: quantity
        }
    })
    return order
}

export async function updateStatus(userId: string, statusId: string){
    const user = await getUser(userId); 

    if (user && user.orders && user.orders.length > 0) {
        const order = user.orders.find(o => o.id); 
    
        if (order) {
            const status = await prisma.customerOrder.update({
                where: {
                    id: order.id
                },
                data: {
                    statusId: statusId
                }
            });
            return status
        } else {
            console.error('Order not found');
        }
    } else {
        console.error('User or orders not found');
    }

}

export async function delOrder(userId: string, itemId: string){
    const customerOrder = await prisma.customerOrder.findFirst({
        where: {
            userId: userId
        }
    });
    const item = await prisma.orderItem.findFirst({
        where: {
            orderId: customerOrder!.id,
            menuId: itemId
        }
    })
    const order = await prisma.orderItem.delete({
        where: {
            id: item!.id
        }
    })

    return order

}