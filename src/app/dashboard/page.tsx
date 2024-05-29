"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useTransition, animated } from '@react-spring/web';
import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';
import "./dashboard.css";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [isOpenRestaurant, setIsOpenRestaurant] = useState(false);
    const [isOpenCourier, setIsOpenCourier] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isCourierSignedUp, setIsCourierSignedUp] = useState(false);

    const [restaurantForm, setRestaurantForm] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        openTime: '',
        closeTime: ''
    });
    const [isRestaurantFormValid, setIsRestaurantFormValid] = useState(false);

    useEffect(() => {
        setIsRestaurantFormValid(Object.values(restaurantForm).every(field => field.trim() !== ''));
    }, [restaurantForm]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRestaurantForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleCheckboxChange = () => setIsCheckboxChecked(prev => !prev);

    const handleDialogChange = (type: 'restaurant' | 'courier', isOpen: boolean) => {
        if (type === 'restaurant') setIsOpenRestaurant(isOpen);
        else {
            (async () => {
                const res = await fetch('/api/orders/'+session?.user.id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'API-Key': process.env.DATA_API_KEY!,
                    },
                    body: JSON.stringify({
                        userId: session?.user.id
                    }),
                });
            })();
            setIsOpenCourier(isOpen)
            
        };
    };

    const transitions = {
        restaurant: useTransition(isOpenRestaurant, {
            from: { scale: 0.9, opacity: 0 },
            enter: { scale: 1, opacity: 1 },
            leave: { scale: 0.9, opacity: 0 }
        }),
        courier: useTransition(isOpenCourier, {
            from: { scale: 0.9, opacity: 0 },
            enter: { scale: 1, opacity: 1 },
            leave: { scale: 0.9, opacity: 0 }
        })
    };

    const handleCourierSignUp = () => {
        if (isCheckboxChecked) {
            setIsCourierSignedUp(true);
            setIsOpenCourier(false);
        }
    };

    const handleRestaurantSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: session?.user.id,
                    userName: session?.user.name,
                    ...restaurantForm,
                    restaurantNumber: parseInt(restaurantForm.phone),
                })
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main>
            <div className="dashboard">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>Uživatelský profil</h1>
                    </div>
                </div>
                <div className="dashboard-container">
                    {session ? (
                        <>
                            <div className="user-profile">
                                <div className="user-card">
                                    <div className="user-avatar">
                                        <img src={session.user?.image || ""} alt="User Avatar" />
                                    </div>
                                    <div className="user-info">
                                        <h1>{session.user?.name}</h1>
                                        <p>{session.user?.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="user-actions">
                                <CourierButton
                                    onClick={() => handleDialogChange('courier', true)}
                                    disabled={isCourierSignedUp}
                                >
                                    {isCourierSignedUp ? "Už jste řidič" : "Přihlásit se jako kurýr"}
                                </CourierButton>
                                <button className="btn-primary" onClick={() => handleDialogChange('restaurant', true)}>Zažádat o přidání restaurace</button>
                                <button className="btn-logout" onClick={() => signOut()}>Odhlásit se</button>
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

            <Dialog.Root open={isOpenRestaurant} onOpenChange={isOpen => handleDialogChange('restaurant', isOpen)}>
                <Dialog.Portal>
                    {transitions.restaurant((style, item) =>
                        item && (
                            <DialogContainer style={style}>
                                <OverlayBackground />
                                <Content>
                                    <DialogHeader>
                                        <CloseButton onClick={() => setIsOpenRestaurant(false)}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.9574 14.1689L8.59651 6.75098L6.73232 8.59598L14.1313 16.071L6.71338 23.4129L8.5964 25.2769L15.9574 17.8779L23.3943 25.2769L25.2392 23.4129L17.8213 16.071L25.2202 8.59598L23.3752 6.75098L15.9574 14.1689Z" fill="currentColor" />
                                            </svg>
                                        </CloseButton>
                                    </DialogHeader>
                                    <Title>Zažádat o přidání restaurace</Title>
                                    <Form onSubmit={handleRestaurantSubmit}>
                                        {["name", "address", "email", "phone"].map(field => (
                                            <Input
                                                key={field}
                                                type={field === "email" ? "email" : "text"}
                                                placeholder={`${field}*`}
                                                name={field}
                                                onChange={handleInputChange}
                                            />
                                        ))}
                                        <Heading2>Otevírací doba od:*</Heading2>
                                        <Input type="time" name="openTime" value={restaurantForm.openTime} onChange={handleInputChange} />
                                        <Heading2>Otevírací doba do:*</Heading2>
                                        <Input type="time" name="closeTime" value={restaurantForm.closeTime} onChange={handleInputChange} />
                                        <SubmitButton disabled={!isRestaurantFormValid}>Odeslat</SubmitButton>
                                    </Form>
                                </Content>
                            </DialogContainer>
                        )
                    )}
                </Dialog.Portal>
            </Dialog.Root>

            <Dialog.Root open={isOpenCourier} onOpenChange={isOpen => handleDialogChange('courier', isOpen)}>
                <Dialog.Portal>
                    {transitions.courier((style, item) =>
                        item && (
                            <DialogContainer style={style}>
                                <OverlayBackground />
                                <Content>
                                    <DialogHeader>
                                        <CloseButton onClick={() => setIsOpenCourier(false)}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.9574 14.1689L8.59651 6.75098L6.73232 8.59598L14.1313 16.071L6.71338 23.4129L8.5964 25.2769L15.9574 17.8779L23.3943 25.2769L25.2392 23.4129L17.8213 16.071L25.2202 8.59598L23.3752 6.75098L15.9574 14.1689Z" fill="currentColor" />
                                            </svg>
                                        </CloseButton>
                                    </DialogHeader>
                                    <Title>Přidejte se k Nám!</Title>
                                    <p>
                                        You must be at least 18 years old to use the Service.
                                        You agree to use the Service only for lawful purposes and in accordance with these Terms.
                                        You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account or password.
                                    </p>
                                    <form>
                                        <CheckboxInput type="checkbox" id="agree" onChange={handleCheckboxChange} />
                                        <CheckboxLabel htmlFor="agree">Souhlasím s podmínkami*</CheckboxLabel><br />
                                        <SubmitButton onClick={handleCourierSignUp} disabled={!isCheckboxChecked}>
                                            Přihlásit se
                                        </SubmitButton>
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
    padding: '10px 24px 32px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '90%',
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

const Heading2 = styled('h2', {
    fontSize: 15,
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
    width: '100%',
    fontFamily: 'Montserrat, sans-serif',
    borderRadius: '12px',
    border: 'none',
    marginTop: '2rem',
    alignItems: 'center',
    backgroundColor: '#60D140',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#4caf50',
    },
    '&:disabled': {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
});

const CourierButton = styled('button', {
    padding: '0.75rem',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    borderRadius: '12px',
    border: 'none',
    marginTop: '2rem',
    alignItems: 'center',
    color: '#fff'
});