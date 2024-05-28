'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton() {
    const { pending } = useFormStatus()
 
    return (
        <button className="assign-button" type="submit" disabled={pending}>
            Potvrdit
        </button>
    )   
}

export function DiscardButton(){
    const { pending } = useFormStatus()
 
    return (
        <button className="remove-button" type="submit" disabled={pending}>
            Zamítnout
        </button>
  )
}