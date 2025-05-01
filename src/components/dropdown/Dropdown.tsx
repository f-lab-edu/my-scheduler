"use client";
import { ReactNode, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface MenuListProps {
  top: number;
  left: number;
  onClose: () => void;
  children?: ReactNode;
  isApply?: boolean;
}

export default function Dropdown({
  top,
  left,
  onClose,
  children,
  isApply = false,
}: MenuListProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const $portal = document.getElementById("portal");
    setNode($portal);
  }, []);

  if (!node) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
      onKeyUp={(event) => event.key === "Escape" && onClose()}
      tabIndex={-1}
    >
      <div
        className="absolute p-3 rounded-lg cursor-pointer shadow-md bg-white"
        style={{ left: left, top: top }}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onKeyUp={(event) => {
          if (!isApply) return event.key;
          return event.key;
        }}
      >
        {children}
      </div>
    </div>,
    node
  );
}
