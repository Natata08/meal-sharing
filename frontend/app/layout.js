import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Meal-sharing app",
  description: "App for people who share their meal",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
