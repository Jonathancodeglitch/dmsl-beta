export default function Plan() {
  return (
    <section className="plan">
      <div className="container row">
        <div className="plan-content">
          <h4>CHOOSE YOUR PLAN</h4>
          <h1>Plans Priced To Suit You</h1>
          <ul className="plan-year">
            <li>2022</li>
            <li className="">2023</li>
            <li className="active">2024</li>
          </ul>
          <p>
            Our goal is to create talk-worthy and head-turning campaigns with
            outstanding results.
          </p>
        </div>
        <div className="plan-cards">
          <div className="card">
            <div className="card-title">FREE</div>
            <div className="card-desc">Give us a try for free</div>
            <div className="plan-amount">$0</div>
            <div className="feature-list-title">Free features:</div>
            <ul className="feature-list">
              <li>- Consultation</li>
              <li>- Evaluation</li>
            </ul>
            <div className="btn">START NOW</div>
          </div>
          <div className="card">
            <div className="card-title">STARTER</div>
            <div className="card-desc">Best for individuals</div>
            <div className="plan-amount">$500</div>
            <div className="feature-list-title">All features:</div>
            <ul className="feature-list">
              <li>- Consultation</li>
              <li>- Evaluation</li>
              <li>- Problem solving</li>
              <li>- Management</li>
            </ul>
            <div className="btn">START NOW</div>
          </div>
          <div className="card">
            <div className="card-title">TEAM</div>
            <div className="card-desc">Best for SME’s</div>
            <div className="plan-amount">$2000</div>
            <div className="feature-list-title">All features:</div>
            <ul className="feature-list">
              <li>- Consultation</li>
              <li>- Evaluation</li>
              <li>- Problem solving</li>
              <li>- Management</li>
            </ul>
            <div className="btn">START NOW</div>
          </div>
        </div>
      </div>
    </section>
  );
}
