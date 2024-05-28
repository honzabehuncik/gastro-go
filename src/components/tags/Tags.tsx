"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Tags() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialTags = searchParams.get("tags")?.split(",") || [];
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  const createQueryString = useCallback(
    (tags: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      tags.length ? params.set("tags", tags.join(",")) : params.delete("tags");
      return params.toString();
    },
    [searchParams]
  );

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    router.push(pathname + "?" + createQueryString(updatedTags));
  };

  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    setSelectedTags(tagsParam ? tagsParam.split(",") : []);
  }, [searchParams]);

  const tagsDisplay = [
    { display: "❤️ Oblíbené", value: "Oblíbené" },
    { display: "🍔 Burger", value: "Burger" },
    { display: "🥙 Kebab", value: "Kebab" },
    { display: "🍕 Pizza", value: "Pizza" },
    { display: "🌭 Americká", value: "Americká" },
    { display: "🥗 Salát", value: "Salát" },
    { display: "🥓 Snídaně", value: "Snídaně" }
  ];

  return (
    <div>
      {tagsDisplay.map((tag) => (
        <span
          key={tag.value}
          className={`tag ${selectedTags.includes(tag.value) ? 'active' : ''}`}
          onClick={() => toggleTag(tag.value)}
        >
          {tag.display}
        </span>
      ))}
    </div>
  );
}
