import ImpressumClient from "./ImpressumClient";

export const metadata = {
  title: "Impressum",
  description: "Impressum / Legal information",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return <ImpressumClient />;
}
