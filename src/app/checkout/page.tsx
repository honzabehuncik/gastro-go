"use client"

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import "./checkout.css";
import { getOrders } from "@/lib/db";
import { useShoppingCart } from "@/context/ShoppingCartContext";


export default function CheckoutPage() {
    const { data: session } = useSession();

    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, cartItems} = useShoppingCart()
    // const quantity = getItemQuantity(order?)

    let totalPrice = cartItems.reduce((total, item) => total + item!.price! * item.quantity, 0);
    

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
                                {cartItems.map((item: any, index: number) => (
                                    <div key={index} className="order-row">
                                        <div className="order-details">
                                            <div className="order-heading">
                                                <strong><span className="quantity-color">{item.quantity}x</span> {item.name}</strong><br/>
                                            </div>
                                            <div className="button-container">
                                                <button onClick={() => increaseCartQuantity(item.id)} className="add-button">+1</button>
                                                <button onClick={() => decreaseCartQuantity(item.id)} className="remove-button">-1</button>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <p>{item.price * item.quantity} Kč</p>
                                        </div>              
                                    </div>
                                ))}
                            </div>
                            <div className="final-price">
                                <p>Celková cena: <span className="price-highlighted">{totalPrice} Kč</span></p>
                            </div>
                            <Link href="/status"><button className="add-button" >Objednat</button></Link>
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
