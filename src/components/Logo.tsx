import Image from "next/image";

/** Le logo, en version claire ou sombre selon le thème (voir globals.css). */
export function Logo({ className = "", alt = "Au bout du monde" }: { className?: string; alt?: string }) {
  return (
    <>
      <Image
        src="/images/marque/logo-blanc.webp"
        alt={alt}
        width={211}
        height={180}
        priority
        className={`logo-sur-sombre ${className}`}
      />
      <Image
        src="/images/marque/logo.png"
        alt={alt}
        width={748}
        height={320}
        priority
        className={`logo-sur-clair ${className}`}
      />
    </>
  );
}
