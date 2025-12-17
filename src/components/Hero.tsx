import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-broi">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium text-white/90 ring-1 ring-white/20">
            Zaufany partner w nieruchomosciach
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Twoja droga do{' '}
          <span className="text-gradient">zyskownych</span>
          <br />
          inwestycji w nieruchomosci
        </h1>

        {/* Subheading */}
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/80 mb-10">
          Kupujemy, remontujemy i sprzedajemy nieruchomosci.
          Pomagamy inwestorom osiagac najlepszy zwrot z inwestycji.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#oferty"
            className="rounded-lg px-8 py-4 text-base font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--broi-gold)', color: 'var(--broi-navy-dark)' }}
          >
            Zobacz nasze oferty
          </Link>
          <Link
            href="#kontakt"
            className="rounded-lg px-8 py-4 text-base font-semibold text-white ring-2 ring-white/30 transition-all hover:bg-white/10"
          >
            Bezplatna konsultacja
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: '3+', label: 'Lata doswiadczenia' },
            { value: '50+', label: 'Zrealizowanych projektow' },
            { value: '100%', label: 'Zadowolonych klientow' },
            { value: '30%', label: 'Sredni ROI' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
