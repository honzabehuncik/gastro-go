import Link from "next/link";
import "./navbar.css";
import Search from "@/components/nav/menu-search"
import BasketMenu from "./basket-menu";


export default async function DashboardNav(){
    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <Search/>
                <BasketMenu/>
            </nav>
        </header>
    );
};