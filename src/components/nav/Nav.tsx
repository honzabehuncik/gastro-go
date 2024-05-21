import Link from "next/link";
import "./navbar.css";
import { FaUser } from "react-icons/fa"; // Import ikony uživatele

export default function Nav() {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <button className="user-button">
                    <FaUser className="user-icon" />
                </button>
            </nav>
        </header>
    );
}