import { auth } from "@/auth";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import "./restaurant.css";
import { notFound } from "next/navigation";
import { addToCartDB } from "@/lib/db";

export default async function Restaurant({ restaurant }: { restaurant: any }) {
    if (!restaurant) return notFound()

    const session = await auth()
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - rozvoz";

    async function addToCart(formData: FormData){
        "use server"
        const itemId = formData.get("id")
        const userId = session!.user!.id
        const order = addToCartDB(itemId as string, userId as string)
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
                        {/* <div>
                            {restaurant.badges.map((badge: any) => (
                                <span
                                    key={badge}
                                    className={`tag ${selectedTags.includes(badge.label) ? 'active' : ''}`}
                                    onClick={() => toggleTag(badge.label)}
                                >
                                    {badge.label}
                                </span>
                            ))}
                        </div> 

                        <div className="searchbar-container">
                            <FaSearch className="searchbar-icon" />
                            <input
                            type="text"
                            className="searchbar-input"
                            placeholder="Na co máte chuť?"/>
                            <button className="find-button">
                                <a href="#">Hledat</a>
                            </button>
                        </div> */}

                    

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
                                            <form action={addToCart}>
                                                <input type="hidden" name="id" value={menu.id}/>
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
        </main>
    );
}