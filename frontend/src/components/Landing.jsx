import "./landing.css";
import logo from "../assets/logo.png";

function Landing({ onStart }) {
  return (
    <div className="landing-container">

      <div className="logo-wrapper">
        <div className="ai-orb"></div>
      </div>

      <h4  className="landing-title">
        How can <br /> Convobot <br /> help you today?
      </h4>

      <button className="start-btn" onClick={onStart}>
       <img src="/bot.png" alt="bot" className="bot-icon" />
        Get Started
      </button>

    </div>
  );
}

export default Landing;