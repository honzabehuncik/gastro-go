"use client";

import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import "./404.css";

export default function notfound() {
    return (
        <div className="hero">
        <div className="container">
            <section className="landing">
                <h1>Stránka nenalezena...</h1><br/>
                <img className="aboutus-img" src="/errorimg.png" />
            </section>
            <div className="ellipse2 left-bottom"></div>
            <div className="ellipse right-top"></div>
        </div>
    </div>
    );
}


