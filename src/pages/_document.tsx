import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Recipekorea.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/pretendard.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <title>Medict</title>
      <body className="font-recipe bg-main-bg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
