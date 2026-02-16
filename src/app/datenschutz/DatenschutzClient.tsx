"use client";

import { useState } from "react";
import LegalPageGate from "@/components/legal/LegalPageGate";

const legalProse =
  "text-foreground/90 leading-relaxed [&_a]:underline [&_a]:hover:opacity-100";

export default function DatenschutzClient() {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <LegalPageGate
        title="Datenschutzerklärung"
        onReveal={() => setRevealed(true)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-10">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Datenschutzerklärung
        </h1>

        <section>
          <h2 className="mb-2 text-lg font-medium">1. Verantwortlicher</h2>
          <p className={legalProse}>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className={`mt-2 ${legalProse}`}>
            Alex Büchel
            <br />
            Belgradstr. 34
            <br />
            80796 München
            <br />
            Deutschland
            <br />
            E-Mail:{" "}
            <a href="mailto:abos123@posteo.de">abos123@posteo.de</a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">2. Hosting</h2>
          <p className={legalProse}>
            Diese Website wird bei folgendem Anbieter gehostet:
          </p>
          <p className={`mt-2 ${legalProse}`}>
            Vercel Inc.
            <br />
            340 S Lemon Ave #4133
            <br />
            Walnut, CA 91789
            <br />
            USA
          </p>
          <p className={`mt-3 ${legalProse}`}>
            Beim Aufruf der Website verarbeitet der Hosting-Anbieter automatisch
            Server-Log-Daten. Diese können insbesondere enthalten:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-foreground/90">
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Browsertyp und -version</li>
            <li>Betriebssystem</li>
            <li>Referrer-URL</li>
            <li>aufgerufene Seiten</li>
          </ul>
          <p className={`mt-3 ${legalProse}`}>
            Die Verarbeitung erfolgt zur Sicherstellung der technischen
            Funktionsfähigkeit sowie zur Systemsicherheit.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an stabiler und sicherer Bereitstellung der
            Website)
          </p>
          <p className={`mt-2 ${legalProse}`}>
            Weitere Informationen:{" "}
            <a
              href="https://vercel.com/legal"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://vercel.com/legal
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">
            3. Nutzung externer CDN- und Script-Dienste
          </h2>
          <p className={legalProse}>
            Zur Bereitstellung einzelner Funktionen werden externe Dienste
            genutzt:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-foreground/90">
            <li>jsDelivr (CDN)</li>
            <li>Unicorn Studio SDK</li>
            <li>Logo.dev</li>
            <li>Clearbit (Fallback Logo API)</li>
          </ul>
          <p className={`mt-3 ${legalProse}`}>
            Beim Laden dieser Inhalte kann es zur Übermittlung der IP-Adresse an
            die jeweiligen Anbieter kommen.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
            (technisches Interesse an Darstellung und Funktionalität der
            Website)
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">4. Schriftarten</h2>
          <p className={legalProse}>
            Google Fonts werden über Next.js zur Build-Zeit eingebunden. Es
            erfolgt kein direkter Abruf von Google-Servern durch den Browser der
            Nutzer.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            Die Schrift „Climate Crisis“ wird lokal über das Paket Fontsource
            eingebunden.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">
            5. KI-Chat-Funktion (OpenAI)
          </h2>
          <p className={legalProse}>
            Diese Website bietet eine KI-gestützte Chat-Funktion.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            Bei Nutzung dieser Funktion werden folgende Daten an OpenAI
            übermittelt:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-foreground/90">
            <li>vom Nutzer eingegebene Nachrichten</li>
            <li>technische Metadaten zur Verarbeitung</li>
          </ul>
          <p className={`mt-3 ${legalProse}`}>
            Es erfolgt keine Speicherung der Chatverläufe auf dieser Website.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            OpenAI verarbeitet die Daten eigenverantwortlich als Dienstleister.
            Die Server von OpenAI befinden sich in den USA.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
            (Bereitstellung interaktiver Inhalte)
          </p>
          <p className={`mt-2 ${legalProse}`}>
            <strong>Drittlandübermittlung:</strong> Es kann eine Übermittlung
            personenbezogener Daten in die USA erfolgen. Die Verarbeitung
            erfolgt auf Grundlage geeigneter Garantien gemäß Art. 46 DSGVO.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            Weitere Informationen:{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://openai.com/policies/privacy-policy
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">
            6. Keine Speicherung von IP-Adressen in der Anwendung
          </h2>
          <p className={legalProse}>
            In der Anwendungslogik dieser Website werden keine IP-Adressen
            protokolliert oder gespeichert. Die Verarbeitung erfolgt
            ausschließlich im Rahmen der Server-Infrastruktur des
            Hosting-Anbieters.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">7. Speicherdauer</h2>
          <p className={legalProse}>
            Server-Logdaten werden durch den Hosting-Anbieter gemäß dessen
            interner Richtlinien gespeichert und anschließend gelöscht.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">8. Ihre Rechte</h2>
          <p className={legalProse}>Sie haben das Recht auf:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-foreground/90">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
          </ul>
          <p className={`mt-3 ${legalProse}`}>
            Sie haben zudem das Recht, sich bei einer
            Datenschutzaufsichtsbehörde zu beschweren.
          </p>
          <p className={`mt-2 ${legalProse}`}>
            <strong>Zuständige Aufsichtsbehörde:</strong>
          </p>
          <p className={`mt-1 ${legalProse}`}>
            Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
            <br />
            Promenade 18
            <br />
            91522 Ansbach
            <br />
            Deutschland
          </p>
        </section>
      </div>
    </main>
  );
}
