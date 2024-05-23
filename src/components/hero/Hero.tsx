"use client";

import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import "./hero.css";
import { IoSearch } from "react-icons/io5";

export default function Hero() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const texts = ["Jídlo bez stresu a nepořádku!", "Rychlé a chutné doručení!", "Objevte nové chutě!", "Dneska nechte vaření na nás!", "Jídlo na dosah jedním klikem!", "Máte hlad? My víme, že ano!"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [texts.length]);

    const transitions = useTransition(texts[currentTextIndex], {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        config: { duration: 600 },
    });

    return (
        <div className="hero">
            <div className="container">
                <section className="landing">
                    {transitions((style, item) => (
                        <animated.h1 style={style}>{item}</animated.h1>
                    ))}
                    <img className="aboutus-img" src="/landing-img.png" />
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
