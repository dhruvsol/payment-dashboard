import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Sidebar } from "../components/Navigation/Sidebar";
import Layout from "../layouts/layout";
import MainLayout from "../layouts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default MyApp;
