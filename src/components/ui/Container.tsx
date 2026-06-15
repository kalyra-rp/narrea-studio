import type { ReactNode } from "react";

// Conteneur centré à largeur maîtrisée — beaucoup d'air, comme le veut la DA.
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
