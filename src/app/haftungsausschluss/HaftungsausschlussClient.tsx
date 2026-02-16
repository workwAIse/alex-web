"use client";

import { useState } from "react";
import LegalPageGate from "@/components/legal/LegalPageGate";

const legalProse =
  "text-foreground/90 leading-relaxed [&_a]:underline [&_a]:hover:opacity-100";

export default function HaftungsausschlussClient() {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <LegalPageGate
        title="Haftungsausschluss"
        onReveal={() => setRevealed(true)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Haftungsausschluss
        </h1>

        <section>
          <h2 className="mb-2 text-lg font-medium">Haftung für Inhalte</h2>
          <p className={legalProse}>
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität wird jedoch keine
            Gewähr übernommen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">Haftung für Links</h2>
          <p className={legalProse}>
            Diese Website enthält Links zu externen Websites Dritter. Auf deren
            Inhalte besteht kein Einfluss. Für die Inhalte der verlinkten Seiten
            ist stets der jeweilige Anbieter verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium">Urheberrecht</h2>
          <p className={legalProse}>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
            dieser Website unterliegen dem deutschen Urheberrecht.
          </p>
        </section>
      </div>
    </main>
  );
}
