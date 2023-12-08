# Link Shortening Web Application using React + Vite + Axios + tinyURL API + Booststrap
## Dependencies
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
## Changing tinyurl api key
In ./src/components/LinkShortener.tsx you can change the apiKey variable to whatever you may need
### Link Shortener.tsx
```
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

// page-specific styling import
import "./LinkShortener.scss";

const apiKey = import.meta.env.VITE_TINY_URL_API_KEY; // Replace with "YOUR_TINY_URL_API_KEY"
```

## App structure
in App.tsx there are currently three(3) components I've developed for this personal project with two components (plus the imported CopyToClipboard component) making up the one 'LinkShortener' component
## Code
I've provided the main portions of code written for this project
### LinkShortener.tsx (LinkResult component)
```
return (
    <>
      {/* If show showComponent is true then load the link result component */}
      {showComponent && (
        <div
          className={`link-result-container ${
            showComponent ? "swing-in-top-fwd" : ""
          }`}
        >
          <div className="input-group">
          <div className="form-control link-result text-center">
            {/* 
            If loading is true then show custom dot loader
            Otherwise, load generated shortLink */}
            { loading ? (
                <div className="custom-loader"></div>          
            ) : (
                <a href={ shortLink } className="tiny-url" target="_blank">{ shortLink }</a>
            )}
            </div>
            <CopyToClipboard text={shortLink}>
              <button className="action-button copy-link">Copy Link</button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </>
  );
```
### LinkShortener.tsx (LinkShortener component)
```
return (
    <>
      {/* Container for title text, entry element, and 'Shorten' button*/}
      <div className="position-absolute top-50 start-50 translate-middle col-xxl-6 col-xl-6 col-lg-6 col-md-7 col-sm-10 col-10">
        {/* Title Text */}
        <h1 className="tracking-in-expand text-center">Link Shortener</h1>
        {/* Container for input field and 'Shorten' button */}
        <div className="input-group shadow slide-in-bottom">
          {/* Input field */}
          <input
            type="text"
            className="form-control"
            placeholder="Enter URL to Shorten..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* 'Shorten' button */}
          <button
            onClick={handleClick}
            className="action-button input-group-text btn col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3"
          >
            Shorten
          </button>
        </div>
        {/* Dynamic LinkResult component (initially hidden) */}
        <LinkResult showComponent={ showLinkResult } shortLink={ shortLink } loading={ loading }/>
      </div>
    </>
  );
```
### Within the LinkShortener component, the handling for the short link generation is included, here is that code along with the functions
#### handleClick for obtaining input, fetching shortlink, and showing result 
```
const handleClick = async () => {
    setShortLink(inputValue);
    await fetchLink();
    setShowLinkResult(true);
  };
```
#### fetchLink for obtaining the link from the tinyURL api with axios
```
  const fetchLink = async () => {
    try {
      setLoading(true)
      const result: any = await axios({
        method: "post",
        url: "https://api.tinyurl.com/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        data: {
          url: inputValue,
        },
      });
      const {data: { data: { tiny_url } } } = result;  
      setShortLink(tiny_url); // For dynamic loading in LinkResult component
      setLoading(false); // To stop loading animation and load the result in LinkResult component
    } catch (err) {
      setShortLink("Invalid Link");
      setLoading(false);
    }
```
