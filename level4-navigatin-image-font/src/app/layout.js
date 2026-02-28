import { Inter } from "next/font/google";
import "./globals.css";


const poppins = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        {children}
      </body>
    </html>
  );         
}           
           

