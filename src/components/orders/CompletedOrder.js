import React from 'react'

export default function CompletedOrder(props) {
    return (
        <>
            <div>
                <h1>Your order was complete!</h1>
                <h2>Thank you for shopping with us!</h2>
                <button onClick={() => props.history.push('/')}>Back to Home</button>
            </div>        
        </>
    )
}