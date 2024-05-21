import Link from "next/link";
import "./menu-navbar.css";
import { FaUser, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

export default function Nav() {
    return (
        <header>
            <nav>
                <div className="logo-container">
                    <Link href="/" className="logo">GastroGO</Link>
                    <div className="location">
                        <FaMapMarkerAlt className="location-icon" />
                        <span>Adresa doručení</span>
                    </div>
                </div>
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Vyhledat na GastroGo..."
                    />
                </div>
                <button className="user-button">
                    <FaUser className="user-icon" />
                </button>
            </nav>
        </header>
    );
}
