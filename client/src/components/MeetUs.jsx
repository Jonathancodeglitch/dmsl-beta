import meetUsImg from "../img/our-team-img.jpg";

export default function MeetUs() {
  return (
    <section className="meet-us container">
      <div className="meet-us__card">
        <div className="meet-us__content">
          <h1 className="meet-us__title">Our Team</h1>
          <p className="meet-us__desc">
            Our team combines a wide range of expertise to tackle your unique
            business challenges. Whether you're looking to elevate your social
            media presence, craft compelling website content, or boost sales
            through targeted digital marketing, we’ve got the right talent for
            the job. From skilled copywriters and web designers to social media
            managers, video editors, and content strategists, we collaborate
            seamlessly to deliver results. Plus, with a dedicated account
            manager, you'll have one point of contact managing everything to
            ensure your campaign drives success.
          </p>
        </div>
        <img className="meet-us__img" src={meetUsImg} alt="our team image" />
      </div>
    </section>
  );
}
