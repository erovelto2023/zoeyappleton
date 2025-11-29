'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <AlertTriangle className="w-24 h-24 text-gold mb-8" />
            <h2 className="text-4xl font-serif font-bold text-cream mb-4">Something went wrong!</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-md">
                Even the best laid plans sometimes fail. We're working on fixing this glitch in the system.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="bg-charcoal border border-gold text-gold hover:bg-gold hover:text-midnight px-8 py-3 rounded-sm font-medium transition-colors duration-300 uppercase tracking-widest text-sm"
            >
                Try again
            </button>
        </div>
    )
}
