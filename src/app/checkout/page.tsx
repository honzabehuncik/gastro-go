import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import "./checkout.css";
import { auth } from '@/auth';

const orders = [
    {
        id: "001",
        item: "Kebab klasický",
        details: "Kebab klasický s bylinkovou omáčkou",
        quantity: "3",
        price: "150",
    },
    {
        id: "002",
        item: "Kebab klasický",
        details: "Kebab klasický s bylinkovou omáčkou",
        quantity: "3",
        price: "150",
    },
];

const totalPrice = orders.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity)), 0);

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
                                {orders.map((order) => (
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
                                            <p>{parseFloat(order.price) * parseInt(order.quantity)} Kč</p>
                                        </div>              
                                    </div>
                                ))}
                            </div>
                            <div className="final-price">
                                <p>Celková cena: <span className="price-highlighted">{totalPrice} Kč</span></p>
                            </div>
                            <Link href="/status"><button className="add-button">Objednat</button></Link>
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
