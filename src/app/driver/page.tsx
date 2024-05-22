"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import "./driver.css";

const orders = [
    {
        id: "001",
        name: "Objednávka 1",
        address: "Ulice 123, Město",
        deliveryTime: "19:35",
        status: "⌛ Připravuje se",
        statusClass: "preparing",
    },
    {
        id: "002",
        name: "Objednávka 2",
        address: "Ulice 456, Město",
        deliveryTime: "20:00",
        status: "🚴 Doručování",
        statusClass: "delivering",
    },
    {
        id: "003",
        name: "Objednávka 3",
        address: "Ulice 789, Město",
        deliveryTime: "20:30",
        status: "✅ Doručeno",
        statusClass: "delivered",
    },
    {
        id: "004",
        name: "Objednávka 4",
        address: "Ulice 101, Město",
        deliveryTime: "21:00",
        status: "👍 Zaznamenáno",
        statusClass: "recorded",
    },
];

export default function DriverPage() {
    const { data: session } = useSession();
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - rozvoz";
    return (
        <main>
            <div className="driver">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>{heading}</h1>
                    </div>
                </div>
                <div className="driver-container">
                    {session ? (
                        <>
                            <h1>Pustíme se do práce, {session.user?.name}!</h1>
                            <p>Aktivní objednávky:</p>
                            <div className="order-table">
                                {orders.map((order) => (
                                    <div key={order.id} className="order-row">
                                        <div className={`order-status status-${order.statusClass}`}>
                                            {order.status}
                                        </div>
                                        <div className="order-id">ID: {order.id}</div>
                                        <div className="order-details">
                                            <strong>Název: </strong>{order.name}<br/>
                                            <strong>Adresa: </strong>{order.address}<br/>
                                            <strong>Čas doručení: </strong>{order.deliveryTime}
                                        </div>
                                        <button className="assign-button">Přiřadit objednávku</button>
                                        <button className="edit-button">Spravovat</button>
                                        <button className="remove-button">Odstranit</button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => signOut()}>Odhlásit se</button>
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
