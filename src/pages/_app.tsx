import type { AppProps } from 'next/app';

import '../App.css';

const Md2Scrap = ({ Component, pageProps }: AppProps) => {
  return <Component
    {...pageProps}
  />;
};

export default Md2Scrap;
