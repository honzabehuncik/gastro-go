"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import "./menu.css";

export default function MenuPage() {
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

    const restaurants = [
        { name: "Kebab King", description: "Nejlepší kebab ve městě", badges: [{ label: "Kebab", type: "primary" }, { label: "30-40 min", type: "secondary" }], imageUrl: "https://1gr.cz/fotky/idnes/17/091/cl5/HIG6de060_05.jpg" },
        { name: "American Diner", description: "Tradiční americké jídlo", badges: [{ label: "Americká", type: "primary" }, { label: "30-40 min", type: "secondary" }], imageUrl: "https://1gr.cz/fotky/idnes/17/091/cl5/HIG6de060_05.jpg" },
        { name: "Burger Heaven", description: "Šťavnaté burgery", badges: [{ label: "Burger", type: "primary" }, { label: "30-40 min", type: "secondary" }], imageUrl: "https://1gr.cz/fotky/idnes/17/091/cl5/HIG6de060_05.jpg" },
        { name: "Salad Bar", description: "Zdravé a čerstvé saláty", badges: [{ label: "Salát", type: "primary" }, { label: "30-40 min", type: "secondary" }], imageUrl: "https://1gr.cz/fotky/idnes/17/091/cl5/HIG6de060_05.jpg" }
    ];

    return (
        <main>
            <div className="menu">
                <div className="menu-container">
                    {session ? (
                        <>
                            <h1>Na co máte chuť, {session.user?.name}?</h1>
                            <div>
                                {["❤️ Oblíbené", "🍔 Burger", "🥙 Kebab", "🍕 Pizza", "🌭 Street food", "🥗 Salát", "🥓 Snídaně"].map((tag) => (
                                    <span
                                        key={tag}
                                        className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="card-container">
                                {restaurants.map((restaurant) => (
                                    <div key={restaurant.name} className="restaurant-card">
                                        <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-image" />
                                        <h2>{restaurant.name}</h2>
                                        <p>{restaurant.description}</p>
                                        <div className="badges">
                                            {restaurant.badges.map((badge) => (
                                                <span key={badge.label} className={`badge badge-${badge.type}`}>
                                                    {badge.label}
                                                </span>
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
