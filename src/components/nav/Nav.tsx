"use client"

import React, { useState } from "react";
import "./navbar.css";
import { usePathname } from "next/navigation";
import NavLogin from "./login-nav";
import DashboardNav from "./dashboard-nav";
import MenuNav from "./menu-nav";

export default function Nav(){
    const path = usePathname()

    return (
        <>
            {path == "/" && <NavLogin />}
            {path == "/dashboard" && <DashboardNav />}
            {path == "/menu" && <MenuNav />}
            {path == "/driver" && <DashboardNav />}
            {path == "/menu-detailed" && <MenuNav />}
            {!(path == "/" || path == "/dashboard" || path == "/menu" || path == "/driver" || path == "/menu-detailed") && <NavLogin />}
        </>
    );
};

