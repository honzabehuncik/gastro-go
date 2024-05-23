import { signIn, useSession } from "next-auth/react";
import React from "react";
import "./checkout.css";
import { auth } from '@/auth';
import { FaTimes } from 'react-icons/fa';

const orders = [
    {
        id: "001",
        item: "Kebab klasický",
        details: "Kebab klasický s bylinkovou omáčkou",
        quantity: "3",
        price: "150",
    },
    {
        id: "001",
        item: "Kebab klasický",
        details: "Kebab klasický s bylinkovou omáčkou",
        quantity: "3",
        price: "150",
    },
];

export default async function CheckoutPage() {
    const session = await auth();
    const heading = !session ? "Neoprávněný přístup!" : "Přehled vaší objednávky";

    return (
        <main>
            <div className="checkout">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>{heading}</h1>
                    </div>
                </div>
                <div className="checkout-container">
                    {session ? (
                        <>
                            <h1>Přehled objednávky</h1>
                            <p>
                                Níže nalezne kompletní přehled vaší objednávky.
                                <br></br>Objednávku můžete libovolně měnit, případně můžete přidávat další položky.
                                </p>
                            <div className="order-table">
                                {orders.map((order: any) => (
                                    <div key={order.id} className="order-row">
                                        <div className="order-details">
                                            <div className="order-heading">
                                            <strong><span className="quantity-color">{order.quantity}x</span> {order.item}</strong><br/>
                                            </div>
                                            {order.details}<br/>
                                            <div className="button-container">
                                                <button className="add-button">+1</button>
                                                <button className="remove-button">-1</button>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <p>{order.price} Kč</p>
                                        </div>              
                                    </div>
                                ))}
                            </div>
                            <div className="final-price">
                                <p>Celková cena: <span className="price-highlited">300 Kč</span></p>
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
