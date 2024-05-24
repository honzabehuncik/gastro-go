import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import "./checkout.css";
import { auth } from '@/auth';
import { getOrders } from "@/lib/db";


export default async function CheckoutPage() {
    const session = await auth()
    let orders = null
    let order = null
    let totalPrice = 0
    if(session?.user?.id){
        orders = await getOrders(session?.user?.id)
        order = orders[0].orderItems

        totalPrice = 0;
        for (let i = 0; i < order.length; i++) {
            totalPrice += order[i].itemPrice * order[i].quantity;
        }
    }
    

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
                                {order?.map((order) => (
                                    <div key={order.menu.id} className="order-row">
                                        <div className="order-details">
                                            <div className="order-heading">
                                                <strong><span className="quantity-color">{order.quantity}x</span> {order.menu.name}</strong><br/>
                                            </div>
                                            {order.menu.description}<br/>
                                            <div className="button-container">
                                                <button className="add-button">+1</button>
                                                <button className="remove-button">-1</button>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <p>{order.itemPrice * order.quantity} Kč</p>
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
