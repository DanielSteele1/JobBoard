import { Link } from "react-router-dom";

function NotFound() {


  return (

    <section className="notFound-container">

      <div className="notFound">

        <img src="public/404.svg" height="300" width="500" />

        <div className="error-message">
          Error 404: Content Not found!
        </div>

        <div>
          Go back to the <Link to="/" id="highlight">Dashboard</Link>
        </div>

      </div>

    </section>
  )
}

export default NotFound;