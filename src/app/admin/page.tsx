import { signIn, useSession } from "next-auth/react";
import React from "react";
import "./admin.css";
import { getAllRequests } from "@/lib/db";
import { auth } from '@/auth';
import { createPrismaClient } from "@/lib/prisma";
import { DiscardButton, SubmitButton } from "@/components/admin/btn";
import { revalidatePath } from "next/cache";
import SignInBtn from "@/components/SignInBtn";
const prisma = createPrismaClient();

export default async function AdminPage() {
    const session = await auth();
    const heading = !session ? "Neoprávněný přístup!" : "Admin panel";

    const request = await getAllRequests();

    async function acceptBtn(formData: FormData){
        "use server"
        const id = formData.get("id")
        const category = formData.get("category")
        if(id){
            const request = await prisma.user.update({
                where: {
                    id: id as string
                },
                data:{
                    role: category == "false" ? "Driver" : "Restaurant"
                }
            })
        }
    }

    async function discardBtn(formData: FormData){
        "use server"
        const id = formData.get("id")
        const request = await prisma.requests.delete({
            where:{
                id: id as string
            }
        })
        revalidatePath("/admin")
    }

    return (
        <main>
            <div className="admin">
                <div className="hero-section">
                    <div className="gradient-overlay"></div>
                    <div className="hero-content">
                        <h1>{heading}</h1>
                    </div>
                </div>
                <div className="admin-container">
                    {session && session.user.role == "Admin" ? (
                        <>
                        <h1>Statistiky</h1>
                        <div id="wrapper">
                            <div className="stats-left">
                                <h2>Aktivních objednávek: <strong>29</strong></h2>
                                <h2>Aktivních kurýrů: <strong>11</strong></h2>
                            </div>

                            <div className="stat-right">
                                <h2>Otevřených restaurací: <strong>20</strong></h2>
                                <h2>Restaurací celkem: <strong>52</strong></h2>
                            </div>
                        </div>
                       

                            <h1>Žádosti</h1>
                            <p>
                                Níže nalezne aktuální žádosti o přidání nové restaurace nebo o získání statusu kurýra.
                            </p>
                            <div className="request-table">
                                {request.map((req: any) => (
                                    <div className="request-row">
                                    <div className={`request-status status-${req.category ? 'restaurant' : 'driver'}`}>
                                    {req.category ? '🍝Restaurace' : '🚴 Kurýr'}
                                    </div>
                                    <div className="request-id">#{req.id}</div>
                                    <div className="request-details">{req.userName ? req.userName : req.restaurantName}</div>
                                    <div className="request-details">{req.restaurantNumber}</div>
                                    <div className="request-details">CV</div>
                                    <div className="request-btns">
                                    <form action={acceptBtn}>
                                        <input name="id" type="hidden" value={req.userId}></input>
                                        <input name="category" type="hidden" value={req.category}></input>
                                        <SubmitButton />
                                    </form>
                                    <form action={discardBtn}>
                                        <input name="id" type="hidden" value={req.id}></input>
                                        <input name="category" type="hidden" value={req.category}></input>
                                        <DiscardButton />
                                    </form>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Pro přístup na tuto stránku se musíte přihlásit!</h1>
                            <SignInBtn></SignInBtn>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
