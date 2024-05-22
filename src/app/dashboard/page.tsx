"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { useTransition, animated } from '@react-spring/web';
import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';
import "./dashboard.css";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const handleDialogChange = (isOpen) => setIsOpen(isOpen);

    const transition = useTransition(isOpen, {
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
                            <Link href="/driver">
                                <button>Přihlásit se jako kurýr</button>
                            </Link>
                            <button onClick={() => setIsOpen(true)}>Zažádat o přidání restaurace</button>
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

            <Dialog.Root open={isOpen} onOpenChange={handleDialogChange}>
                <Dialog.Portal>
                    {transition((style, item) => 
                        item && (
                            <>
                                <OverlayBackground style={{ opacity: style.opacity }} />
                                <Content style={style}>
                                    <DialogHeader>
                                        <CloseButton onClick={() => setIsOpen(false)}>
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
                                    <Title>Zaregistruj svoji restauraci</Title>
                                    <Form>
                                        <Input type="text" placeholder="název" />
                                        <Input type="text" placeholder="adresa" />
                                        <Input type="email" placeholder="email" />
                                        <Input type="tel" placeholder="telefon" />
                                        <SubmitButton>Submit</SubmitButton>
                                    </Form>
                                </Content>
                            </>
                        )
                    )}
                </Dialog.Portal>
            </Dialog.Root>
        </main>
    );
}

// Popup components
const OverlayBackground = styled(animated(Dialog.Overlay), {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    inset: 0,
});

const Content = styled(animated(Dialog.Content), {
    position: 'relative',
    top: '10%',
    left: '35%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    maxWidth: '500px',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: '24px 24px 32px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
});

const DialogHeader = styled('header', {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 16,
});

const CloseButton = styled('button', {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'black',
});

const Title = styled(Dialog.Title, {
    fontSize: 25,
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
    width: '100%',
    backgroundColor: 'White',
    color: 'black'
});

const SubmitButton = styled('button', {
    padding: '0.75rem',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#60D140',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#4caf50',
    },
});
