import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

// page-specific styling import
import "./LinkShortener.scss";

const apiKey = import.meta.env.VITE_TINY_URL_API_KEY; // Replace with "YOUR_TINY_URL_API_KEY"

// Component for link result display and copy link button
export function LinkResult({
  showComponent,
  shortLink,
  loading
}: {
  showComponent: Boolean;
  shortLink: string;
  loading: Boolean;
}) {
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
}

// Link shortener display ( entry field, title, and button )
// Contains Axios post request for tinyURL api
export default function LinkShortener() {
  const [inputValue, setInputValue] = useState(""); // user link input
  const [shortLink, setShortLink] = useState(""); // generated short link
  const [showLinkResult, setShowLinkResult] = useState(false); // show LinkResult component
  const [loading, setLoading] = useState(false); // set loading while obtaining link

  const fetchLink = async () => {
    try {
      setLoading(true)
      // Axios post method to tinyURL for data on shortened link into 'result' variable
      // example data response:
      /*{
          "data": {
            "domain": "tinyurl.com",
            "alias": "example-alias",
            "deleted": false,
            "archived": false,
            "tags": [
              "tag1",
              "tag2"
            ],
            "analytics": [
              {
                "enabled": true,
                "public": false
              }
            ],
            "tiny_url": "https://tinyurl.com/example-alias",
            "created_at": "2022-11-24T19:41:23+00:00",
            "expires_at": null,
            "url": "http://google.com"
          },
          "code": 0,
          "errors": []
        } */
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
      // Obtaining the tiny_url from result variable
      const {data: { data: { tiny_url } } } = result;  
      setShortLink(tiny_url); // For dynamic loading in LinkResult component
      setLoading(false); // To stop loading animation and load the result in LinkResult component
    } catch (err) {
      setShortLink("Invalid Link");
      setLoading(false);
    }
  };

  // handleClick function for 'Shorten' button to obtain input value, process api request and show result
  const handleClick = async () => {
    setShortLink(inputValue);
    await fetchLink();
    setShowLinkResult(true);
  };

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
}
