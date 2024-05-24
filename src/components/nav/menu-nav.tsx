import Link from "next/link";
import "./navbar.css";
import Search from "@/components/nav/menu-search"
import BasketMenu from "./basketMenu";
import { auth } from "@/auth";
import { getOrders } from "@/lib/db";


export default async function DashboardNav(){
    const session = await auth()
    let orders = null
    let order = null
    if(session?.user?.id){
        orders = await getOrders(session?.user?.id)
        order = orders[0].orderItems
        console.log(order)
    }

    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <Search></Search>
                <BasketMenu order={order}/>
            </nav>
        </header>
    );
};