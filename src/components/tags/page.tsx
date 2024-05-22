"use client"

import { useState } from "react";

export default function Tags(){
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };
    return(
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
    )
}