import { getOffers, isClickUpConfigured, Offer } from '@/lib/clickup';

// Mock data - shown when ClickUp is not configured
const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Przestronne mieszkanie w centrum',
    location: 'Szamotuly, ul. Poznanska',
    price: 285000,
    area: 65,
    rooms: 3,
    type: 'sprzedaz',
    image: undefined,
  },
  {
    id: '2',
    title: 'Dom z ogrodem',
    location: 'Obrzycko, ul. Kwiatowa',
    price: 420000,
    area: 120,
    rooms: 5,
    type: 'sprzedaz',
    image: undefined,
  },
  {
    id: '3',
    title: 'Kawalerka do remontu',
    location: 'Wronki, ul. Dluga',
    price: 149000,
    area: 32,
    rooms: 1,
    type: 'sprzedaz',
    image: undefined,
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(price);
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: 'var(--broi-navy)' }}>
        {offer.image ? (
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white uppercase"
            style={{ backgroundColor: 'var(--broi-gold)' }}
          >
            {offer.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--broi-navy)' }}>
          {offer.title}
        </h3>
        <p className="text-sm mb-4 flex items-center gap-1" style={{ color: 'var(--broi-gray)' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {offer.location}
        </p>

        {/* Details */}
        <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: 'var(--broi-gray)' }}>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {offer.area} m²
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {offer.rooms} {offer.rooms === 1 ? 'pokoj' : offer.rooms < 5 ? 'pokoje' : 'pokoi'}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" style={{ color: 'var(--broi-gold)' }}>
            {formatPrice(offer.price)}
          </span>
          <a
            href="#kontakt"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--broi-navy)' }}
          >
            Zapytaj
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function Offers() {
  // Try to get offers from ClickUp, fall back to mock data
  let offers: Offer[] = [];

  if (isClickUpConfigured()) {
    offers = await getOffers();
  }

  // If no offers from ClickUp, use mock data
  if (offers.length === 0) {
    offers = mockOffers;
  }

  return (
    <section id="oferty" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--broi-gray-light)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--broi-navy)' }}>
            Aktualne oferty
          </h2>
          <p className="mx-auto max-w-2xl text-lg" style={{ color: 'var(--broi-gray)' }}>
            Sprawdz nasze najnowsze nieruchomosci na sprzedaz.
            Kazda oferta jest przez nas starannie zweryfikowana.
          </p>
        </div>

        {/* Offers grid */}
        {offers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--broi-gray)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-lg" style={{ color: 'var(--broi-gray)' }}>
              Aktualnie nie mamy ofert do wyswietlenia.
              <br />
              Skontaktuj sie z nami - znajdziemy cos dla Ciebie!
            </p>
          </div>
        )}

        {/* More offers CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--broi-gray)' }}>
            Szukasz czegos konkretnego? Mamy wiecej ofert niz tu widzisz.
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 text-base font-semibold transition-colors hover:opacity-80"
            style={{ color: 'var(--broi-gold)' }}
          >
            Powiedz nam czego szukasz
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
