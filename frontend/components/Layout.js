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
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .page-content {
          min-height: 80vh;
        }
      `}</style>
        </div>
    );
}
