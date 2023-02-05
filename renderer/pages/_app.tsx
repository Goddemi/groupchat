import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import ReduxProvider from "../provider/Redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
