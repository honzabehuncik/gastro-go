"use client"

import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function BasketMenu(order: any){
    const [basketDropdownOpen, setBasketDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [price, setPrice] = useState()

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

    let totalPrice = 0;

    for (let i = 0; i < order.order.length; i++) {
        totalPrice += order.order[i].itemPrice * order.order[i].quantity;
    }

    return(
        <div className="user-menu">
            <div ref={basketRef}>
                <button className="basket-button" onClick={toggleBasketDropdown}>
                    <FaBasketShopping className="basket-icon" />
                </button>
                {basketDropdownOpen && (
                    <div className="dropdown-menu basket-dropdown">
                        <ul className="basket-items">
                            {order.order.map((item:any) => (
                                <li key={item.menu.id} className="basket-item">
                                    <span className="item-name">{item.menu.name}</span>
                                    <span className="item-price">{item.menu.price} Kč</span>
                                </li>
                            ))}
                        </ul>
                        <div className="total-price">
                            <span className="total-label">Celková cena:</span>
                            <span className="total-amount">{totalPrice} Kč</span>
                        </div>
                        <button className="order-button"><Link href="/checkout">Objednat</Link></button>
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
                        <Link href="/driver">🍕 Přidat restauraci</Link>
                        <Link href="" onClick={() => signOut()}>👋🏼 Odhlásit se</Link>
                    </div>
                )}
            </div>
        </div>
    )
}