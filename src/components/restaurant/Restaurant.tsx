"use client"

import React from "react";
import { notFound } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Notification from "../notification";
import { useSession } from "next-auth/react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import "./restaurant.css"

export default function Restaurant({ restaurant }: { restaurant: any }) {
    if (!restaurant) return notFound()
    
    const {addToCart} = useShoppingCart()
    const {data: session} = useSession()

    const addToCartDB = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const itemId = formData.get("itemId") as string; // Získat id přímo z formuláře
        const itemName = formData.get("name") as string; // Získat název položky z formuláře
        const itemPrice = formData.get("price"); // Získat cenu položky z formuláře
        const userId = session?.user?.id;
    
        if (!userId) return;
    
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.DATA_API_KEY!,
            },
            body: JSON.stringify({ userId, itemId }),
        });
    
        console.log(res);
    
        addToCart({
            id: itemId,
            quantity: 1,
            name: itemName,
            price: itemPrice,
        });
    
        if (res.ok) {
            toast.success("Item added to cart!");
        } else {
            toast.error("Failed to add item to cart.");
        }
    };

    return (
        <main>
            <div className="restaurant-name">
                <div style={{backgroundImage: `url(${restaurant.imageUrl})`}} className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>{restaurant.name}</h1>
                    </div>
                </div>
            </div>

            <div className="menu-detailed">
                <div className="menu-detailed-container">
                    {restaurant.Category.map((category: any) => (
                        <div key={category.name}>
                            <h1>{category.name}</h1>
                            <div className="card-container">
                                {category.menus.map((menu: any) => (
                                    <div key={menu.name} className="food-card">
                                        <img src={menu.imageUrl} alt={menu.name} className="food-image" />
                                            <div className="card-header">
                                            <h2>{menu.name}</h2>
                                            <h3><strong>{menu.price as string} Kč</strong></h3>
                                        </div>
                                        <p>{menu.description}</p>
                                        <div className="badges">
                                            <form onSubmit={addToCartDB}>
                                                <input type="hidden" name="price" value={menu.price}/>
                                                <input type="hidden" name="name" value={menu.name}/>
                                                <input type="hidden" name="itemId" value={menu.id}/>
                                                <button type="submit">Přidat do košíku</button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </main>
    );
}