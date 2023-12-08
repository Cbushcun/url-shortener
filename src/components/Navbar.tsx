import "./Navbar.scss"

export default function Navbar() {
  return (
    <>
      <nav 
        className="fixed-top navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
        >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            URL-Link Shortener
          </a>
        </div>
      </nav>
    </>
  );
}
