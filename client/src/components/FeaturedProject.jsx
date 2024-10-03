import { Link } from "react-router-dom";

export default function Projects({ home = true }) {
  let projects = [
    {
      id: 1,
      linkTo: "jaye-food",
      category: "BRANDING",
      projectName: "Jaye Foods",
      img: "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745326/DMSL-BETA/jaye-img_vzgxvv.png",
      client: "Jaye Foods",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
    },
    {
      id: 2,
      linkTo: "book-yard-podcast",
      category: "DIGITAL MARKETING",
      projectName: "Book Yard Podcast",
      img: "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745305/DMSL-BETA/bookyard-img_fli0d8.png",
      client: "Book Yard Podcast",
      location: "United Kingdom",
      Date: "12–May-23",
      Budget: "$5,000",
    },
    {
      id: 3,
      linkTo: "townsend-rail",
      category: "DIGITAL STRATEGY",
      projectName: "Townsend Rail",
      img: "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745366/DMSL-BETA/townsend-img_qbhxjs.png",
      client: "Townsend Rail",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
    },
    {
      id: 4,
      linkTo: "ywiit",
      category: "DIGITAL MARKETING",
      projectName: "Young Women In IT",
      img: "https://res.cloudinary.com/dv6uz0bks/image/upload/c_crop,w_531,h_380/v1719751822/DMSL-BETA/ywiit-img_axvipz.png",
      client: "Young Women In IT",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
    },
    {
      id: 5,
      linkTo: "shea-origin",
      category: "DIGITAL MARKETING",
      projectName: "Shea Origin",
      img: "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719751822/DMSL-BETA/shea-origin-img_yhsjqi.png",
      client: "Shea Origin",
      location: "Nigeria",
      Date: "03-jun-23",
      Budget: "$12,000",
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
          {projects.map((project) => {
            return (
              <Link to={`/${project.linkTo}`} className="card" key={project.id}>
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
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
