import { wrapper } from '@/features/store';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    // setLoading(true);
    const mainScript = document.createElement("script");
    const sliderScript = document.createElement("script");
    mainScript.src = "assets/js/script.js";
    sliderScript.src = "assets/js/main-slider-script.js";
    setTimeout(() => {
      document.body.appendChild(mainScript);
      document.body.appendChild(sliderScript);
    }, 1000);
    // setLoading(false);
  }, []);

  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);
