"use client";
import clsx from "clsx";
interface Props {
  userId: string;
}

const BG_COLORS = [
  "bg-profiles-green",
  "bg-profiles-orange",
  "bg-profiles-pink",
  "bg-profiles-gray",
];

export default function BasicProfile({ userId }: Props) {
  const initial = userId.slice(0, 1).toUpperCase();

  // const randomColors = () => {
  const colorIndex = Math.floor(Math.random() * BG_COLORS.length);
  //   return BG_COLORS[colorIndex];
  // };

  return (
    <div
      className={clsx(
        BG_COLORS[colorIndex],
        "w-6 h-6 mr-1 text-center rounded-full"
      )}
    >
      <p>{initial}</p>
    </div>
  );
}
