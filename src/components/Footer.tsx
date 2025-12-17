import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-broi text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold">BROI</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              Profesjonalne uslugi na rynku nieruchomosci w Wielkopolsce.
              Kupujemy, remontujemy, sprzedajemy - pomagamy inwestowac madrze.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span className="font-semibold text-white/70">B</span>iznes
              <span className="mx-1">•</span>
              <span className="font-semibold text-white/70">R</span>ozwoj
              <span className="mx-1">•</span>
              <span className="font-semibold text-white/70">O</span>szczedzanie
              <span className="mx-1">•</span>
              <span className="font-semibold text-white/70">I</span>nwestowanie
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Szybkie linki</h3>
            <ul className="space-y-3">
              {[
                { name: 'O nas', href: '#o-nas' },
                { name: 'Uslugi', href: '#uslugi' },
                { name: 'Oferty', href: '#oferty' },
                { name: 'Kontakt', href: '#kontakt' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a href="tel:+48787213965" className="hover:text-white transition-colors">
                  +48 787 213 965
                </a>
              </li>
              <li>
                <a href="mailto:biuro@broi.pl" className="hover:text-white transition-colors">
                  biuro@broi.pl
                </a>
              </li>
              <li>Szamotuly, Wielkopolska</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {currentYear} BROI Sp. z o.o. Wszelkie prawa zastrzezone.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">
              Polityka prywatnosci
            </Link>
            <Link href="/regulamin" className="hover:text-white transition-colors">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
