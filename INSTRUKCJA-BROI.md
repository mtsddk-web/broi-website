# BROI Website - Instrukcja obslugi

## Strona jest dostepna pod adresem:
**https://broi-website.vercel.app** (tymczasowy)
**https://broi.pl** (docelowy - wymaga przekierowania DNS)

---

## JAK DODAWAC OFERTY?

### Metoda 1: ClickUp (rekomendowane)

1. Wejdz do ClickUp
2. Znajdz liste "Oferty BROI"
3. Dodaj nowe zadanie z:
   - **Nazwa**: Tytul oferty (np. "Mieszkanie 3-pokojowe w centrum")
   - **Pola niestandardowe**:
     - Lokalizacja: np. "Szamotuly, ul. Poznanska 15"
     - Cena: np. 285000
     - Metraz: np. 65
     - Pokoje: np. 3
     - Typ: "sprzedaz" lub "wynajem"
   - **Zalaczniki**: Zdjecia nieruchomosci
4. Zmien status na "Publikuj"
5. Oferta pojawi sie na stronie w ciagu 5 minut!

### Metoda 2: Bezposrednia edycja (dla programisty)

Oferty mozna tez edytowac bezposrednio w pliku:
`src/components/Offers.tsx` - tablica `mockOffers`

---

## JAK ZMIENIAC TRESC NA STRONIE?

### Teksty i dane kontaktowe:
- `src/components/Hero.tsx` - glowny baner
- `src/components/About.tsx` - sekcja "O nas"
- `src/components/Services.tsx` - lista uslug
- `src/components/Contact.tsx` - dane kontaktowe
- `src/components/Footer.tsx` - stopka

### Kolory i style:
- `src/app/globals.css` - kolory BROI (granat, zloty)

---

## JAK PODPIAC DOMENE broi.pl?

### Opcja A: Przekierowanie DNS (rekomendowane)

1. Zaloguj sie do panelu gdzie masz domene (np. home.pl, OVH)
2. Zmien rekordy DNS:
   - Typ: CNAME
   - Nazwa: @ lub www
   - Wartosc: cname.vercel-dns.com

### Opcja B: Przenosimy domene na Vercel

Mozemy pomoc w przeniesieniu domeny na Vercel - wtedy wszystko bedzie w jednym miejscu.

---

## KOSZTY

| Usluga | Koszt | Opis |
|--------|-------|------|
| Hosting Vercel | 0 zl | Darmowy dla tej skali |
| Domena broi.pl | ~50 zl/rok | Juz macie |
| ClickUp | 0 zl | Darmowa wersja wystarcza |

**RAZEM: ~50 zl/rok** (tylko odnowienie domeny)

---

## KONTAKT TECHNICZNY

W razie problemow:
- Mateusz Dudek
- MasterZone
