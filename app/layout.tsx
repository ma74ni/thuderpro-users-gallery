import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Galería de Usuarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ModalProvider>
      <html  className="" lang="es">
        <body className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          
        </body>
      </html>
      </ModalProvider>
    </AuthProvider>
  );
}
