"use client"

import { signIn, useSession } from "next-auth/react";
import React from "react";
import "./admin.css";
import { parseISO, addMinutes, format } from 'date-fns';

export default function AdminPage() {
    const { data: session } = useSession();
    const heading = !session || session.user?.role !== "Admin" ? "Neoprávněný přístup!" : "Admin panel";

    return (
        <main>
            <div className="admin">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>{heading}</h1>
                    </div>
                </div>
                <div className="admin-container">
                    {session ? (
                        <>
                            <h1>Žádosti</h1>
                            <p>
                                Níže nalezne aktuální statistiky GastroGO.
                            </p>
                            <div className="request-table">
                                    <div className="request-row">
                                        <div className={`request-status status-recorded`}>
                                        🚴 Kurýr
                                        </div>
                                        <div className="request-id">#001</div>
                                        <div className="request-details">Marek</div>
                                        <div className="request-details">Telefon</div>
                                        <div className="request-details">CV</div>
                                        <div className="request-btns">
                                        <button className="assign-button">Potvrdit</button>
                                        <button className="remove-button">Zamítnout</button>
                                        </div>
                                    </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Pro přístup na tuto stránku se musíte přihlásit!</h1>
                            <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
