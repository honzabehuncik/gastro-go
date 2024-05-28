import { signIn } from "next-auth/react";
import React from "react";
import "./restaurants.css";
import { getCustomerOrderRestaurant, updateStatus } from "@/lib/db";
import { auth } from '@/auth';
import { format, addMinutes } from 'date-fns';
import { revalidatePath } from "next/cache";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"  


export default async function DriverPage() {
    const session = await auth();
    const heading = !session ? "Neoprávněný přístup!" : "Administrace - restaurace";
    let customerOrder = await getCustomerOrderRestaurant();

    async function completeOrder(formData: FormData){
        "use server"

        const id = formData.get("id") as string
        const statusId = "clwj4ynrv00035cjptyk5a0dt"

        const order = await updateStatus(id, statusId)

        revalidatePath("/restaurants")

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
                    {session ? (
                        <>
                            <h1>Nové objednávky</h1>
                            <p>
                                Níže naleznete nové objednávky, které je potřeba připravit.
                                <br/>Každá objednávka má přiřazeného kurýra, který ji vyzvedne v očekávaný čas.
                            </p>
                            <div className="order-table">
                                {customerOrder.map((order: any) => (
                                    <div key={order.id} className="order-row">
                                        <div className="order-id">ID: #{order.id}</div>
                                        <div className="order-details">
                                            <strong>Položky:</strong>
                                            {order.orderItems.map((item: any, index: number) => (
                                                <div key={index}>
                                                    <strong><span className="order-quantity">{item.quantity}x</span></strong> {item.menu.name}<br/>
                                                </div>
                                            ))}
                                        
                                        </div>
                                        <form action={completeOrder}>
                                            <input type="hidden" name="id" value={order.id}></input>
                                            <button className="assign-button">Dokončit objednávku</button>
                                        </form>
                                        <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="details-btn"></AccordionTrigger>
    <AccordionContent>
        <div id="wrapper">
            <div className="leftSide">
                <div className="map-image"></div>
            </div>

            <div className="rightSide">
                            <div className="right-1">
                                <div className="info">
                                    <strong>Kurýr:</strong> {order.driver ? `${order.driver.user.name} (${order.driver.vehicleInfo})` : "Nepřiřazen"}<br />
                                    <strong>Adresa:</strong> {order.restaurant.address} {order.deliveryAddress}<br/>
                                    <strong>Čas objednání:</strong> {format(new Date(order.orderDate), "dd.MM.yyyy HH:mm")}<br/>
                                    <strong>Čas doručení:</strong> {format(addMinutes(new Date(order.orderDate), 40), "dd.MM.yyyy HH:mm")}<br/>
                                </div>
                                
                                <button className="assign-button">Dokončit objednávku</button>
                            </div>

                            <div className="right-2">
                                <div className={`order-status status-recorded`}>
                                {order.status.statusName}
                                </div>
                            </div>      
            </div>
        </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Pro přístup na tuhle stránku se musíte přihlásit!</h1>
                            <button onClick={() => signIn("google")}>Přihlašte se přes Google</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
