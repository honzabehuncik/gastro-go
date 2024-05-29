"use client"

import { useShoppingCart } from "@/context/ShoppingCartContext"

export default function SubmitBtn(){
    const {setOrderStatus, orderStatus} = useShoppingCart()

    console.log(orderStatus)

    return(
        <button onClick={() => setOrderStatus("clwq0pv8e0001siwalohbw23f")} className="assign-button">Přijmout</button>
    )
}