'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'ogolne',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // TODO: Integrate with email service (e.g., Formspree, EmailJS, or custom API)
    // For now, simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Form submitted:', formData);
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', subject: 'ogolne', message: '' });

    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="kontakt" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--broi-navy)' }}>
              Skontaktuj sie z nami
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--broi-gray)' }}>
              Masz pytania? Chcesz sprzedac lub kupic nieruchomosc?
              Napisz do nas - odpowiemy w ciagu 24 godzin.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--broi-gray-light)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--broi-gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--broi-navy)' }}>Telefon</h3>
                  <a href="tel:+48787213965" className="text-lg hover:underline" style={{ color: 'var(--broi-text)' }}>
                    +48 787 213 965
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--broi-gray-light)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--broi-gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--broi-navy)' }}>Email</h3>
                  <a href="mailto:biuro@broi.pl" className="text-lg hover:underline" style={{ color: 'var(--broi-text)' }}>
                    biuro@broi.pl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--broi-gray-light)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--broi-gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--broi-navy)' }}>Lokalizacja</h3>
                  <p style={{ color: 'var(--broi-text)' }}>
                    Szamotuly, Wielkopolska
                    <br />
                    <span style={{ color: 'var(--broi-gray)' }}>okolice Poznania</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Working hours */}
            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: 'var(--broi-gray-light)' }}>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--broi-navy)' }}>Godziny pracy</h3>
              <div className="space-y-2 text-sm" style={{ color: 'var(--broi-text)' }}>
                <div className="flex justify-between">
                  <span>Poniedzialek - Piatek</span>
                  <span className="font-medium">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sobota</span>
                  <span className="font-medium">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Niedziela</span>
                  <span className="font-medium">Zamkniete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                    Imie i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none transition-colors"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none transition-colors"
                    placeholder="+48 123 456 789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none transition-colors"
                  placeholder="jan@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                  Temat
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none transition-colors"
                >
                  <option value="ogolne">Pytanie ogolne</option>
                  <option value="sprzedaz">Chce sprzedac nieruchomosc</option>
                  <option value="kupno">Szukam nieruchomosci</option>
                  <option value="wycena">Prosze o wycene</option>
                  <option value="wspolpraca">Propozycja wspolpracy</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--broi-text)' }}>
                  Wiadomosc *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--broi-gold)] focus:ring-2 focus:ring-[var(--broi-gold)]/20 outline-none transition-colors resize-none"
                  placeholder="Opisz swoja sprawe..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 rounded-lg text-base font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--broi-gold)' }}
              >
                {status === 'sending' ? 'Wysylanie...' : 'Wyslij wiadomosc'}
              </button>

              {status === 'success' && (
                <div className="p-4 rounded-lg bg-green-50 text-green-800 text-sm">
                  Dziekujemy! Twoja wiadomosc zostala wyslana. Odpowiemy najszybciej jak to mozliwe.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-50 text-red-800 text-sm">
                  Wystapil blad. Sprobuj ponownie lub skontaktuj sie z nami telefonicznie.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
