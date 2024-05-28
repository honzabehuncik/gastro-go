"use client"

import Link from "next/link";
import "./navbar.css";
import Search from "@/components/nav/menu-search"
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FaBasketShopping, FaUser } from "react-icons/fa6";
import BasketMenu from "./basket-menu";


export default function DashboardNav(){

    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <Search></Search>
                <BasketMenu/>
            </nav>
        </header>
    );
};