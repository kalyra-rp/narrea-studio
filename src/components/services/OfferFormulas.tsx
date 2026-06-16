import type { OfferFormulas as Formulas } from "@/lib/site";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="text-gold-dark" aria-label="Inclus">
        ✓
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-greige/40" aria-label="Non inclus">
        —
      </span>
    );
  }
  return <span className="text-ink/80">{value}</span>;
}

export function OfferFormulas({ formulas }: { formulas: Formulas }) {
  // Formule unique (ex. Audit Clarté).
  if (formulas.kind === "single") {
    return (
      <div className="rounded-3xl border rule-gold bg-champagne/30 p-8 sm:p-10">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-3xl font-semibold text-prune">
            {formulas.price}
          </span>
          {formulas.priceNote ? (
            <span className="text-sm text-greige">{formulas.priceNote}</span>
          ) : null}
        </div>

        <p className="mt-6 text-sm font-semibold text-prune">Ce qui est inclus</p>
        <ul className="mt-3 flex flex-col gap-3">
          {formulas.includes.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-ink/80">
              <span aria-hidden="true" className="mt-0.5 text-gold-dark">
                ✦
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        {formulas.option ? (
          <p className="mt-6 rounded-xl border border-gold/30 bg-ivory px-4 py-3 text-sm text-ink/80">
            <span className="font-medium text-prune">Option : </span>
            {formulas.option}
          </p>
        ) : null}
      </div>
    );
  }

  // Comparatif de formules.
  const { tiers, rows, note } = formulas;
  return (
    <div>
      <div className="overflow-x-auto rounded-3xl border rule-gold">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-champagne/40">
              <th className="px-5 py-4" />
              {tiers.map((tier) => (
                <th
                  key={tier.name}
                  className={`px-5 py-4 text-center align-bottom ${
                    tier.featured ? "bg-gold/15" : ""
                  }`}
                >
                  <span className="block font-serif text-base font-semibold text-prune">
                    {tier.name}
                    {tier.featured ? (
                      <span aria-label="Recommandé" className="ml-1 text-gold-dark">
                        ★
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-greige">
                    {tier.price}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-prune/10">
            {rows.map((row) => (
              <tr key={row.label} className="bg-ivory">
                <th
                  scope="row"
                  className="px-5 py-3 text-left font-normal text-ink/80"
                >
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={`px-5 py-3 text-center ${
                      tiers[i]?.featured ? "bg-gold/[0.06]" : ""
                    }`}
                  >
                    <Cell value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-3 text-xs text-greige">{note}</p> : null}
    </div>
  );
}
