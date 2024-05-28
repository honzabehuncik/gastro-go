"use client"

import { IoIosAdd } from 'react-icons/io';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Notification(){
    const notify = () => toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
        });;

    return(
        <button onClick={notify} className="add-button">
            <IoIosAdd className="plus-icon" />
        </button>
    )
}