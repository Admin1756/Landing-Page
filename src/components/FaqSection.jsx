import { useState } from "react";
import { FAQS } from "../data/content";

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="zz-faq">
      <h2>Questions people ask first</h2>
      <div className="zz-faq-list">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={"zz-faq-item" + (isOpen ? " open" : "")}>
              <h3>
                <button aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="zz-faq-icon">{isOpen ? "\u2212" : "+"}</span>
                </button>
              </h3>
              {isOpen && <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="zz-faq-a"><p>{f.a}</p></div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
