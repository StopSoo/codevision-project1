import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Medict</title>
        <meta
          name="description"
          content="약국 및 도매상이 이용할 수 있는 약품 예측 플랫폼 Medict입니다."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
