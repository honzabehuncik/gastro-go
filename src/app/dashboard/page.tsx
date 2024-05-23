"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { useTransition, animated } from '@react-spring/web';
import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';
import "./dashboard.css";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [isOpenRestaurant, setIsOpenRestaurant] = useState(false);
    const [isOpenCourier, setIsOpenCourier] = useState(false);

    const handleRestaurantDialogChange = (isOpen: boolean | ((prevState: boolean) => boolean)) => setIsOpenRestaurant(isOpen);
    const handleCourierDialogChange = (isOpen: boolean | ((prevState: boolean) => boolean)) => setIsOpenCourier(isOpen);

    const transitionRestaurant = useTransition(isOpenRestaurant, {
        from: { scale: 0.9, opacity: 0 },
        enter: { scale: 1, opacity: 1 },
        leave: { scale: 0.9, opacity: 0 },
    });

    const transitionCourier = useTransition(isOpenCourier, {
        from: { scale: 0.9, opacity: 0 },
        enter: { scale: 1, opacity: 1 },
        leave: { scale: 0.9, opacity: 0 },
    });

    return (
        <main>
            <div className="dashboard">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className="dashboard-container">
                    {session ? (
                        <>
                            <h1>Vítejte {session.user?.name}</h1>
                            <p>Vaše role: {session.user?.role}</p>
                            <button onClick={() => setIsOpenCourier(true)}>Přihlásit se jako kurýr</button>
                            <button onClick={() => setIsOpenRestaurant(true)}>Zažádat o přidání restaurace</button>
                            <button onClick={() => signOut()}>Odhlásit se</button>
                        </>
                    ) : (
                        <>
                            <h1>Nepřihlášen</h1>
                            <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
                        </>
                    )}
                </div>
            </div>

            <Dialog.Root open={isOpenRestaurant} onOpenChange={handleRestaurantDialogChange} modal={true}>
                <Dialog.Portal>
                    {transitionRestaurant((style, item) =>
                        item && (
                            <DialogContainer style={style}>
                                <OverlayBackground />
                                <Content>
                                    <DialogHeader>
                                        <CloseButton onClick={() => setIsOpenRestaurant(false)}>
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.9574 14.1689L8.59651 6.75098L6.73232 8.59598L14.1313 16.071L6.71338 23.4129L8.5964 25.2769L15.9574 17.8779L23.3943 25.2769L25.2392 23.4129L17.8213 16.071L25.2202 8.59598L23.3752 6.75098L15.9574 14.1689Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </CloseButton>
                                    </DialogHeader>
                                    <Title>Zažádat o přidání restaurace</Title>
                                    <Form>
                                        <Input type="text" placeholder="název" />
                                        <Input type="text" placeholder="adresa" />
                                        <Input type="email" placeholder="email" />
                                        <Input type="tel" placeholder="telefon" />
                                        <h2>Otevírací doba od:</h2>
                                        <Input type="time" placeholder="Otevřeno od" />
                                        <h2>Otevírací doba do:</h2>
                                        <Input type="time" placeholder="Otevřeno do" />
                                        <SubmitButton>Submit</SubmitButton>
                                    </Form>
                                </Content>
                            </DialogContainer>
                        )
                    )}
                </Dialog.Portal>
            </Dialog.Root>

            <Dialog.Root open={isOpenCourier} onOpenChange={handleCourierDialogChange} modal={true}>
                <Dialog.Portal>
                    {transitionCourier((style, item) =>
                        item && (
                            <DialogContainer style={style}>
                                <OverlayBackground />
                                <Content>
                                    <DialogHeader>
                                        <CloseButton onClick={() => setIsOpenCourier(false)}>
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.9574 14.1689L8.59651 6.75098L6.73232 8.59598L14.1313 16.071L6.71338 23.4129L8.5964 25.2769L15.9574 17.8779L23.3943 25.2769L25.2392 23.4129L17.8213 16.071L25.2202 8.59598L23.3752 6.75098L15.9574 14.1689Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </CloseButton>
                                    </DialogHeader>
                                    <Title>Přidejte se k Nám!</Title>
                                    <p>You must be at least 18 years old to use the Service.

You agree to use the Service only for lawful purposes and in accordance with these Terms.

You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account or password.</p>
                                    <form>
                                        <CheckboxInput type="checkbox" id="agree" />
                                        <CheckboxLabel htmlFor="agree">Souhlasím s podmínkami</CheckboxLabel><br></br>
                                        <SubmitButton onClick={() => setIsOpenCourier(false)}>Přihlásit se</SubmitButton>
                                    </form>
                                </Content>
                            </DialogContainer>
                        )
                    )}
                </Dialog.Portal>
            </Dialog.Root>
        </main>
    );
}

const OverlayBackground = styled(Dialog.Overlay, {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    inset: 0,
});

const Content = styled(Dialog.Content, {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: '24px 24px 32px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '90%', // Adjusted width
    maxWidth: '500px',
    zIndex: "1",
});

const DialogContainer = styled(animated.div, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const DialogHeader = styled('header', {
    display: 'flex',
    justifyContent: 'flex-end',
});

const CloseButton = styled('button', {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'black',
});

const Title = styled(Dialog.Title, {
    fontSize: 30,
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'center',
    marginBottom: '1rem',
    color: 'black'
});

const Form = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

const Input = styled('input', {
    padding: '0.75rem',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    borderRadius: '12px',
    border: '1px solid #ddd',
    width: '95%',
    backgroundColor: 'White',
    color: 'black',
    '@media (max-width: 768px)': {
        width: 'calc(100% - 16px)',
    },
});


const CheckboxInput = styled('input', {
    marginRight: '8px',
});

const CheckboxLabel = styled('label', {
    cursor: 'pointer',
    userSelect: 'none',
});

const SubmitButton = styled('button', {
    padding: '0.75rem',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    borderRadius: '12px',
    border: 'none',
    marginTop: '2rem',
    marginLeft: '35%',
    backgroundColor: '#60D140',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#4caf50',
    },
});
