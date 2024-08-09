export default function ContactUs() {
  return (
    <section className="contact-us">
      <div className="container row">
        <div className="contact-us_content">
          <h2>LET’S TALK</h2>
          <h1>Write For Us Here</h1>
          <p>Feel free to reach out with whatever question you might have.</p>
        </div>
        <form>
          <div className="text-inputs">
            <input type="email" placeholder="Your email address" />
            <input type="text" placeholder="Subject" />
          </div>
          <textarea placeholder="Write message here"></textarea>
          <div className="btn">SEND NOW</div>
        </form>
      </div>
    </section>
  );
}
