// context/ShoppingCartContext.tsx
"use client"

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContextType = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: string) => number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    addToCart: (item: CartItem) => void;
    cartQuantity: number;
    cartItems: CartItem[];
    orderStatus: string | null;
    setOrderStatus: (status: string) => void;
    checkOrderStatus: (orderId: string) => void;
    clearOrder: () => void;
}

type CartItem = {
    id: string;
    quantity: number;
    name?: string;
    price?: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderStatus, setOrderStatus] = useState("");
    const { data: session } = useSession();

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    useEffect(() => {
        async function fetchData() {
            if (!session) return;

            try {
                const response = await fetch(`/api/orders/${session.user.id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'API_Key': process.env.DATA_API_KEY!,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const data = await response.json();
                const orderItems = data[0]?.orderItems.map((orderItem: any) => ({
                    id: orderItem.menu?.id || '',
                    quantity: orderItem.quantity || 0,
                    name: orderItem.menu?.name || '',
                    price: orderItem.menu?.price || 0,
                })) || [];

                setOrderStatus(data[0].statusId)

                setCartItems(orderItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }

        fetchData();
    }, [session]);

    function getItemQuantity(id: string): number {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    useEffect(() => {
        const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(quantity);
    }, [cartItems]);

    const [cartQuantity, setCartQuantity] = useState(0);

    function increaseCartQuantity(id: string) {
        setCartItems(currItems => {
            const updatedItems = currItems.map(item => {
                if (item.id === id) {
                    (async () => {
                        await fetch(`/api/orders/${session?.user.id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'API_Key': process.env.DATA_API_KEY!,
                            },
                            body: JSON.stringify({ userId: session?.user.id, itemId: id, quantity: item.quantity + 1 }),
                        });
                    })();
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });

            return updatedItems.some(item => item.id === id) ? updatedItems : [...updatedItems, { id, quantity: 1 }];
        });
    }

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(prevItem => prevItem.id === item.id);

            if (existingItem) {
                return prevItems.map(prevItem =>
                    prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    function decreaseCartQuantity(id: string) {
        setCartItems(currItems => {
            return currItems.flatMap(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity - 1;
                    if (newQuantity > 0) {
                        (async () => {
                            await fetch(`/api/orders/${session?.user.id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'API_Key': process.env.DATA_API_KEY!,
                                },
                                body: JSON.stringify({ userId: session?.user.id, itemId: id, quantity: newQuantity }),
                            });
                        })();
                        return { ...item, quantity: newQuantity };
                    } else {
                        (async () => {
                            await fetch(`/api/orders/${session?.user.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'API_Key': process.env.DATA_API_KEY!,
                                },
                                body: JSON.stringify({ userId: session?.user.id, itemId: id }),
                            });
                        })();
                        return [];
                    }
                } else {
                    return item;
                }
            });
        });
    }

    function removeFromCart(id: string) {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }

    const checkOrderStatus = async (orderId: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'API_Key': process.env.DATA_API_KEY!,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order status');
            }

            const data = await response.json();
            setOrderStatus(data.statusId);
        } catch (error) {
            console.error('Error fetching order status:', error);
        }
    };

    const clearOrder = () => {
        setOrderStatus("Doručeno");
        setCartItems([]);
    };

    return (
        <ShoppingCartContext.Provider value={{ openCart, closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, addToCart, cartQuantity, cartItems, orderStatus, setOrderStatus, checkOrderStatus, clearOrder }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}