import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "The World's Wall — An Art Project Made by the World, for the World",
  description: "Place your word on a globe made of 5 million words from people all over the planet. A word. A name. A love letter. Yours forever.",
  openGraph: {
    title: "The World's Wall",
    description: "Place your word on a globe made of 5 million words from people all over the planet.",
    url: "https://thewall.world",
    siteName: "The World's Wall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The World's Wall",
    description: "Place your word on a globe made of 5 million words from people all over the planet.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
