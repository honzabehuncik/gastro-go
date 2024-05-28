import Link from "next/link";
import "./navbar.css";
import Search from "@/components/nav/menu-search"
import BasketMenu from "./basket-menu";
import { auth } from "@/auth";
import { getOrders } from "@/lib/db";


export default async function DashboardNav(){
    const session = await auth()
    let orders = null
    let order = null
    if(session?.user?.id){
        orders = await getOrders(session?.user?.id)
        if(orders && orders.length > 0){
            order = orders[0].orderItems 
        }
    }

    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <Search/>
                <BasketMenu order={order}/>
            </nav>
        </header>
    );
};