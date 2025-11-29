import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-midnight text-cream border-t border-charcoal mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">ZOEY APPLETON</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Love that bites back. Dark, gritty, and undeniably passionate romance set in the heart of Sterling City.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://www.youtube.com/@ZoeyAppleton" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="mailto:zoeyappleton1221@gmail.com" className="text-gray-400 hover:text-gold transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/books" className="text-gray-400 hover:text-gold transition-colors">Books</Link></li>
              <li><Link href="/characters" className="text-gray-400 hover:text-gold transition-colors">Characters</Link></li>
              <li><Link href="/world" className="text-gray-400 hover:text-gold transition-colors">World Map</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-gold transition-colors">Behind the Scenes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Zoey Appleton. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
