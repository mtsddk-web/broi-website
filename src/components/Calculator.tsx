'use client';

import { useState, useEffect } from 'react';

type PropertyType = 'spoldzielcze-kw' | 'spoldzielcze' | 'hipoteczne';

interface CalculationResult {
  propertyPrice: number;
  pccTax: number; // Podatek od czynności cywilnoprawnych (2%)
  notaryFee: number; // Taksa notarialna
  notaryVat: number; // VAT od taksy (23%)
  applicationFee: number; // Opłata za wniosek
  applicationVat: number; // VAT od opłaty
  agencyCommission: number; // Prowizja agencji
  agencyVat: number; // VAT od prowizji
  courtFee: number; // Opłata sądowa
  total: number; // Suma wszystkiego
}

// Taksa notarialna według ustawy (stawki maksymalne)
function calculateNotaryFee(price: number): number {
  if (price <= 3000) return 100;
  if (price <= 10000) return 100 + (price - 3000) * 0.03;
  if (price <= 30000) return 310 + (price - 10000) * 0.02;
  if (price <= 60000) return 710 + (price - 30000) * 0.01;
  if (price <= 1000000) return 1010 + (price - 60000) * 0.004;
  if (price <= 2000000) return 4770 + (price - 1000000) * 0.002;
  return 6770 + (price - 2000000) * 0.0025; // Powyżej 2mln - 0.25%
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function Calculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>('hipoteczne');
  const [price, setPrice] = useState<string>('300000');
  const [agencyPercent, setAgencyPercent] = useState<string>('2');
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const priceNum = parseFloat(price.replace(/\s/g, '')) || 0;
    const agencyPercentNum = parseFloat(agencyPercent) || 0;

    if (priceNum <= 0) {
      setResult(null);
      return;
    }

    // Obliczenia
    const pccTax = priceNum * 0.02; // 2% PCC
    const notaryFee = calculateNotaryFee(priceNum);
    const notaryVat = notaryFee * 0.23; // 23% VAT
    const applicationFee = 200; // Stała opłata
    const applicationVat = applicationFee * 0.23;
    const agencyCommission = priceNum * (agencyPercentNum / 100);
    const agencyVat = agencyCommission * 0.23;

    // Opłata sądowa zależy od typu nieruchomości
    let courtFee = 200; // Standardowa
    if (propertyType === 'spoldzielcze') {
      courtFee = 150; // Niższa dla spółdzielczego bez KW
    } else if (propertyType === 'hipoteczne') {
      courtFee = 200; // Może być wyższa dla wpisu hipoteki
    }

    const total = priceNum + pccTax + notaryFee + notaryVat + applicationFee + applicationVat + agencyCommission + agencyVat + courtFee;

    setResult({
      propertyPrice: priceNum,
      pccTax,
      notaryFee,
      notaryVat,
      applicationFee,
      applicationVat,
      agencyCommission,
      agencyVat,
      courtFee,
      total,
    });
  }, [price, agencyPercent, propertyType]);

  return (
    <section id="kalkulator" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--broi-navy)' }}>
            Kalkulator kosztow zakupu
          </h2>
          <p className="text-lg" style={{ color: 'var(--broi-gray)' }}>
            Oblicz calkowity koszt zakupu nieruchomosci wraz ze wszystkimi oplatami
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Input section */}
          <div className="p-6 lg:p-8" style={{ backgroundColor: 'var(--broi-gray-light)' }}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Property type */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                  Rodzaj nieruchomosci
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { value: 'spoldzielcze-kw', label: 'Spoldzielcze z KW' },
                    { value: 'spoldzielcze', label: 'Spoldzielcze bez KW' },
                    { value: 'hipoteczne', label: 'Hipoteczne / Dom / Dzialka' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPropertyType(option.value as PropertyType)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        propertyType === option.value
                          ? 'text-white shadow-md'
                          : 'bg-white border border-gray-200 hover:border-gray-300'
                      }`}
                      style={propertyType === option.value ? { backgroundColor: 'var(--broi-gold)' } : { color: 'var(--broi-text)' }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                  Cena nieruchomosci (PLN)
                </label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none transition-colors text-lg font-semibold"
                  placeholder="300000"
                />
              </div>

              {/* Agency commission */}
              <div>
                <label htmlFor="agency" className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                  Prowizja agencji (%)
                </label>
                <input
                  type="text"
                  id="agency"
                  value={agencyPercent}
                  onChange={(e) => setAgencyPercent(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none transition-colors text-lg font-semibold"
                  placeholder="2"
                />
              </div>
            </div>
          </div>

          {/* Results section */}
          {result && (
            <div className="p-6 lg:p-8">
              <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--broi-navy)' }}>
                Szczegolowe koszty:
              </h3>

              <div className="space-y-3">
                {/* Price */}
                <div className="flex justify-between items-center py-2">
                  <span style={{ color: 'var(--broi-gray)' }}>Cena nieruchomosci</span>
                  <span className="font-semibold" style={{ color: 'var(--broi-text)' }}>
                    {formatCurrency(result.propertyPrice)}
                  </span>
                </div>

                <hr className="border-gray-100" />

                {/* PCC Tax */}
                <div className="flex justify-between items-center py-2">
                  <span style={{ color: 'var(--broi-gray)' }}>
                    Podatek PCC (2%)
                  </span>
                  <span className="font-medium" style={{ color: 'var(--broi-text)' }}>
                    {formatCurrency(result.pccTax)}
                  </span>
                </div>

                {/* Notary fee */}
                <div className="flex justify-between items-center py-2">
                  <span style={{ color: 'var(--broi-gray)' }}>
                    Taksa notarialna
                  </span>
                  <span className="font-medium" style={{ color: 'var(--broi-text)' }}>
                    {formatCurrency(result.notaryFee)}
                  </span>
                </div>

                {/* Notary VAT */}
                <div className="flex justify-between items-center py-2">
                  <span style={{ color: 'var(--broi-gray)' }}>
                    VAT od taksy (23%)
                  </span>
                  <span className="font-medium" style={{ color: 'var(--broi-text)' }}>
                    {formatCurrency(result.notaryVat)}
                  </span>
                </div>

                {/* Application fee */}
                <div className="flex justify-between items-center py-2">
                  <span style={{ color: 'var(--broi-gray)' }}>
                    Oplata za wniosek + VAT
                  </span>
                  <span className="font-medium" style={{ color: 'var(--broi-text)' }}>
                    {formatCurrency(result.applicationFee + result.applicationVat)}
                  </span>
                </div>

                {/* Agency commission */}
                {result.agencyCommission > 0 && (
                  <>
                    <div className="flex justify-between items-center py-2">
                      <span style={{ color: 'var(--broi-gray)' }}>
                        Prowizja agencji ({agencyPercent}%)
                      </span>
                      <span className="font-medium" style={{ color: 'var(--broi-text)' }}>
                        {formatCurrency(result.agencyCommission)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span style={{ color: 'var(--broi-gray)' }}>
                        VAT od prowizji (23%)
                      </span>
                      <span className="font-medium" style={{ color: 'var(--broi-text)' }}>
                        {formatCurrency(result.agencyVat)}
                      </span>
                    </div>
                  </>
                )}

                {/* Court fee */}
                <div className="flex justify-between items-center py-2">
                  <span style={{ color: 'var(--broi-gray)' }}>
                    Oplata sadowa
                  </span>
                  <span className="font-medium" style={{ color: 'var(--broi-text)' }}>
                    {formatCurrency(result.courtFee)}
                  </span>
                </div>

                <hr className="border-gray-200" />

                {/* Total */}
                <div className="flex justify-between items-center py-4">
                  <span className="text-lg font-bold" style={{ color: 'var(--broi-navy)' }}>
                    RAZEM (cena + oplaty)
                  </span>
                  <span className="text-2xl font-bold" style={{ color: 'var(--broi-gold)' }}>
                    {formatCurrency(result.total)}
                  </span>
                </div>

                {/* Additional costs info */}
                <div className="mt-4 p-4 rounded-lg text-sm" style={{ backgroundColor: 'var(--broi-gray-light)', color: 'var(--broi-gray)' }}>
                  <p className="font-medium mb-2" style={{ color: 'var(--broi-text)' }}>Dodatkowe koszty do uwzglednienia:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Oplata za wypisy aktu notarialnego (~6 zl/strona)</li>
                    <li>Koszty kredytu (jesli finansowanie)</li>
                    <li>Ubezpieczenie nieruchomosci</li>
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <p className="text-sm mb-4" style={{ color: 'var(--broi-gray)' }}>
                  Potrzebujesz pomocy w zakupie nieruchomosci?
                </p>
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--broi-gold)' }}
                >
                  Skontaktuj sie z nami
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
