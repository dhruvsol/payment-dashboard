import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Sidebar } from "../components/Navigation/Sidebar";
import Layout from "../layouts/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;