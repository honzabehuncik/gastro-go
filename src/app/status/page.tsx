"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";
import "./status.css";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { FaInfoCircle } from 'react-icons/fa';
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";

const totalMinutes = 45; // time remaining in minutes

const minuteSeconds = 60;
const remainingTime = totalMinutes * minuteSeconds;

const timerProps = {
  isPlaying: true,
  size: 250,
  strokeWidth: 13
};

const renderTime = (dimension: string, time: number) => {
    if (time === 0) {
        return (
          <div className="time-wrapper">
            <div className="time-finished">👍</div>
            <div className="time-description">
              Objednávka právě<br></br>dorazila k vám!
            </div>
          </div>
        );
    }
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

const getTimeMinutes = (time: number) => Math.ceil((time % remainingTime) / minuteSeconds);

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
                                <div className="order-step inactive">
                                    <div className="order-content">
                                        <TbCircleNumber2Filled className="icon" />
                                        <div>
                                            <h2>Objednávka je na cestě!</h2>
                                            <p>Vaše objednávka je na cestě, buďte připraveni na doručení.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-step inactive">
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
                                colorsTime={[remainingTime, remainingTime * 0.666, remainingTime * 0.333, remainingTime * 0.166, 0]}
                                duration={remainingTime}
                                rotation="counterclockwise"
                                initialRemainingTime={remainingTime}
                                onComplete={(totalElapsedTime) => ({
                                    shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                                })}
                            >
                                {({ elapsedTime, color }) => (
                                    <span style={{ color }}>
                                        {renderTime("minut", getTimeMinutes(remainingTime - elapsedTime))}
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
