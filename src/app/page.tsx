import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <section className="py-28 sm:py-36">
      <Container className="max-w-3xl text-center">
        <p className="font-script text-2xl text-gold">Bientôt en ligne</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-prune sm:text-6xl">
          Narrea Studio
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-greige">
          {site.baseline}
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
          >
            Travaillons ensemble
          </Link>
        </div>
      </Container>
    </section>
  );
}
