"use client"

import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useShoppingCart } from "@/context/ShoppingCartContext";

export default function BasketMenu() {
    const { cartItems } = useShoppingCart();
    const [basketDropdownOpen, setBasketDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const basketRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (basketRef.current && !basketRef.current.contains(event.target as Node)) {
            setBasketDropdownOpen(false);
        }
        if (userRef.current && !userRef.current.contains(event.target as Node)) {
            setUserDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleBasketDropdown = () => {
        setBasketDropdownOpen(!basketDropdownOpen);
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
    };

    let totalPrice = cartItems.reduce((total, item) => total + item!.price! * item.quantity, 0);

    return (
        <div className="user-menu">
            <div ref={basketRef}>
                <button className="basket-button" onClick={toggleBasketDropdown}>
                    <FaBasketShopping className="basket-icon" />
                </button>
                {basketDropdownOpen && (
                    <div className="dropdown-menu basket-dropdown">
                        <ul className="basket-items">
                            {cartItems.length > 0 ? (
                                <ul>
                                    {cartItems.map((item: any, index: number) => (
                                        <li key={index} className="basket-item">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-price">{item.price} Kč</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <ul>
                                    <li className="basket-item">
                                        Košík je prázdný.
                                    </li>
                                </ul>
                            )}
                        </ul>
                        <div className="total-price">
                            <span className="total-label">Celková cena:</span>
                            <span className="total-amount">{totalPrice} Kč</span>
                        </div>
                        <button className="order-button">
                            <Link className="order-link" href="/checkout">Objednat</Link>
                        </button>
                    </div>
                )}
            </div>
            <div ref={userRef}>
                <button className="user-button" onClick={toggleUserDropdown}>
                    <FaUser className="user-icon" />
                </button>
                {userDropdownOpen && (
                    <div className="dropdown-menu">
                        <Link href="/dashboard">👤 Účet</Link>
                        <Link href="/driver">📝 Kariéra</Link>
                        <Link href="/dashboard">🍕 Přidat restauraci</Link>
                        <Link href="" onClick={() => signOut()}>👋🏼 Odhlásit se</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
