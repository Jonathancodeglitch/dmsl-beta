export default function SuccessProject() {
  return (
    <section className="Success-project">
      <div className="container secondary-container">
        <h1 className="success-project_title">COMPLETED PROJECT</h1>
        <ul className="success-project_lists">
          <li>
            <span>Project type:</span>
            <span>End- to-end digital and media services.</span>
          </li>
          <li>
            <span>Client:</span>
            <span>YWIIT (Young Women In IT)</span>
          </li>
        </ul>
      </div>
      <TheChallenge />
      <TheResult />
    </section>
  );
}

function TheChallenge() {
  return (
    <div className="the-challenge-container">
      <div className="container secondary-container the-challenge">
        <div className="the-challenge_content">
          <h1 className="the-challenge_title">THE CHALLENGE</h1>
          <p>
            The challenge was to increase traffic to the organisation's website,
            as the turnout for their training events had been consistent low
            within their target audience.
          </p>
        </div>
        <div className="challenge-images">
          <div className="blur-image"></div>
          <img
            className="the-challenge-photo-one"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745363/DMSL-BETA/the-challenge-img_1_oaxuix.png"
            alt="the challenge photo"
          />
          <img
            className="the-challenge-photo-two"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745362/DMSL-BETA/the-challenge-img_2_jpb39p.png"
            alt="the challenge photo"
          />
          <img
            className="the-challenge-photo-three"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745364/DMSL-BETA/the-challenge-img_3_rf4zzc.png"
            alt="the challenge photo"
          />
        </div>
      </div>
    </div>
  );
}

function TheResult() {
  return (
    <div className="secondary-container container">
      <div className="the-result">
        <h1>THE RESULT</h1>
        <div className="the-result-stats">
          <div className="col">
            <div className="number">46.3 k</div>
            <div className="underline"></div>
            <p>
              Social Media Likes <br />
              After Campaign
            </p>
          </div>
          <div className="col">
            <div className="number">2 WEEKS</div>
            <div className="underline"></div>
            <p>
              Trending Topic on <br />
              Social Media
            </p>
          </div>
          <div className="col">
            <div className="number">467 k</div>
            <div className="underline"></div>
            <p>
              Share on Social
              <br />
              Media in 6weeks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
