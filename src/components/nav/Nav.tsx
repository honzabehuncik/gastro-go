import Link from "next/link";
import "./navbar.css"

export default function Nav(){
    return(
        <header style={{maxWidth: "1200px", width: "100%"}}>
            <nav style={{display: "flex", justifyContent: "space-between"}}>
                <Link href="/">GastroGO</Link>
                
                <Link href="/dashboard">Dashboard</Link>
            </nav>
        </header>
    )
}