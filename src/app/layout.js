import "./globals.css";
import { Michroma } from 'next/font/google';
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { Toaster } from 'react-hot-toast';

const michroma = Michroma({subsets:['latin'], weight:'400', variable: '--font-michroma'});

export const metadata = {
  title: "EMFIntel",
  description: "Assess your Safety",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={michroma.variable}>
        <header><Navigation /></header>
        <Toaster />
        {children}
        <footer><Footer /></footer>
      </body>
    </html>
  );
}
