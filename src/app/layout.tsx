import "@/app/ui/globals.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { inter } from '@/app/ui/fonts';
import { sora } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head className={`${sora.className}`}>
        <title>TicketOffice</title>
      </head>
      <body className={`${inter.className} antialiased}`}>
        <Header/>
        <main className="container mx-auto p- min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
