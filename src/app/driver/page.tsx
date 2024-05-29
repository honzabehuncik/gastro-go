
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import "./driver.css";
import { getCustomerOrderDriver, updateStatus } from "@/lib/db";
import { auth } from '@/auth';
import { parseISO, addMinutes, format } from 'date-fns';
import SignInBtn from "@/components/SignInBtn";
import SubmitBtn from "@/components/driver/SubmitBtn";


export default async function DriverPage() {
    const session = await auth();
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - rozvoz";

    let customerOrder = await getCustomerOrderDriver();


    async function handleDriver(formData: FormData){
        "use server"

        const id = formData.get("id") as string
        const statusId = "clwq0pv8e0001siwalohbw23f"

        const order = await updateStatus(session?.user.id!, statusId)


        return order
    }
    return (
        <main>
            <div className="driver">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>{heading}</h1>
                    </div>
                </div>
                <div className="driver-container">
                    {session && (session.user.role == "Driver" || session.user.role == "Admin") ? (
                        <>
                            <h1>Aktivní objednávky</h1>
                            <p>
                                Níže nalezne aktivní objednávky, které nemají přiřazeného kurýra pro rozvoz.
                                <br></br>Vybranou objednávku nejprve přiřaďte a poté se můžete pustit do práce!
                                </p>
                            <div className="order-table">
                                {customerOrder.map((order: any) => (
                                    <div key={order.id} className="order-row">
                                        <div className={`order-status status-recorded`}>
                                            {order.status.statusName}
                                        </div>
                                        <div className="order-id">ID: #{order.id}</div>
                                        <div className="order-details">
                                            <strong>Název: {order.restaurant.name}</strong><br/>
                                            <strong>Počet kusů: </strong>{order.orderItems.length}<br/>
                                            <strong>Adresa: {order.restaurant.address}</strong>{order.deliveryAddress}<br/>
                                            <strong>Čas objednání: </strong>{format(new Date(order.orderDate), "dd.MM.yyyy HH:mm")}<br/>
                                            <strong>Čas doručení: </strong>{format(addMinutes(new Date(order.orderDate), 40), "dd.MM.yyyy HH:mm")}
                                        </div>
                                        <form action={handleDriver}>
                                            <input type="hidden" value={order.id}></input>
                                            <SubmitBtn/>
                                        </form>
                                        <button className="edit-button">Spravovat</button>
                                        <button className="remove-button">Odstranit</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Pro přístup na tuhle stránku se musíte přihlásit!</h1>
                            <SignInBtn></SignInBtn>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
