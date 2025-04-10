// components/Layout.js
import NewNavbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="layout-container">
            <NewNavbar />
            <main className="page-content">{children}</main>
            <Footer />
            <style jsx>{`
        .layout-container {
          /* This ensures the entire page is centered horizontally */
          max-width: 1350px;
          margin: 0 auto; 
          /* Optional padding if you want side space */
          padding: 0 20px;
          /* If your background is white, you can omit a background here */
        }
        .page-content {
          /* add any global page styling */
          min-height: 80vh; /* for example */
        }
      `}</style>
        </div>
    );
}
