import React, { useState } from "react";
import Link from "next/link";
import "./menu-navbar.css";
import { FaUser, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function MenuNav() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
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
                <div className="user-menu">
                    <button className="user-button" onClick={toggleDropdown}>
                        <FaUser className="user-icon" />
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                        <Link href="/dashboard">👤 Účet</Link>
                        <Link href="/driver">📝 Kariéra</Link>
                        <Link href="/driver">🍕 Přidat restauraci</Link>
                        <Link href="" onClick={() => signOut()}>👋🏼 Odhlásit se</Link>
                    </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
