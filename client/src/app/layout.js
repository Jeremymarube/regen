import { Rasa } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const rasa = Rasa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rasa",
});

export const metadata = {
  title: "ReGen Dashboard",
  description: "Mock sidebar test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       className={`${rasa.variable} font-[var(--font-rasa)] antialiased bg-gray-50`}

      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
