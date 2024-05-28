"use client"

import Link from "next/link";
import "./navbar-login.css";
import { signIn } from "next-auth/react";

export default function NavLogin() {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <button onClick={() => signIn("google")} className="user-login-btn">
                    <a>Přihlásit</a>
                </button>
            </nav>
        </header>
    );
}