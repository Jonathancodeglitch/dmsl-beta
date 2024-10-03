import meetUsImg from "../img/our-team-img.jpg";

export default function MeetUs() {
  return (
    <section className="meet-us container">
      <div className="meet-us__card">
        <div className="meet-us__content">
          <h1 className="meet-us__title">Our Team</h1>
          <p className="meet-us__desc">
            Our team brings diverse expertise to solve your business challenges.
            Whether you need to enhance your social media, create engaging
            website content, or boost sales with targeted digital marketing, we
            have the right talent. From copywriters and designers to social
            media managers and video editors, we work together to deliver
            results. With a dedicated account manager, you'll have a single
            point of contact to ensure your campaign's success.
          </p>
        </div>
        <img className="meet-us__img" src={meetUsImg} alt="our team image" />
      </div>
    </section>
  );
}
