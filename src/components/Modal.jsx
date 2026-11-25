import { useEffect, useRef } from "react";

/** Accessible dialog: Escape closes, focus moves in, page scroll is locked. */
export default function Modal({ title, onClose, children, wide = false, labelId, className = "" }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") closeRef.current(); };
    document.addEventListener("keydown", onKey);
    ref.current && ref.current.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      prev && prev.focus && prev.focus();
    };
  }, []);

  return (
    <div className="zz-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={"zz-dialog" + (wide ? " wide" : "") + (className ? " " + className : "")} role="dialog" aria-modal="true" aria-labelledby={labelId} aria-label={labelId ? undefined : title} tabIndex={-1} ref={ref}>
        <button className="zz-dialog-close" onClick={onClose} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
}
