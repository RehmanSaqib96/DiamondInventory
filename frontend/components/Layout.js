// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <style jsx global>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #fff;
          color: #333;
        }
        main {
          padding: 20px;
        }
      `}</style>
        </>
    );
}
