"use client";

import { useState } from "react";
import LegalPageGate from "@/components/legal/LegalPageGate";

const legalProse =
  "text-foreground/90 leading-relaxed [&_a]:underline [&_a]:hover:opacity-100";

export default function ImpressumClient() {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <LegalPageGate
        title="Impressum"
        onReveal={() => setRevealed(true)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Impressum
        </h1>

        <p className="text-sm text-muted-foreground">
          Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
        </p>

        <section>
          <h2 className="mb-2 text-lg font-medium">Anbieter</h2>
          <p className={legalProse}>
            Alex Büchel
            <br />
            Belgradstr. 34
            <br />
            80796 München
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">Kontakt</h2>
          <p className={legalProse}>
            E-Mail:{" "}
            <a href="mailto:abos123@posteo.de">abos123@posteo.de</a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className={legalProse}>
            Alex Büchel
            <br />
            Belgradstr. 34
            <br />
            80796 München
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">Hinweis zur KI-Funktion</h2>
          <p className={legalProse}>
            Die auf dieser Website angebotene Chat- bzw. KI-Funktion wird
            technisch über die API von OpenAI (OpenAI, L.L.C., USA)
            bereitgestellt.
          </p>
        </section>
      </div>
    </main>
  );
}
