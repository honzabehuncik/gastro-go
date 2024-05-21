import Link from "next/link";
import "./hero.css";
import { IoSearch } from "react-icons/io5";

export default function Hero() {
    return (
        <div>
            <div className="container">
                <section className="landing">
                    <h1>Jídlo bez stresu a nepořádku!</h1>
                    <img className="aboutus-img" src="/landing-img.png"/>
                    <div className="location-box">
                        <div className="location-input">
                            <input type="text" id="adress-input" name="myInput" placeholder="Zadejte adresu pro doručení..."></input>
                        </div>
                        <button className="find-button">
                            <div className="search-icon">
                                <IoSearch />
                            </div>
                            <a href="#">Najít restaurace</a>
                        </button>
                    </div>
                </section>
                <div className="ellipse2 left-bottom"></div>
                <div className="ellipse right-top"></div>
            </div>
        </div>
    );
}