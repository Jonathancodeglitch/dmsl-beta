import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function AppDevelopment() {
  return (
    <section className="app-development container secondary-container">
      <div className="app-development-title">App development</div>
      <div className="row">
        <div className="app-development_content">
          <ul className="app-development_list">
            <li>Project Type</li>
            <li className="app-development_list-bold">Mobile App</li>
            <li>For Company</li>
            <li className="app-development_list-bold">Company Name</li>
            <li> Time Estimation</li>
            <li className="app-development_list-bold">4 Months</li>
          </ul>
          <p className="app-development_desc">
            From intuitive booking interfaces to real-time itinerary updates,
            our apps ensure travelers stay connected every step of the way.
          </p>
        </div>
        <div className="activities">
          <div className="total-download">
            <FontAwesomeIcon icon={faDownload} className="activiies_icon" />
            <div className="number">305k</div>
            <p>Total downloads After 6 months</p>
          </div>
          <div className="monthly-user">
            <FontAwesomeIcon icon={faUserGroup} className="activiies_icon" />
            <div className="activiies_icon"></div>
            <div className="number">85k</div>
            <p>Over 83k new Users monthly</p>
          </div>
        </div>
        <div className="graph">
          <div className="line-chart">
            <img
              src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745322/DMSL-BETA/line-chart_gavyjg.png"
              alt="line chart"
            />
            <p>Graph showing increase in Perfomance metrics</p>
          </div>
          <div className="pie-chart">
            <img
              src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745351/DMSL-BETA/pie-chart_jvkclk.png"
              alt="pie chart"
            />
            <p>Difference in audience size Over timeframe</p>
          </div>
        </div>
      </div>
    </section>
  );
}
