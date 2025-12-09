import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import StyledComponentsRegistry from '@/styles/registry';
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle AI",
  description: "Daily AI-generated Wordle game with wallet integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>
            <Navbar />
            {children}
            <Toaster
              position="bottom-right"
              theme="dark"
              richColors
              toastOptions={{
                style: {
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#fff',
                },
              }}
            />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

