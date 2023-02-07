import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import ReduxProvider from "../provider/Redux";
import Nav from "../components/nav/Nav";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
