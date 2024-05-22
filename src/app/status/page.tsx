"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import "./status.css";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { FaInfoCircle } from 'react-icons/fa';
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";

const minuteSeconds = 60;
const hourSeconds = 3600;
const remainingTime = 1800;

const timerProps = {
  isPlaying: true,
  size: 250,
  strokeWidth: 13
};

const renderTime = (dimension: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined, time: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div className="time-dimension">{dimension}</div>
        <div className="time-description">
          do doručení
          <br />
          objednávky
        </div>
      </div>
    );
  };

const getTimeMinutes = (time: number) => ((time % remainingTime) / minuteSeconds) | 0;

export default function DashboardPage() {
    const { data: session } = useSession();

    return (
        <main>
            <div className="dashboard">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>Stav vaší objednávky</h1>
                    </div>
                </div>
                <div className="dashboard-container">
                    {session ? (
                        <>
                            <div className="order-details">
                                <div className="order-step active">
                                    <div className="order-content">
                                        <TbCircleNumber1Filled className="icon"/>
                                        <div>
                                            <h2>Objednávka se připravuje!</h2>
                                            <p>Objednávka se právě připravuje, prosíme o strpení.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-step secondary">
                                    <div className="order-content">
                                        <TbCircleNumber2Filled className="icon" />
                                        <div>
                                            <h3>Objednávka je na cestě!</h3>
                                            <p>Vaše objednávka je na cestě, buďte připraveni na doručení.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-step secondary">
                                    <div className="order-content">
                                        <TbCircleNumber3Filled className="icon" />
                                        <div>
                                            <h3>Dobrou chuť!</h3>
                                            <p>Doufáme, že si pochutnáte na vaší objednávce!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-step info">
                                    <div className="info-content">
                                        <FaInfoCircle className="icon" />
                                        <div>
                                            <h3>Potřebuješ poradit s objednávkou?</h3>
                                            <p>Není problém! Rádi ti s objednávkou poradíme na <a href="#">naší podpoře</a>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="timer-wrapper">
                            <CountdownCircleTimer
                                {...timerProps}
                                colors={["#e51f1f", "#f2a134", "#f7e379", "#bbdb44", "#44ce1b"]}
                                colorsTime={[1800, 1200, 600, 300, 0]}
                                duration={remainingTime}
                                rotation="counterclockwise"
                                initialRemainingTime={remainingTime}
                                onComplete={(totalElapsedTime) => ({
                                    shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                                })}
                            >
                                {({ elapsedTime, color }) => (
                                    <span style={{ color }}>
                                        {renderTime("minut", getTimeMinutes(hourSeconds - elapsedTime))}
                                    </span>
                                )}
                            </CountdownCircleTimer>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Nepřihlášen</h1>
                            <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
