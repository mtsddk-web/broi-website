export default function About() {
  const values = [
    {
      letter: 'B',
      title: 'Biznes',
      description: 'Profesjonalne podejscie do kazdej transakcji. Dzialamy sprawnie i skutecznie.',
    },
    {
      letter: 'R',
      title: 'Rozwoj',
      description: 'Ciagle doskonalimy nasze metody i poszerzamy kompetencje na rynku nieruchomosci.',
    },
    {
      letter: 'O',
      title: 'Oszczedzanie',
      description: 'Pomagamy klientom oszczedzac czas i pieniadze dzieki naszemu doswiadczeniu.',
    },
    {
      letter: 'I',
      title: 'Inwestowanie',
      description: 'Skupiamy sie na maksymalizacji zwrotu z inwestycji dla naszych klientow.',
    },
  ];

  return (
    <section id="o-nas" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--broi-gray-light)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--broi-navy)' }}>
            Czym jest BROI?
          </h2>
          <p className="mx-auto max-w-2xl text-lg" style={{ color: 'var(--broi-gray)' }}>
            Nasza nazwa to nie przypadek. Kazda litera reprezentuje wartosc, ktora nas definiuje
            i ktora przekladamy na realne korzysci dla naszych klientow.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.letter}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold text-white mb-6"
                style={{ backgroundColor: 'var(--broi-gold)' }}
              >
                {value.letter}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--broi-navy)' }}>
                {value.title}
              </h3>
              <p style={{ color: 'var(--broi-gray)' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--broi-navy)' }}>
                Dlaczego warto z nami wspolpracowac?
              </h3>
              <ul className="space-y-4">
                {[
                  'Kompleksowa obsluga - od zakupu przez remont do sprzedazy',
                  'Lokalna wiedza o rynku nieruchomosci w Wielkopolsce',
                  'Transparentne warunki wspolpracy',
                  'Doswiadczony zespol z pasja do nieruchomosci',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--broi-gold)' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ color: 'var(--broi-text)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div
                className="aspect-video rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--broi-navy)' }}
              >
                <span className="text-white/50 text-lg">Zdjecie zespolu / biura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
