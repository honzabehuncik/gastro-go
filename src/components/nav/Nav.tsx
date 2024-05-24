import React from "react";
import "./navbar.css";
import NavLogin from "./login-nav";
import DashboardNav from "./dashboard-nav";
import MenuNav from "./menu-nav";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { getOrders } from "@/lib/db";

export default async function Nav(){
    const headerList = headers();
    const path = headerList.get("x-current-path");
    const session = await auth()

    let orders = null
    let order = null
    if(session?.user?.id){
        orders = await getOrders(session?.user?.id)
        order = orders[0].orderItems
    }

    return (
        <>
            {!session && path === "/" && <NavLogin />}
            {path === "/dashboard" && <DashboardNav order={order}/>}
            {path === "/driver" && <DashboardNav order={order}/>}
            {path === "/restaurants" && <DashboardNav order={order}/>}
            {path === "/status" && <DashboardNav order={order}/>}
            {(!(path === "/dashboard" || path === "/menu" || path === "/driver" || path === "/restaurants" || path === "/status" )) && session && <MenuNav />}
        </>
    );
};
