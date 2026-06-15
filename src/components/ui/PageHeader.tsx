import { Container } from "@/components/ui/Container";

// En-tête éditorial réutilisé en haut de chaque page intérieure.
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b rule-gold bg-champagne/30">
      <Container className="py-16 text-center sm:py-20">
        {eyebrow ? (
          <p className="font-script text-2xl text-gold-dark">{eyebrow}</p>
        ) : null}
        <h1 className="mx-auto mt-2 max-w-3xl font-serif text-4xl font-semibold leading-tight text-prune sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-greige sm:text-lg">
            {intro}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
