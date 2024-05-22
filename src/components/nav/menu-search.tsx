"use client"

import {useState} from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import AutoComplete from "./autocomplete"

export default function InputSearch(){
    const [search, setSearch] = useState("")
    return(
        <div className="location">
            <AutoComplete />
        </div>
    )
}