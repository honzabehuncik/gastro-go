"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

export default function DashboardPage() {
    const {data: session} = useSession();
    return(
        <>
            {session ? (
                <>
                    <h1>Vítejte {session.user?.name}</h1>
                    <button onClick={() => signOut()}>Odhlásit se</button>
                </>
            ): (
                <>
                    <h1>Nepřihlášen</h1>
                    <button onClick={() => signIn("google")}>Přihlašte se přes google</button>
                </>
            )}
        </>
    )
}