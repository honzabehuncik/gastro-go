"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Nav from "@/components/menu_nav/MenuNav";
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
    return (
        <main>
            <Nav></Nav>
            <div className="menu">
            <div className="menu-container">
            {session ? (
                <>
                    <h1>Na co máte chuť, {session.user?.name}?</h1>
                    <div> 
                {/* Provizorni reseni tagu - pozdeji import z db */}
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
