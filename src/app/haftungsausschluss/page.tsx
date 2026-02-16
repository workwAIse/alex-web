import HaftungsausschlussClient from "./HaftungsausschlussClient";

export const metadata = {
  title: "Haftungsausschluss",
  description: "Haftungsausschluss / Disclaimer",
  robots: { index: false, follow: false },
};

export default function HaftungsausschlussPage() {
  return <HaftungsausschlussClient />;
}
