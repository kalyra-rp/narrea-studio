import { Container } from "@/components/ui/Container";
import { ServiceEditor } from "@/components/admin/ServiceEditor";
import { getServiceMainFields } from "@/lib/services-content";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getServiceMainFields();

  return (
    <Container className="py-12">
      <h1 className="font-serif text-3xl font-semibold text-prune">Services</h1>
      <p className="mt-2 max-w-2xl text-sm text-greige">
        Modifiez les champs principaux de chaque offre (titre, prix affiché,
        promesse). Les formules détaillées restent gérées dans le code.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {services.map((s) => (
          <ServiceEditor key={s.slug} service={s} />
        ))}
      </div>
    </Container>
  );
}
