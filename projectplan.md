# Next.js + Prisma + PostgreSQL Project Plan

## Übersicht
Fullstack Blog-Anwendung mit Next.js, Prisma ORM und PostgreSQL-Datenbank, basierend auf der Vercel-Anleitung.

## Technologie-Stack
- **Frontend**: Next.js 13+ (React Framework)
- **Backend**: Next.js API Routes
- **Datenbank**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentifizierung**: NextAuth.js mit GitHub OAuth
- **Sprache**: TypeScript
- **Deployment**: Vercel

## Voraussetzungen
- [ ] Node.js installiert
- [ ] Vercel Account erstellt
- [ ] GitHub Account vorhanden
- [ ] Vercel CLI installiert (`npm i -g vercel`)

## Projektphasen

### Phase 1: Projekt-Setup
- [ ] Next.js Projekt mit Prisma-Template erstellen
  ```bash
  npx create-next-app --example https://github.com/prisma/blogr-nextjs-prisma blogr-nextjs-prisma
  cd blogr-nextjs-prisma
  npm run dev
  ```
- [ ] Abhängigkeiten installieren
- [ ] Entwicklungsserver testen

### Phase 2: Datenbank-Konfiguration
- [ ] Vercel Postgres Datenbank erstellen
- [ ] Umgebungsvariablen lokal abrufen
  ```bash
  vercel env pull .env
  ```
- [ ] Datenbankverbindung testen

### Phase 3: Prisma Schema Design
- [ ] `schema.prisma` konfigurieren
- [ ] Datenmodelle definieren:
  - **Post Model**: id, title, content, published, author, authorId
  - **User Model**: id, name, email, posts
- [ ] Beziehungen zwischen Modellen definieren

### Phase 4: Datenbank-Migration
- [ ] Prisma Schema in Datenbank übertragen
  ```bash
  npx prisma db push
  ```
- [ ] Prisma Client generieren
  ```bash
  npx prisma generate
  ```
- [ ] Prisma Studio testen (optional)

### Phase 5: Authentifizierung
- [ ] GitHub OAuth App erstellen
- [ ] NextAuth.js konfigurieren
- [ ] Authentifizierung-Routen implementieren
- [ ] Session-Management einrichten
- [ ] Login/Logout-Funktionalität testen

### Phase 6: API-Entwicklung
- [ ] CRUD API-Routen erstellen:
  - `GET /api/posts` - Alle Posts abrufen
  - `POST /api/posts` - Neuen Post erstellen
  - `PUT /api/posts/[id]` - Post veröffentlichen
  - `DELETE /api/posts/[id]` - Post löschen
- [ ] Prisma Client in API-Routen integrieren
- [ ] Fehlerbehandlung implementieren

### Phase 7: Frontend-Entwicklung
- [ ] Seiten-Komponenten erstellen:
  - **Homepage**: Post-Feed mit veröffentlichten Posts
  - **Post-Detail**: Einzelner Post anzeigen
  - **Drafts**: Unveröffentlichte Posts verwalten
  - **Create**: Neuen Post erstellen
- [ ] Responsive Design implementieren
- [ ] Benutzerinteraktionen hinzufügen

### Phase 8: Testing & Optimierung
- [ ] Funktionalität testen:
  - Authentifizierung
  - Post-Erstellung
  - Post-Veröffentlichung
  - Post-Löschung
- [ ] Performance optimieren
- [ ] SEO-Optimierungen

### Phase 9: Deployment
- [ ] Code zu GitHub Repository pushen
- [ ] Vercel-Projekt konfigurieren
- [ ] Umgebungsvariablen in Vercel setzen:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `GITHUB_ID`
  - `GITHUB_SECRET`
- [ ] Anwendung deployen
- [ ] Produktionsumgebung testen

## Dateien & Verzeichnisse
```
/
├── prisma/
│   └── schema.prisma          # Datenbank-Schema
├── pages/
│   ├── api/
│   │   ├── auth/              # NextAuth.js Routen
│   │   └── posts/             # Post API-Routen
│   ├── drafts.tsx             # Draft-Management
│   ├── create.tsx             # Post erstellen
│   └── p/[id].tsx             # Post-Detail
├── components/                # React-Komponenten
├── lib/
│   └── prisma.ts             # Prisma Client
├── .env                      # Umgebungsvariablen
└── next.config.js            # Next.js Konfiguration
```

## Umgebungsvariablen
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."
```

## Nützliche Befehle
```bash
# Entwicklung
npm run dev                    # Entwicklungsserver starten
npx prisma studio             # Datenbank-GUI öffnen
npx prisma db push            # Schema zu DB übertragen
npx prisma generate           # Prisma Client generieren

# Deployment
vercel                        # Zu Vercel deployen
vercel env pull .env          # Umgebungsvariablen abrufen
```

## Erweiterte Features (Optional)
- [ ] Kommentar-System
- [ ] Post-Kategorien
- [ ] Suchfunktionalität
- [ ] Markdown-Support
- [ ] Bild-Upload
- [ ] Email-Benachrichtigungen

## Zeitschätzung
- **Grundfunktionalität**: 2-3 Tage
- **Vollständige Implementierung**: 1 Woche
- **Mit erweiterten Features**: 2 Wochen

## Ressourcen
- [Vercel Next.js + Prisma Guide](https://vercel.com/guides/nextjs-prisma-postgres)
- [Prisma Dokumentation](https://www.prisma.io/docs)
- [NextAuth.js Dokumentation](https://next-auth.js.org)
- [Next.js Dokumentation](https://nextjs.org/docs)