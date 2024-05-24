"use client"

import { auth } from "@/auth";
import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import "./restaurant.css";
import { notFound } from "next/navigation";
import { addToCartDB } from "@/lib/db";

export default function Restaurant({ restaurant }: { restaurant: any }) {
    if (!restaurant) return notFound();

    const [notificationVisible, setNotificationVisible] = useState(false);
    const [session, setSession] = useState(null);

    useEffect(() => {
        async function getSession() {
            try {
                const sessionData = await auth();
                setSession(sessionData);
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        }

        getSession();
    }, []);

    async function addToCart(formData: FormData) {
        const itemId = formData.get("id");
        const userId = session?.user?.id;
        if (userId) {
            try {
                await addToCartDB(itemId as string, userId as string);
                setNotificationVisible(true);
                setTimeout(() => {
                    setNotificationVisible(false); // Změněno na false
                }, 3000);
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    }

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
                        <>
                            <h1>{category.name}</h1>
                            <div className="card-container">
                                {category.menus.map((menu: any) => (
                                    <div key={menu.name} className="food-card">
                                        <img src={menu.imageUrl} alt={menu.name} className="food-image" />
                                        <h2>{menu.name}</h2>
                                        <h3>{menu.price as string} Kč</h3>
                                        <p>{menu.description}</p>
                                        <div className="badges">
                                            <form onSubmit={(e) => { e.preventDefault(); addToCart(new FormData(e.target as HTMLFormElement)); }}>
                                                <input type="hidden" name="id" value={menu.id}/>
                                                <button type="submit" className="add-button">
                                                    <IoIosAdd className="plus-icon" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            </div>

            {notificationVisible && (
                <div className="notification">
                    Produkt byl úspěšně přidán do košíku
                </div>
            )}
        </main>
    );
}
