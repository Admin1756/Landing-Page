import { useEffect, useMemo, useRef } from "react";
import { TESTIMONIALS } from "../data/site";

export default function Testimonials() {
  const marqueeRef = useRef(null);
  const tripled = useMemo(() => [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS], []);

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    let isPaused = false;
    const pause = () => (isPaused = true);
    const resume = () => (isPaused = false);
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    const singleSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft === 0) container.scrollLeft = singleSetWidth;

    let animId;
    const crawlSpeed = 0.75;
    const loop = () => {
      if (!isPaused) {
        container.scrollLeft += crawlSpeed;
        if (container.scrollLeft >= singleSetWidth * 2 || container.scrollLeft <= 0) {
          container.scrollLeft = singleSetWidth;
        }
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section id="testimonials" className="zz-testimonials">
      <div className="zz-testimonials-head">
        <span className="zz-eyebrow">Testimonials</span>
        <h2>Trusted by Clients in India & Abroad</h2>
      </div>
      <div ref={marqueeRef} className="zz-marquee">
        {tripled.map((item, idx) => (
          <div key={idx} className="zz-testimonial-card">
            <div className="zz-testimonial-head">
              <div className="zz-avatar">{item.initials}</div>
              <div>
                <div className="zz-testimonial-name">{item.name}</div>
                <div className="zz-testimonial-role">{item.role} • {item.city}</div>
              </div>
            </div>
            <p className="zz-testimonial-quote">{item.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
