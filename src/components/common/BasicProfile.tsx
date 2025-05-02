"use client";
interface Props {
  userId: string;
}

export default function BasicProfile({ userId }: Props) {
  const initial = userId.slice(0, 1).toUpperCase();

  return (
    <div className="w-6 h-6 mr-1 text-center rounded-full bg-profiles-green">
      <p>{initial}</p>
    </div>
  );
}
