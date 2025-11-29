export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-charcoal rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blood-rose rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-8 text-gold font-serif text-xl tracking-widest animate-pulse">LOADING...</p>
        </div>
    )
}
