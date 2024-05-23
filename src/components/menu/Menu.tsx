import { signIn } from "next-auth/react";
import "./menu.css";
import { getRestaurants } from "@/lib/db";
import Tags from "@/components/tags/page";
import { auth } from '@/auth';

export default async function Menu({ searchParams }: { searchParams: { tags?: string } }) {
    const session = await auth();
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - rozvoz";

    let restaurants = await getRestaurants();
    const tagsFilter = searchParams.tags ? searchParams.tags.split(",") : [];
    if (tagsFilter.length > 0) {
        restaurants = restaurants.filter((restaurant: any) =>
            restaurant.badges && restaurant.badges.some((badge: any) => tagsFilter.includes(badge.label))
        );
    }

    return (
        <main>
            <div className="menu">
                <div className="menu-container">
                    {session ? (
                        <>
                            <h1>Na co máte chuť, {session.user?.name}?</h1>
                            <Tags />
                            <div className="card-container">
                                {restaurants.map((restaurant: any, index:number) => (
                                    <div key={index} className="restaurant-card">
                                        <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-image" />
                                        <h2>{restaurant.name}</h2>
                                        <p>{restaurant.description}</p>
                                        <div className="badges">
                                            {restaurant.badges.map((badge: any) => (
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
