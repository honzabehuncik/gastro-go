"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import "./menu-detailed.css";

export default function MenuDetailedPage() {
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

    const foods = [
        { name: "Nigiri", description: "nigirinigirinigirinigiri", price: "89,00", badges: [{ label: "Nigiri", type: "primary" }], imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/64EF898D-2EDD-4B47-A456-E6A7D137AC91/Derivates/00f76cac-64f6-4573-be4f-e604a7d99143.jpg" },
        { name: "Maki", description: "makikikikimakikikiki", price: "89,00", badges: [{ label: "Maki", type: "primary" }], imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/64EF898D-2EDD-4B47-A456-E6A7D137AC91/Derivates/00f76cac-64f6-4573-be4f-e604a7d99143.jpg" },
        { name: "Uramaki", description: "uramakikiiakdkuramakikiiakdk", price: "89,00", badges: [{ label: "Uramaki", type: "primary" }], imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/64EF898D-2EDD-4B47-A456-E6A7D137AC91/Derivates/00f76cac-64f6-4573-be4f-e604a7d99143.jpg" },
        { name: "Sashimi", description: "sashimiimimimimisashimiimimimimi", price: "89,00", badges: [{ label: "Sashimi", type: "primary" }], imageUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/64EF898D-2EDD-4B47-A456-E6A7D137AC91/Derivates/00f76cac-64f6-4573-be4f-e604a7d99143.jpg" }
    ];

    return (
        <main>
        <div className="restaurant-name">
                    <div className="hero-section">
                        <div className="gradient-overlay"></div>
                        <div className="hero-content">
                            <h1>Sushi restaurant</h1>
                        </div>
                    </div>
</div>
            <div className="menu-detailed">
                <div className="menu-detailed-container">
                    {session ? (
                        <>
                            <div>
                                {["🕐 Otevřeno do 23:00", "⭐️ 92%", "🚗 30-40 min"].map((tag) => (
                                    <span
                                        key={tag}
                                        className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="searchbar-container">
                            <FaSearch className="searchbar-icon" />
                            <input
                                type="text"
                                className="searchbar-input"
                                placeholder="Na co máte chuť?"/>
                            </div>

                            <button className="find-button">
                            <a href="#">Hledat</a>
                        </button>


                        <h1>Sushi</h1>
                            <div className="card-container">
                                {foods.map((foods) => (
                                    <div key={foods.name} className="food-card">
                                        <img src={foods.imageUrl} alt={foods.name} className="food-image" />
                                        <h2>{foods.name}</h2>
                                        <h3>{foods.price} Kč</h3>
                                        <p>{foods.description}</p>
                                        <div className="badges">
                                            {foods.badges.map((badge) => (
                                                <button className="add-button">
                                                    <IoIosAdd className="plus-icon" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Pro přístup na tuhle stránku se musíte přihlásit!</h1>
                            <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
