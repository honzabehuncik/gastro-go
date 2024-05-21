"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import Nav from "@/components/nav/Nav";
import "./dashboard.css";

export default function DashboardPage() {
    const { data: session } = useSession();
    return (
        <main>
            <Nav></Nav>
            <div className="dashboard">
            <div className="hero-section">
                <div className="gradient-overlay"></div>
                <div className="hero-content">
                    <h1>Dashboard</h1>
                </div>
            </div>
            <div className="dashboard-container">
            {session ? (
                <>
                    <h1>Vítejte {session.user?.name}</h1>
                    <p>Vaše role: {session.user?.role}</p>
                    <Link href="/driver"><button>Přihlásit se jako kurýr</button></Link>
                    <button>Zažádat o přidání restaurace</button>
                    <button onClick={() => signOut()}>Odhlásit se</button>
                </>
            ) : (
                <>
                    <h1>Nepřihlášen</h1>
                    <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
                </>
            )}
            </div>
        </div>
        </main>
        
    );
}
