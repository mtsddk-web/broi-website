'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Offer {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  type: 'sprzedaz' | 'wynajem';
  status: 'aktywna' | 'robocza' | 'sprzedana';
  image: string;
}

const mockOffers: Offer[] = [
  {
    id: 1,
    title: 'Mieszkanie 3-pokojowe w centrum',
    location: 'Szamotuly, ul. Poznanska 15',
    price: 285000,
    area: 65,
    rooms: 3,
    type: 'sprzedaz',
    status: 'aktywna',
    image: '/placeholder-1.jpg',
  },
  {
    id: 2,
    title: 'Dom jednorodzinny z ogrodem',
    location: 'Pniewy, ul. Ogrodowa 8',
    price: 520000,
    area: 140,
    rooms: 5,
    type: 'sprzedaz',
    status: 'aktywna',
    image: '/placeholder-2.jpg',
  },
  {
    id: 3,
    title: 'Kawalerka do wynajecia',
    location: 'Szamotuly, ul. Dworcowa 22',
    price: 1800,
    area: 32,
    rooms: 1,
    type: 'wynajem',
    status: 'robocza',
    image: '/placeholder-3.jpg',
  },
];

export default function AdminPanel() {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    area: '',
    rooms: '',
    type: 'sprzedaz' as 'sprzedaz' | 'wynajem',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOffer: Offer = {
      id: offers.length + 1,
      title: formData.title,
      location: formData.location,
      price: parseInt(formData.price),
      area: parseInt(formData.area),
      rooms: parseInt(formData.rooms),
      type: formData.type,
      status: 'robocza',
      image: '/placeholder-new.jpg',
    };
    setOffers([newOffer, ...offers]);
    setShowForm(false);
    setSuccessMessage('Oferta zostala dodana! Pojawi sie na stronie po zatwierdzeniu.');
    setFormData({ title: '', location: '', price: '', area: '', rooms: '', type: 'sprzedaz', description: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const formatPrice = (price: number, type: 'sprzedaz' | 'wynajem') => {
    const formatted = new Intl.NumberFormat('pl-PL').format(price);
    return type === 'wynajem' ? `${formatted} zl/mies` : `${formatted} zl`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktywna': return 'bg-green-100 text-green-800';
      case 'robocza': return 'bg-yellow-100 text-yellow-800';
      case 'sprzedana': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--broi-gray-light)' }}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold" style={{ color: 'var(--broi-navy)' }}>BROI</span>
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">Panel Admina</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm hover:underline" style={{ color: 'var(--broi-gray)' }}>
                Zobacz strone
              </Link>
              <span className="text-sm" style={{ color: 'var(--broi-gray)' }}>Zalogowany: admin@broi.pl</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Success message */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 font-medium">
            {successMessage}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold" style={{ color: 'var(--broi-navy)' }}>{offers.length}</div>
            <div className="text-sm" style={{ color: 'var(--broi-gray)' }}>Wszystkie oferty</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600">{offers.filter(o => o.status === 'aktywna').length}</div>
            <div className="text-sm" style={{ color: 'var(--broi-gray)' }}>Aktywne</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-yellow-600">{offers.filter(o => o.status === 'robocza').length}</div>
            <div className="text-sm" style={{ color: 'var(--broi-gray)' }}>Robocze</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold" style={{ color: 'var(--broi-gold)' }}>12</div>
            <div className="text-sm" style={{ color: 'var(--broi-gray)' }}>Zapytania (ten miesiac)</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--broi-navy)' }}>Twoje oferty</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--broi-gold)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Dodaj oferte
          </button>
        </div>

        {/* Add form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--broi-navy)' }}>Dodaj nowa oferte</h2>
                  <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Tytul oferty</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none"
                    placeholder="np. Mieszkanie 3-pokojowe w centrum"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Lokalizacja</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none"
                    placeholder="np. Szamotuly, ul. Poznanska 15"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Cena (PLN)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none"
                      placeholder="300000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Typ</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sprzedaz' | 'wynajem' })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none"
                    >
                      <option value="sprzedaz">Sprzedaz</option>
                      <option value="wynajem">Wynajem</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Metraz (m2)</label>
                    <input
                      type="number"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none"
                      placeholder="65"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Liczba pokoi</label>
                    <input
                      type="number"
                      required
                      value={formData.rooms}
                      onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none"
                      placeholder="3"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Zdjecia</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[var(--broi-gold)] transition-colors cursor-pointer">
                    <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--broi-gray)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm" style={{ color: 'var(--broi-gray)' }}>Przeciagnij zdjecia lub kliknij aby wybrac</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--broi-gray)' }}>JPG, PNG do 5MB</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--broi-text)' }}>Opis</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none resize-none"
                    placeholder="Opisz nieruchomosc..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                    style={{ color: 'var(--broi-text)' }}
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--broi-gold)' }}
                  >
                    Zapisz oferte
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Offers list */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--broi-gray-light)' }}>
                <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: 'var(--broi-gray)' }}>Oferta</th>
                <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: 'var(--broi-gray)' }}>Lokalizacja</th>
                <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: 'var(--broi-gray)' }}>Cena</th>
                <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: 'var(--broi-gray)' }}>Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: 'var(--broi-gray)' }}>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: 'var(--broi-text)' }}>{offer.title}</div>
                        <div className="text-sm" style={{ color: 'var(--broi-gray)' }}>{offer.area} m2 | {offer.rooms} pok.</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--broi-gray)' }}>{offer.location}</td>
                  <td className="px-6 py-4 font-semibold" style={{ color: 'var(--broi-navy)' }}>{formatPrice(offer.price, offer.type)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edytuj">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--broi-gray)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Usun">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--broi-gray)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Demo notice */}
        <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Demo:</strong> To jest wersja pokazowa panelu administracyjnego. Po wdrozeniu pelnej wersji,
            wszystkie oferty beda zapisywane w bazie danych i automatycznie pojawiaja sie na stronie.
          </p>
        </div>
      </main>
    </div>
  );
}
