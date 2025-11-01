import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Medict</title>
        <meta
          name="description"
          content="약국 및 도매상이 이용할 수 있는 약품 예측 플랫폼 Medict입니다."
        />
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
      <body className="font-recipe bg-main-bg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
