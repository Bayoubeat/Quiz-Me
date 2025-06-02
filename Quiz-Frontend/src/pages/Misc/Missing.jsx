import { Link } from "react-router-dom";
import { WEB_URLS } from "../../helper/constants";

export function Missing() {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to={WEB_URLS.LANDING}>Visit Our Home Page</Link>
      </div>
    </article>
  );
}
