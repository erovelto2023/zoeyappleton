import Link from "next/link";
import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import Character from "@/models/Character";
import CharacterCard from "@/components/CharacterCard";
import Newsletter from "@/components/Newsletter";

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();

  // Helper to handle image URLs (relative vs absolute vs legacy filenames)
  const getImageSrc = (src: string | undefined) => {
    if (!src) return '/images/zoey.png'; // Fallback
    if (src.startsWith('http') || src.startsWith('/')) return src;
    // Assume it's a filename in public/images
    return `/images/${src}`;
  };

  // Fetch latest 3 books
  const books = await Book.find({}).sort({ releaseDate: -1 }).limit(3).lean();

  // Fetch 4 featured characters (randomly or specific ones)
  // For now, just taking the first 4, but could be randomized
  const characters = await Character.find({}).limit(4).populate('book').lean();

  const serializedCharacters = characters.map((char: any) => ({
    id: char._id.toString(),
    name: char.name,
    image: char.image,
    tagline: char.tagline,
    coreIdentity: char.coreIdentity,
    book: char.book?._id.toString()
  }));

  return (
    <div className="min-h-screen bg-midnight text-cream">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=2696&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gold text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            The Zoey Appleton Universe
          </p>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tight leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Danger. Desire. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">Destiny.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Step into a world where ruthless billionaires meet their match, and love is the only weapon strong enough to survive.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link
              href="/books"
              className="bg-blood-rose hover:bg-red-800 text-white px-10 py-4 rounded-sm uppercase tracking-widest text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-blood-rose/20"
            >
              Start Reading
            </Link>
            <Link
              href="/characters"
              className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-midnight px-10 py-4 rounded-sm uppercase tracking-widest text-sm font-bold transition-all duration-300"
            >
              Meet the Players
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-midnight relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Latest Releases</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {books.map((book: any) => (
              <div key={book._id} className="group relative">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-sm shadow-2xl mb-6 border border-gray-800 group-hover:border-gold transition-colors duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageSrc(book.coverImage)}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={`/books/${book._id}`}
                      className="bg-white text-midnight px-6 py-3 rounded-sm uppercase tracking-widest text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2 text-center group-hover:text-gold transition-colors">{book.title}</h3>
                <p className="text-gray-400 text-sm text-center line-clamp-2 px-4">{book.blurb}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/books" className="text-gold hover:text-white border-b border-gold hover:border-white transition-colors uppercase tracking-widest text-sm pb-1">
              View Full Library
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Characters Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">The Key Players</h2>
              <div className="w-24 h-1 bg-blood-rose mb-6"></div>
              <p className="text-gray-400 text-lg">
                Behind every great fortune lies a greater crime. Meet the men and women who rule Sterling City.
              </p>
            </div>
            <Link
              href="/characters"
              className="hidden md:inline-block bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:text-white px-6 py-2 rounded-sm uppercase tracking-widest text-xs font-bold transition-colors"
            >
              View All Characters
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {serializedCharacters.map((char: any) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/characters"
              className="inline-block bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:text-white px-6 py-2 rounded-sm uppercase tracking-widest text-xs font-bold transition-colors"
            >
              View All Characters
            </Link>
          </div>
        </div>
      </section>

      {/* About Author Teaser */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-midnight relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-charcoal/50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative z-10 border-2 border-gold/30 p-2 rounded-sm rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/zoey.png"
                alt="Zoey Appleton"
                className="w-full h-auto rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-blood-rose/20 blur-3xl -z-10 transform translate-x-12 translate-y-12"></div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">The Architect</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Zoey Appleton</h2>
            <p className="text-xl text-gray-300 mb-6 italic border-l-4 border-gold pl-6 py-2">
              &quot;Live, Laugh, Love hard, and Read.&quot;
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Zoey Appleton doesn’t just write romance; she builds empires of emotion and suspense. Known for her &quot;touch-her-and-you-die&quot; energy and irresistible witty banter, she weaves tales of redemption and scorching chemistry.
            </p>
            <Link
              href="/about"
              className="inline-block text-white font-bold uppercase tracking-widest border-b-2 border-blood-rose hover:border-white pb-1 transition-colors"
            >
              Read Full Bio
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2666&auto=format&fit=crop')] bg-cover bg-fixed bg-center relative">
        <div className="absolute inset-0 bg-midnight/90"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Heartstrings our Romance Magazine Launching in 2026</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the VIP list and get the exclusive, spicy epilogue that was too hot for the final book, plus updates on new releases.
          </p>

          <Newsletter />
        </div>
      </section>
    </div>
  );
}
