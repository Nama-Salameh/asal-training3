import type { AppProps } from "next/app";
import GlobalProvider from "../store";

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
export default App;
