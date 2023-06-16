import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prdict your image?",
  description: "Generated your predictions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
