import Navbar from '@/components/Navbar'
import Footer from '@/components/SiteFooter'

export default function SiteLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <main className='grow flex flex-col'>{children}</main>
            <Footer />
        </>
    )
}
