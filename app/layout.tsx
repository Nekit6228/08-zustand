import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Metadata } from 'next';


export const  metadata :Metadata ={
  title:'Notes',
  description:'Main Notes Page and Creating New Notes',
  icons:'/notehub-og-meta.webp',
  openGraph:{
    title:'Notes',
    description:'Main Notes Page and Creating New Notes',
    url:'https://08-zustand-black.vercel.app/',
    siteName:'Notes',
    images:[{
      url:'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width:1200,
      height:630,
      alt:'Main Notes'
    }]
  }
}


export default function RootLayout({
  children,
  modal, 
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal} 
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}