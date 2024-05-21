import Link from "next/link";
import "./navbar.css";
import { FaUser } from "react-icons/fa";

export default function Nav() {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <Link href="/dashboard">
                <button className="user-button">
                    <FaUser className="user-icon" />
                </button>
                </Link>
                
            </nav>
        </header>
    );
}