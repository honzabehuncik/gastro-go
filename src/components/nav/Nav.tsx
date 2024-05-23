"use client"

import React from "react";
import "./navbar.css";
import { usePathname } from "next/navigation";
import NavLogin from "./login-nav";
import DashboardNav from "./dashboard-nav";
import MenuNav from "./menu-nav";
import { useSession } from "next-auth/react";

export default function Nav(){
    const path = usePathname();
    const { data: session } = useSession();

    const isRestaurantRoute = /^\/[^\/]+$/.test(path);

    return (
        <>
            {!session && <NavLogin />}
            {session && (isRestaurantRoute || path === "/") && <MenuNav />}
            {path === "/dashboard" && <DashboardNav />}
            {path === "/driver" && <DashboardNav />}
            {path === "/restaurants" && <DashboardNav />}
            {path === "/status" && <DashboardNav />}
            {!(path === "/" || path === "/dashboard" || path === "/menu" || path === "/driver" || path === "/restaurants" || path === "/status" || isRestaurantRoute ) && <NavLogin />}
        </>
    );
};
