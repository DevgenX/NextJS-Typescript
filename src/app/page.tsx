import Image from "next/image";
import Paragraph from "../components/ui/Paragraph";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello world
    </main>
  );
}
