"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import loadingGif from "@/assets/loading.gif";

export default function LoadingSpinner() {
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Image
        src={loadingGif}
        alt="로딩 중"
        width={32}
        height={32}
        className="mx-auto mt-4"
      />
    </div>,
    node
  );
}
