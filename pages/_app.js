import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Events App</title>
        <meta
          name="description"
          content="This is an event app! Browse your event!"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
