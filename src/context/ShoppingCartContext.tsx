"use client"

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContextType = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    addToCart: (item: CartItem) => void
    cartQuantity: number
    cartItems: CartItem[]
} 

type CartItem = {
    id: string
    quantity: number
    name?: string
    price?: any
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { data: session } = useSession();

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/orders/'+session?.user.id);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                const orderItems = data[0].orderItems.map((orderItem: any) => ({
                    id: orderItem.menu?.id || '',
                    quantity: orderItem.quantity || 0,
                    name: orderItem.menu?.name || '',
                    price: orderItem.menu?.price || 0,
                }));
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
            return currItems.map(item => {
                if (item.id === id) {
                    (async () => {
                        const res = await fetch('/api/orders/'+session?.user.id, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'API-Key': process.env.DATA_API_KEY!,
                            },
                            body: JSON.stringify({userId: session?.user.id, itemId: id, quantity: item.quantity + 1}),
                        });
                    })();
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
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
                return [...prevItems, item];
            }
        });
      };

    function decreaseCartQuantity(id: string) {
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.id === id) {
                    (async () => {
                        const res = await fetch('/api/orders/'+session?.user.id, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'API-Key': process.env.DATA_API_KEY!,
                            },
                            body: JSON.stringify({ userId: session?.user.id, itemId: id, quantity: item.quantity - 1}),
                        });
                    })();
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            });
        });
    }

    function removeFromCart(id: string){
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }

    return (
        <ShoppingCartContext.Provider value={{ addToCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

