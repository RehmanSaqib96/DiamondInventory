import Layout from '../components/Layout';
import Head from 'next/head';

export default function DiamondInfo() {
    return (
        <Layout>
            <Head>
                <title>Diamond Knowledge | DiamondStore</title>
                <meta
                    name="description"
                    content="Discover expert information on diamond carats, cuts, weight, clarity, and the key differences that help you choose the perfect diamond."
                />
            </Head>
            <div className="diamond-info-page">
                <h1>Diamond Knowledge</h1>

                <section className="section introduction">
                    <h2>Introduction to Diamonds</h2>
                    <p>
                        Discover the key factors that determine your diamond’s value and sparkle.
                        From carat weight and cut to clarity and color, understanding these details will help you make an informed decision
                        about your purchase.
                    </p>
                </section>

                <section className="section carat-weight">
                    <h2>Carat Weight & Best Weight Considerations</h2>
                    <p>
                        Carat weight is one of the most important factors in a diamond’s appearance and value. Generally, diamonds in the 0.50 to
                        1.50 carat range offer an ideal balance between size and price.
                    </p>
                    <ul>
                        <li>
                            <strong>0.50 – 0.99 Carat:</strong> Great for everyday elegance.
                        </li>
                        <li>
                            <strong>1.00 – 1.49 Carat:</strong> The sweet spot for optimal appearance and value.
                        </li>
                        <li>
                            <strong>1.50+ Carat:</strong> Larger diamonds that make a bold statement—but they come at a significantly higher price.
                        </li>
                    </ul>
                </section>

                <section className="section cut-info">
                    <h2>Cut Quality & What Makes a Diamond Shine</h2>
                    <p>
                        The cut of a diamond affects its ability to reflect light, which determines its brilliance. An excellent or ideal cut
                        can enhance even a modestly sized diamond into a spectacular display of sparkle.
                    </p>
                    <ul>
                        <li>
                            <strong>Brilliant Cut:</strong> Offers maximum sparkle and is the most popular choice.
                        </li>
                        <li>
                            <strong>Princess Cut:</strong> A modern design with sharp lines and excellent fire.
                        </li>
                        <li>
                            <strong>Emerald Cut:</strong> Emphasizes clarity and a sophisticated, elegant appearance.
                        </li>
                    </ul>
                </section>

                <section className="section differences">
                    <h2>Key Differences & Considerations</h2>
                    <p>
                        Understanding the differences between diamond characteristics will help you get the best value:
                    </p>
                    <ul>
                        <li>
                            <strong>Cut vs. Polish:</strong> The cut defines the geometry of the diamond, while polish refers to the finish on
                            each facet.
                        </li>
                        <li>
                            <strong>Carat vs. Size:</strong> Carat weight measures mass, but size (dimensions) and the cut also affect how large
                            a diamond appears.
                        </li>
                        <li>
                            <strong>Clarity & Color:</strong> These factors influence a diamond’s beauty and are equally important in determining its overall appeal.
                        </li>
                    </ul>
                </section>

                <section className="section additional-info">
                    <h2>Other Important Factors</h2>
                    <p>
                        Beyond the basics, consider how certification, fluorescence, and the diamond’s overall proportions contribute to its final appearance and long‑term value.
                    </p>
                    <p>
                        At DiamondStore, we ensure that all listed diamonds are certified by reputable institutions, so you can shop confidently.
                    </p>
                </section>
            </div>

            <style jsx>{`
        .diamond-info-page {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Open Sans', sans-serif;
          color: #444;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
          font-family: 'EB Garamond', serif;
          font-size: 42px;
          color: #333;
        }
        .section {
          margin-bottom: 40px;
        }
        .section h2 {
          font-family: 'EB Garamond', serif;
          font-size: 28px;
          color: #a67c52;
          margin-bottom: 15px;
        }
        .section p,
        .section ul {
          font-size: 18px;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        ul {
          list-style: disc;
          margin-left: 20px;
        }
        li {
          margin-bottom: 10px;
        }
      `}</style>
        </Layout>
    );
}
