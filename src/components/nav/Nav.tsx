import React, { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import "./navbar.css";

const Nav: React.FC = () => {
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
                            <Link href="#">👤 účet</Link>
                            <Link href="#">📝 kariéra</Link>
                            <Link href="#">👋🏼 odhlásit se</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Nav;
