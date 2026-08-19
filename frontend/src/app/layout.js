import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./components/theme/ThemeProvider";

export const metadata = {
  title: "Student Task Management System",
  description: "Manage your daily tasks efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}