import { signIn, useSession } from "next-auth/react";
import React from "react";
import "./admin.css";
import { getAllRequests } from "@/lib/db";
import { auth } from '@/auth';

export default async function AdminPage() {
    const session = await auth();
    const heading = !session ? "Neoprávněný přístup!" : "Admin panel";

    let request = await getAllRequests();

    return (
        <main>
            <div className="admin">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>{heading}</h1>
                    </div>
                </div>
                <div className="admin-container">
                    {session ? (
                        <>
                            <h1>Žádosti</h1>
                            <p>
                                Níže nalezne aktuální žádosti o přidání nové restaurace nebo o získání statusu kurýra.
                            </p>
                            <div className="request-table">
                                {request.map((req: any) => (
                                    <div className="request-row">
                                    <div className={`request-status status-${req.category ? 'restaurant' : 'driver'}`}>
                                    {req.category ? '🍝Restaurace' : '🚴 Kurýr'}
                                    </div>
                                    <div className="request-id">#{req.id}</div>
                                    <div className="request-details">{req.userName ? req.userName : req.restaurantName}</div>
                                    <div className="request-details">{req.restaurantNumber}</div>
                                    <div className="request-details">CV</div>
                                    <div className="request-btns">
                                    <button className="assign-button">Potvrdit</button>
                                    <button className="remove-button">Zamítnout</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Pro přístup na tuto stránku se musíte přihlásit!</h1>
                            <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
