"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  saveProduct,
  uploadProductImage,
  type ProductInput,
} from "@/app/admin/produits/actions";
import { slugify } from "@/lib/posts";
import type { Product } from "@/lib/products";

const field =
  "mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";
const label = "text-sm font-medium text-prune";

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [nom, setNom] = useState(product?.nom ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [description, setDescription] = useState(product?.description ?? "");
  const [prix, setPrix] = useState(product?.prix ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [categorie, setCategorie] = useState(product?.categorie ?? "");
  const [tags, setTags] = useState((product?.tags ?? []).join(", "));
  const [payhip, setPayhip] = useState(product?.payhip_url ?? "");
  const [statut, setStatut] = useState<"brouillon" | "publie">(
    product?.statut ?? "brouillon",
  );

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  function onNom(v: string) {
    setNom(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadProductImage(fd);
      if ("error" in res) setError(res.error);
      else setImage(res.url);
    } finally {
      setUploading(false);
    }
  }

  function submit(target?: "brouillon" | "publie") {
    setError(null);
    const values: ProductInput = {
      nom,
      slug,
      description,
      prix,
      image,
      categorie,
      tags,
      payhip_url: payhip,
      statut: target ?? statut,
    };
    startTransition(async () => {
      const res = await saveProduct(values, product?.id);
      if ("error" in res) setError(res.error);
      else {
        router.push("/admin/produits");
        router.refresh();
      }
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="grid gap-6 lg:grid-cols-3"
    >
      <div className="flex flex-col gap-5 lg:col-span-2">
        {error ? (
          <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div>
          <label htmlFor="nom" className={label}>
            Nom
          </label>
          <input
            id="nom"
            value={nom}
            onChange={(e) => onNom(e.target.value)}
            required
            className={field}
          />
        </div>

        <div>
          <label htmlFor="slug" className={label}>
            Slug
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className={`${field} font-mono`}
          />
        </div>

        <div>
          <label htmlFor="description" className={label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className={`${field} resize-y`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="prix" className={label}>
              Prix (affiché)
            </label>
            <input
              id="prix"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              placeholder="29 €"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="categorie" className={label}>
              Catégorie
            </label>
            <input
              id="categorie"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className={field}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className={label}>
            Tags (séparés par des virgules)
          </label>
          <input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="modèle, canva, présence"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="payhip" className={label}>
            Lien Payhip (laisser vide = « bientôt »)
          </label>
          <input
            id="payhip"
            value={payhip}
            onChange={(e) => setPayhip(e.target.value)}
            placeholder="https://payhip.com/b/…"
            className={field}
          />
        </div>
      </div>

      {/* Colonne latérale */}
      <aside className="flex flex-col gap-5">
        <div className="rounded-2xl border rule-gold bg-champagne/30 p-5">
          <label htmlFor="statut" className={label}>
            Statut
          </label>
          <select
            id="statut"
            value={statut}
            onChange={(e) => setStatut(e.target.value as "brouillon" | "publie")}
            className={field}
          >
            <option value="brouillon">Brouillon</option>
            <option value="publie">Publié</option>
          </select>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex justify-center rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
            >
              {isPending ? "Enregistrement…" : "Enregistrer"}
            </button>
            {statut === "brouillon" ? (
              <button
                type="button"
                disabled={isPending}
                onClick={() => submit("publie")}
                className="inline-flex justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-prune-deep transition-colors hover:bg-gold-dark disabled:opacity-60"
              >
                Enregistrer et publier
              </button>
            ) : null}
          </div>
        </div>

        <div>
          <span className={label}>Image</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onPickImage}
            className="hidden"
          />
          <div className="mt-1.5">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex rounded-full bg-prune px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
            >
              {uploading ? "Envoi…" : "Téléverser une image"}
            </button>
          </div>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Aperçu"
              className="mt-3 aspect-[4/3] w-full rounded-lg object-cover"
            />
          ) : null}
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="… ou coller une URL"
            className={`${field} mt-2`}
          />
        </div>
      </aside>
    </form>
  );
}
