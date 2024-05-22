"use client"

import { signIn, useSession } from "next-auth/react";
import React from "react";
import "./restaurants.css";

const orders = [
    {
        id: "001",
        name: "Objednávka 1",
        driver: "Marek",
        driverArrive: "19:35",
        status: "⌛ Připravuje se",
        statusClass: "preparing",
    },
    {
        id: "002",
        name: "Objednávka 2",
        driver: "Marek",
        driverArrive: "20:00",
        status: "⌛ Připravuje se",
        statusClass: "preparing",
    },
    {
        id: "003",
        name: "Objednávka 3",
        driver: "Marek",
        driverArrive: "20:30",
        status: "⌛ Připravuje se",
        statusClass: "preparing",
    },
    {
        id: "004",
        name: "Objednávka 4",
        driver: "Marek",
        driverArrive: "21:00",
        status: "⌛ Připravuje se",
        statusClass: "preparing",
    },
];

export default function DriverPage() {
    const { data: session } = useSession();
    const heading = !session ? "Neoprávněný přístup!" : "Restaurace panel";
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
                            <h1>Nové objednávky</h1>
                            <p>
                                Níže nalezne nové objednávky, které je potřeba připravit.
                                <br></br>Každá objednávka má přiřazeného kurýra, který ji vyzvedne v očekávaný čas.
                                </p>
                            <div className="order-table">
                                {orders.map((order) => (
                                    <div key={order.id} className="order-row">
                                        <div className={`order-status status-${order.statusClass}`}>
                                            {order.status}
                                        </div>
                                        <div className="order-id">ID: #{order.id}</div>
                                        <div className="order-details">
                                            <strong>Název: </strong>{order.name}<br/>
                                            <strong>Přiřazený kurýr: </strong>{order.driver}<br/>
                                            <strong>Očekávaný čas příjezdu: </strong>{order.driverArrive}
                                        </div>
                                        <button className="assign-button">Dokončit objednávku</button>
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
