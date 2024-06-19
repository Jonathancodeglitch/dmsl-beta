import jayeImage from "../img/jaye-img.png";
import bookYard from "../img/bookyard-img.png";
import townSend from "../img/townsend-img.png";


export default function Projects({ home = true }) {
  let projects = [
    {
      id: 1,
      category: "BRANDING",
      projectName: "Jaye Foods",
      img: jayeImage,
      client: "Ajaye Crowther",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
    },
    {
      id: 2,
      category: "DIGITAL MARKETING",
      projectName: "Book Yard Podcast",
      img: bookYard,
      client: "AT Sonola",
      location: "United Kingdom",
      Date: "12–May-23",
      Budget: "$5,000",
    },
    {
      id: 3,
      category: "DIGITAL STRATEGY",
      projectName: "Townsend Rail",
      img: townSend,
      client: "Ajaye Crowther",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
    },
    {
      id: 4,
      category: "DIGITAL MARKETING",
      projectName: "Young Women In IT",
      img: jayeImage,
      client: "Ajaye Crowther",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
    },
    {
      id: 5,
      category: "DIGITAL MARKETING",
      projectName: "Shea Origin",
      img: jayeImage,
      client: "AT Sonola",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
    },
    {
      id: 6,
      category: "DIGITAL CONSULTANCY",
      projectName: "Olby",
      img: jayeImage,
      client: "Ajaye Crowther",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$3,000",
    },
  ];

  if (home == true) {
    projects = projects.slice(0, 3);
  }

  return (
    <section
      className={!home ? "featured-project projects" : "featured-project"}
    >
      <div className="container">
        <h1 className="featured-project_title">Other Featured Projects</h1>
        <div className="feature-project_cards">
          {projects.map((project, index) => {
            return (
              <div className="card" key={project.id}>
                <div className="category">{project.category}</div>
                <div className="company-name">{project.projectName}</div>
                <img
                  className="product-image"
                  src={project.img}
                  alt="product image"
                />
                <div className="row">
                  <p>
                    Client
                    <span>{project.client}</span>
                  </p>
                  <p>
                    Date
                    <span>{project.Date}</span>
                  </p>
                </div>
                <div className="row">
                  <p>
                    Location
                    <span>{project.location}</span>
                  </p>
                  <p>
                    Budget
                    <span>{project.Budget}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
