import lightBulb from "../img/lightbulb.svg";
import caution from "../img/report-problem.svg";
import voiceChat from "../img/voice-chat.svg";

export default function AstonishingResult() {
  return (
    <section className="astonishing-result">
      <div className="container">
        <h1 className="astonishing-result_title">
          Unlock Astonishing Results in just 3 Simple Steps!
        </h1>
        <div className="row">
          <div className="result">
            <div className="icons">
              <img src={voiceChat} alt="icon" />
            </div>
            <div className="result-header">Free Consultation</div>
            <p>
              Let’s discuss your goals, challenges, and how we can turn your
              vision into reality.
            </p>
          </div>
          <div className="result">
            <div className="icons">
              <img src={caution} alt="icon" />
            </div>
            <div className="result-header">Identify the problem</div>
            <p>
              Let’s diagnose and tackle the problem head-on, ensuring your path
              to success is clear.
            </p>
          </div>
          <div className="result">
            <div className="icons">
              <img src={lightBulb} alt="icon" />
            </div>
            <div className="result-header">Apply effective solution</div>
            <p>
              Let’s implement strategies that drive growth, efficiency, and
              success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
