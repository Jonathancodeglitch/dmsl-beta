export default function Plan() {
  return (
    <section className="plan">
      <div className="container row">
        <div className="plan-content">
          <h4>CHOOSE YOUR PLAN</h4>
          <h1>Packages priced to suit your business</h1>
          <ul className="plan-year">
            <li>2022</li>
            <li className="">2023</li>
            <li className="active">2024</li>
          </ul>
          <p>
            Our goal is to help you maximize value for you by starting from your
            challenges all the way to your goals.
          </p>
        </div>
        <div className="plan-cards">
          <div className="card">
            <div className="card-title">Starter Package</div>
            <div className="card-desc">Best for new/small businesses </div>
            <div className="plan-amount">
              £500
              <br />
              <span>Monthly</span>
            </div>
            <div className="feature-list-label">Services Included:</div>
            <ul className="feature-list">
              <li className="feature-list-title">Social Media Management:</li>
              <li>
                10 posts per month across 2 platforms (Facebook and
                LinkedIn/Instagram)
              </li>
              <li> Basic engagement (replying to comments and messages)</li>
              <li> Sponsored ads (At your discretion)</li>
            </ul>

            <ul className="feature-list">
              <li className="feature-list-title">Longform Content Creation:</li>
              <li>2 blog posts per month (500 words each)</li>
            </ul>

            <ul className="feature-list">
              <li className="feature-list-title">Email Marketing:</li>
              <li>1 email/Newsletter campaign per month</li>
            </ul>

            <ul className="feature-list">
              <li className="feature-list-title">
                Search Engine Optimisation (SEO):
              </li>
              <li>Basic web page and social media page SEO</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Monthly Reporting:</li>
              <li>Basic performance report across all platforms.</li>
            </ul>
            {/*  */}
            <button className="btn">SELECT PACKAGE</button>
          </div>
          <div className="card">
            <div className="card-title">Standard Package</div>
            <div className="card-desc">
              Best for established/stable businesses
            </div>
            <div className="plan-amount">
              £1000 <br />
              <span>Monthly</span>
            </div>
            <div className="feature-list-label">Services Included:</div>
            <ul className="feature-list">
              <li className="feature-list-title">Social Media Management:</li>
              <li>
                20 posts per month across 3 platforms - with Content Calendar
                Built
              </li>
              <li> Enhanced engagement and community management</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Content Creation:</li>
              <li>4 blog posts per month (700 words each)</li>
              <li>2 infographics or custom graphics per month</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Email Marketing:</li>
              <li>2 email campaigns per month</li>
              <li>A/B testing and segmentation</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">SEO:</li>
              <li>Advanced on-page SEO for up to 10 pages</li>
              <li>5 keyword tracking and optimization</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">
                Pay-Per-Click (PPC) Advertising:
              </li>
              <li>Monthly budget management (up to £500 ad spend)</li>
              <li>Campaign setup and monitoring</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Monthly Reporting:</li>
              <li>
                Detailed performance report with insights and recommendations
              </li>
            </ul>
            <button className="btn">SELECT PACKAGE</button>
          </div>
          <div className="card">
            <div className="card-title">Premium Package</div>
            <div className="card-desc">Best for SME’s</div>
            <div className="plan-amount">
              £2,000 <br />
              <span>Monthly</span>
            </div>
            <div className="feature-list-label">Services Included:</div>
            <ul className="feature-list">
              <li className="feature-list-title">Social Media Management: </li>
              <li>30 posts per month across 4 platforms</li>
              <li>
                Advanced engagement, community management, and growth strategies
              </li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Content Creation:</li>
              <li>6 blog posts per month (1,000 words each)</li>
              <li>4 infographics or custom graphics per month</li>
              <li>2 videos per month (short-form)</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Email Marketing:</li>
              <li>4 email campaigns per month</li>
              <li>Comprehensive A/B testing, segmentation, and automation</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">SEO:</li>
              <li> Comprehensive on-page SEO for up to 20 pages</li>
              <li>10 keyword tracking and optimization</li>
              <li>Link building and outreach</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">
                Pay-Per-Click (PPC) Advertising:
              </li>
              <li>Monthly budget management (up to £1,000 ad spend)</li>
              <li>Campaign setup, monitoring, and optimization</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Website Management:</li>
              <li>Monthly updates and maintenance</li>
              <li>Performance optimization</li>
            </ul>
            <ul className="feature-list">
              <li className="feature-list-title">Monthly Reporting:</li>
              <li>
                In-depth performance report with actionable insights and
                quarterly strategy meetings
              </li>
            </ul>
            <button className="btn">SELECT PACKAGE</button>
          </div>
        </div>
      </div>
    </section>
  );
}
