import Link from "next/link";
import "./navbar-login.css";
import { FaUser } from "react-icons/fa"; // Import ikony uživatele

export default function NavLogin() {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
                <button className="user-login-btn">
                    <a href="/dashboard">Přihlásit</a>
                </button>
                <button className="user-register-btn">
                    <a href="/dashboard">Registrovat</a>
                </button>
            </nav>
        </header>
    );
}