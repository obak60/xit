import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import MobileNav from "@/components/layout/mobile-nav";
import { metadataConfig } from "@/config/metadataConfig";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/Provider/cart-provider";

export const metadata = metadataConfig.mainLayout;


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`antialiased bg-light dark:bg-dark text-dark dark:text-light pb-10 md:pb-0 text-sm md:text-base`}>
        <CartProvider>
          <Navbar />
          <div className="min-h-screen pt-24 md:pt-28">
            {children}
          </div>
          <Footer />
          <MobileNav />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
