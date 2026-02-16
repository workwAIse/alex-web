import DatenschutzClient from "./DatenschutzClient";

export const metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung / Privacy policy",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return <DatenschutzClient />;
}
