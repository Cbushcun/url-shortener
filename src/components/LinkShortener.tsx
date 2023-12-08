import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

import "./LinkShortener.scss";

const apiKey = "Sk4sG7QR2VIQpsIBJApfnr65BJwrJOoSIoXW2OksZTwutHpAi9t7vIivcQ1p";

// API doesnt work bc security whatevert
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
      {showComponent && (
        <div
          className={`link-result-container ${
            showComponent ? "swing-in-top-fwd" : ""
          }`}
        >
          <div className="input-group">
          <div className="form-control link-result text-center">
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

export default function LinkShortener() {
  const [inputValue, setInputValue] = useState("");
  const [shortLink, setShortLink] = useState("Shortened Link");
  const [showLinkResult, setShowLinkResult] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setShortLink(tiny_url);
      setLoading(false);
    } catch (err) {
      setShortLink("Invalid Link");
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setShortLink(inputValue);
    await fetchLink();
    setShowLinkResult(true);
  };

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle col-xxl-6 col-xl-6 col-lg-6 col-md-7 col-sm-10 col-10">
        <h1 className="tracking-in-expand text-center">Link Shortener</h1>
        <div className="input-group shadow slide-in-bottom">
          <input
            type="text"
            className="form-control"
            placeholder="Enter URL to Shorten..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="action-button input-group-text btn col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3"
          >
            Shorten
          </button>
        </div>
        <LinkResult showComponent={ showLinkResult } shortLink={ shortLink } loading={ loading }/>
      </div>
    </>
  );
}
