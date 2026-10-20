import { FOUNDER_TAGLINE, YOUTUBE_VIDEO_ID } from "../config";
import saif from "../assets/saif.png";

export default function Founder() {
  return (
    <section id="about" className="zz-founder-section">
      <div className="zz-founder-grid">
        <div className="zz-founder-copy">
          <img className="zz-founder-photo" src={saif} alt="Saif Ahmed, founder of Zamzam Capital" loading="lazy" />
          <h2>Built by someone who has experienced both sides</h2>
          <p className="zz-founder-name2">Saif Ahmed, Founder - Zamzam Capital</p>
          <p>
            Economics and Mathematics degrees from Bates College, USA; a year at the London School of Economics, then J.P. Morgan and Merrill Lynch. Eight years in Kuwait in Islamic leasing, real estate and private equity, working closely with Shariah boards. Back in India since 2011, he built Zayd Chit Funds, India's 1st interest-free chit fund company that disbursed over Rs. 60 Cr in prize money, served as Head of Risk Management for Rehbar Financial Services and then founded Zamzam Capital that is now India's top Shariah-compliant Research Analyst firm.
          </p>
          <div className="zz-founder-cta-wrap">
            <a 
              href="https://www.linkedin.com/in/saif-zamzam-capital/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="zz-linkedin-btn"
            >
              <svg className="zz-linkedin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="zz-founder-video-col">
          <div className="zz-founder-video">
            <div className="zz-video-frame">
              <iframe src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} title="Saif Ahmed on Zamzam Capital" loading="lazy" allowFullScreen />
            </div>
          </div>
          <blockquote>
            "Indian Muslims are not held back from investing by a lack of faith or ambition. They are held back by confusion and by a shortage of trustworthy tools."  
          </blockquote>
          <p className="zz-founder-tag">{FOUNDER_TAGLINE}</p>
        </div>
      </div>
    </section>
  );
}