"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const $portal = document.getElementById("portal");
    setNode($portal);

    const initOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = initOverflow;
    };
  }, []);

  if (!node) return null;

  return createPortal(
    <div
      role="button"
      className="fixed inset-0 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        onKeyUp={(e) => e.key === "Escape" && onClose()}
      >
        {children}
      </div>
    </div>,
    node
  );
}
