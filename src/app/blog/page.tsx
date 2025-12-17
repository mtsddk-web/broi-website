import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock articles - later can be from ClickUp or CMS
const articles = [
  {
    id: 1,
    title: 'Jak przygotowac mieszkanie do sprzedazy?',
    excerpt: 'Praktyczne wskazowki, ktore pomoga Ci uzyskac lepsza cene za nieruchomosc. Dowiedz sie, co warto poprawic przed wystawieniem oferty.',
    date: '2024-12-15',
    slug: 'jak-przygotowac-mieszkanie-do-sprzedazy',
    category: 'Porady',
  },
  {
    id: 2,
    title: 'Rynek nieruchomosci w Szamotulach - podsumowanie 2024',
    excerpt: 'Analiza cen mieszkan i domow w regionie. Jak zmienialy sie ceny i czego mozemy sie spodziewac w 2025 roku?',
    date: '2024-12-10',
    slug: 'rynek-nieruchomosci-szamotuly-2024',
    category: 'Rynek',
  },
  {
    id: 3,
    title: 'Kredyt hipoteczny - na co zwrocic uwage?',
    excerpt: 'Najwazniejsze aspekty przy wyborze kredytu hipotecznego. Porownanie ofert bankow i ukryte koszty, o ktorych warto wiedziec.',
    date: '2024-12-05',
    slug: 'kredyt-hipoteczny-na-co-zwrocic-uwage',
    category: 'Finanse',
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--broi-navy)' }}>
              Aktualnosci
            </h1>
            <p className="text-lg" style={{ color: 'var(--broi-gray)' }}>
              Porady, analizy rynku i nowosci ze swiata nieruchomosci
            </p>
          </div>

          {/* Articles list */}
          <div className="space-y-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'var(--broi-gold)', color: 'white' }}
                  >
                    {article.category}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--broi-gray)' }}>
                    {formatDate(article.date)}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--broi-navy)' }}>
                  {article.title}
                </h2>
                <p className="mb-4" style={{ color: 'var(--broi-gray)' }}>
                  {article.excerpt}
                </p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-80"
                  style={{ color: 'var(--broi-gold)' }}
                >
                  Czytaj wiecej
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl" style={{ backgroundColor: 'var(--broi-gray-light)' }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--broi-navy)' }}>
              Szukasz nieruchomosci?
            </h3>
            <p className="mb-4" style={{ color: 'var(--broi-gray)' }}>
              Sprawdz nasze aktualne oferty lub skontaktuj sie z nami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#oferty"
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--broi-gold)' }}
              >
                Zobacz oferty
              </Link>
              <Link
                href="/#kontakt"
                className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: 'var(--broi-navy)', color: 'var(--broi-navy)' }}
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
