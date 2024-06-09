import "./globals.css";
import { Navbar } from "../components/shares/Nav";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Trackee",
  description: "A powerful inventory management tool that streamlines product tracking with QR codes and real-time data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
          <AuthProvider>
            <main className='relative overflow-hidden bg_dashboard flex-1'>
              {children}
            </main>
            <Navbar />
            <ToastContainer />
          </AuthProvider>
      </body>
    </html>
  );
}
