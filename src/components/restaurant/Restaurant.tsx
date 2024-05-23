"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import "./restaurant.css";
import { notFound } from "next/navigation";

export default function Restaurant({ restaurant }: { restaurant: any }) {
    if (!restaurant) return notFound()
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const { data: session } = useSession();
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - rozvoz";


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
                                        <h3>{menu.price} Kč</h3>
                                        <p>{menu.description}</p>
                                        <div className="badges">
                                            <button className="add-button">
                                                <IoIosAdd className="plus-icon" />
                                            </button>
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