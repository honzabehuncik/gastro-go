"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Nav from "@/components/nav/Nav";
import "./driver.css";
import { string } from "zod";

export default function DriverPage() {
    const { data: session } = useSession();
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - rozvoz";
    return (
        <main>
            <Nav></Nav>
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
                    <h1>Pustíme se do práce, {session.user?.name}!</h1>
                    <p>Aktivní objednávky:</p>
                    <button onClick={() => signOut()}>Odhlásit se</button>
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
