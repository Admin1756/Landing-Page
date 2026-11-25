import { useState } from "react";
import Modal from "./Modal";
import { VIDEOS, ytId } from "../data/videos";

export default function VideoModal({ videoKey, onClose }) {
  const cfg = VIDEOS[videoKey];
  const items = cfg ? cfg.items.filter((i) => ytId(i.url)) : [];
  const [active, setActive] = useState(0); // 0 = English (first item)

  if (!cfg || !items.length) return null;
  const id = ytId(items[active].url);

  return (
    <Modal title={cfg.title} onClose={onClose} labelId="zz-video-title">
      <div className="zz-video-body">
        <h3 id="zz-video-title">{cfg.title}</h3>
        <div className="zz-video-frame">
          <iframe
            key={id}
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={cfg.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="zz-video-langs">
          {items.map((it, i) => (
            <button
              key={it.lang}
              className={"chip" + (i === active ? " on" : "")}
              onClick={() => setActive(i)}
            >
              {it.lang}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
