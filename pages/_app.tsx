import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ClientWalletProvider from "../provider/WalletContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClientWalletProvider>
        {/* @ts-ignore */}
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ClientWalletProvider>
    </>
  );
}

export default MyApp;
