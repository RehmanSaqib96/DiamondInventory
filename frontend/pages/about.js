// pages/about.js
import Layout from '../components/Layout';

export default function About() {
    return (
        <Layout>
            <h1>About Us</h1>
            <section className="about-section">
                <p>We are a trusted diamond inventory system dedicated to providing the best experience for buyers and sellers.</p>
                <p>Our mission is to ensure transparency, security, and excellence in every transaction.</p>
                <p>With a team of experienced professionals, we continuously work towards innovation and customer satisfaction.</p>
            </section>
            <style jsx>{`
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .about-section {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          line-height: 1.6;
          text-align: center;
        }
      `}</style>
        </Layout>
    );
}
