import "./App.scss";

import Navbar from "./components/Navbar";
import LinkShortener from "./components/LinkShortener";
import BackgroundAnimation from "./components/BackgroundAnimation";

function App() {

  return (
    <>
      <BackgroundAnimation />
      <Navbar /> 
      <LinkShortener />
    </>
  );
}

export default App;
