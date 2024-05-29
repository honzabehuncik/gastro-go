"use client"

import { signIn } from "next-auth/react";

export default function SignInBtn(){
    return(
        <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
    )
}