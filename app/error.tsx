"use client"

import { useEffect } from "react"

interface ErrorInterface {
    error: Error & { disgest?: string },
    reset: () => void
}

const Error = ({ error, reset }: ErrorInterface) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}

export default Error