
import { signIn, useSession } from "next-auth/react";
import React from "react";
import "./driver.css";
import { getCustomerOrder } from "@/lib/db";
import { auth } from '@/auth';

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

export default async function DriverPage() {
    const session = await auth();
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - rozvoz";

    let customerOrder = await getCustomerOrder();
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
                            <h1>Aktivní objednávky</h1>
                            <p>
                                Níže nalezne aktivní objednávky, které nemají přiřazeného kurýra pro rozvoz.
                                <br></br>Vybranou objednávku nejprve přiřaďte a poté se můžete pustit do práce!
                                </p>
                            <div className="order-table">
                                {customerOrder.map((order: any) => (
                                    <div key={order.id} className="order-row">
                                        <div className={`order-status status-recorded`}>
                                            {order.status}
                                        </div>
                                        <div className="order-id">ID: #{order.id}</div>
                                        <div className="order-details">
                                            <strong>Název: </strong>{order.orderItems}<br/>
                                            <strong>Adresa: </strong>{order.deliveryAdress}<br/>
                                            <strong>Čas doručení: </strong>{order.deliveryTime}
                                        </div>
                                        <button className="assign-button">Přiřadit objednávku</button>
                                        <button className="edit-button">Spravovat</button>
                                        <button className="remove-button">Odstranit</button>
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
