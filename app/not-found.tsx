import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <FileQuestion className="w-24 h-24 text-blood-rose mb-8" />
            <h2 className="text-4xl font-serif font-bold text-cream mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-md">
                The page you are looking for seems to have vanished into the shadows of Sterling City.
            </p>
            <Link
                href="/"
                className="bg-blood-rose hover:bg-red-900 text-white px-8 py-3 rounded-sm font-medium transition-colors duration-300 uppercase tracking-widest text-sm"
            >
                Return Home
            </Link>
        </div>
    )
}
