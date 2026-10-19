/* eslint-disable @next/next/no-img-element */
export default function Avatar({ name, image, size = 36 }: { name: string; image?: string | null; size?: number }) {
  const style = { width: size, height: size };
  if (image) {
    return <img src={image} alt={name} referrerPolicy="no-referrer" style={style} className="rounded-lg object-cover" />;
  }
  return (
    <span
      style={{ ...style, fontSize: size * 0.45 }}
      className="flex items-center justify-center rounded-lg bg-brand font-bold text-white"
      aria-hidden
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
