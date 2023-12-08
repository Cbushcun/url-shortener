# Link Shortening Web Application using React + Vite + Axios + tinyURL API + Booststrap
##Dependencies
```
"dependencies": {
    "axios": "^1.6.2",
    "bootstrap": "^5.3.2",
    "react": "^18.2.0",
    "react-copy-to-clipboard": "^5.1.0",
    "react-dom": "^18.2.0",
    "sass": "^1.69.5",
    "vite-plugin-sass": "^0.1.0"
  },
### Developed the UI using a combination of bootstrap, personal stylings, and animations.
```
##App.tsx
Main app file structure for loading the react componenets developed for the app with LinkShortener(.tsx/scss) being the primary files for function in the application. 
```
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

```

