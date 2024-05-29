"use client"

import { useShoppingCart } from "@/context/ShoppingCartContext"

export default function SubmitBtn(){
    const {setOrderStatus, orderStatus} = useShoppingCart()

    console.log(orderStatus)

    return(
        <button onClick={() => setOrderStatus("Příprava")} className="assign-button">Dokončit objednávku</button>
    )
}