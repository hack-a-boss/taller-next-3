import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <hr />
        <p>Contenidos gestionados con ButterCMS</p>
      </footer>
    </>
  );
}

export default MyApp;
