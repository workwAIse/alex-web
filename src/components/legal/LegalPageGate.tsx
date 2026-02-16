"use client";

type LegalPageGateProps = {
  title: string;
  onReveal: () => void;
};

/**
 * Gate shown before revealing legal page content. Keeps sensitive info (e.g. address)
 * out of initial HTML; only users who click see it. Funny “human not AI” message.
 */
export default function LegalPageGate({ title, onReveal }: LegalPageGateProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-muted-foreground md:text-3xl">
          {title}
        </h1>
        <p className="mb-2 text-foreground/90">
          We need to make sure you’re human, not AI.
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          (So this page doesn’t end up in every training set.)
        </p>
        <button
          type="button"
          onClick={onReveal}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          I’m human
        </button>
      </div>
    </main>
  );
}
