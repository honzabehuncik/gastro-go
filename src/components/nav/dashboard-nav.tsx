import React, { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import "./navbar.css";
import { signOut } from "next-auth/react";

const DashboardNav: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header>
            <nav>
                <Link href="/" className="logo">GastroGO</Link>
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
};

export default DashboardNav;
