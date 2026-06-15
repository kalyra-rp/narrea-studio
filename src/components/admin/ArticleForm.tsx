"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import {
  savePost,
  uploadArticleImage,
  type PostInput,
} from "@/app/admin/articles/actions";
import { slugify, type Post } from "@/lib/posts";

// Éditeur markdown chargé côté client uniquement (accède à window).
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const PILIERS = ["Clarté", "Présence", "Ventes"];

const field =
  "w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";
const label = "text-sm font-medium text-prune";

export function ArticleForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [titre, setTitre] = useState(post?.titre ?? "");
  // Le slug suit le titre tant que l'utilisateur ne l'a pas modifié à la main.
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [extrait, setExtrait] = useState(post?.extrait ?? "");
  const [contenu, setContenu] = useState(post?.contenu ?? "");
  const [image, setImage] = useState(post?.image ?? "");
  const [pilier, setPilier] = useState(post?.pilier ?? "");
  const [statut, setStatut] = useState<"brouillon" | "publie">(
    post?.statut ?? "brouillon",
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permet de re-sélectionner le même fichier
    if (!file) return;

    setUploadError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadArticleImage(formData);
      if ("error" in res) setUploadError(res.error);
      else setImage(res.url);
    } catch {
      setUploadError("Échec de l'envoi. Réessayez.");
    } finally {
      setUploading(false);
    }
  }

  function onTitreChange(value: string) {
    setTitre(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function submit(targetStatut?: "brouillon" | "publie") {
    setError(null);
    const values: PostInput = {
      titre,
      slug,
      extrait,
      contenu,
      image,
      pilier,
      statut: targetStatut ?? statut,
    };
    startTransition(async () => {
      const res = await savePost(values, post?.id);
      if ("error" in res) {
        setError(res.error);
        return;
      }
      router.push("/admin/articles");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-6"
    >
      {error ? (
        <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Colonne principale */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div>
            <label htmlFor="titre" className={label}>
              Titre
            </label>
            <input
              id="titre"
              value={titre}
              onChange={(e) => onTitreChange(e.target.value)}
              placeholder="Titre de l'article"
              className={`mt-1.5 ${field}`}
              required
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
              placeholder="genere-depuis-le-titre"
              className={`mt-1.5 font-mono ${field}`}
            />
            <p className="mt-1 text-xs text-greige">
              URL : /journal/{slug || "…"}
            </p>
          </div>

          <div>
            <label htmlFor="extrait" className={label}>
              Extrait
            </label>
            <textarea
              id="extrait"
              value={extrait}
              onChange={(e) => setExtrait(e.target.value)}
              rows={2}
              placeholder="Résumé court affiché dans la liste et le SEO"
              className={`mt-1.5 resize-y ${field}`}
            />
          </div>

          <div data-color-mode="light">
            <span className={label}>Contenu</span>
            <div className="mt-1.5 overflow-hidden rounded-xl border border-prune/20">
              <MDEditor
                value={contenu}
                onChange={(v) => setContenu(v ?? "")}
                height={420}
                preview="live"
                textareaProps={{ placeholder: "Rédigez votre article en markdown…" }}
              />
            </div>
          </div>
        </div>

        {/* Colonne latérale */}
        <aside className="flex flex-col gap-5">
          <div className="rounded-2xl border rule-gold bg-champagne/30 p-5">
            <p className="text-sm font-semibold text-prune">Publication</p>
            <div className="mt-3">
              <label htmlFor="statut" className={label}>
                Statut
              </label>
              <select
                id="statut"
                value={statut}
                onChange={(e) =>
                  setStatut(e.target.value as "brouillon" | "publie")
                }
                className={`mt-1.5 ${field}`}
              >
                <option value="brouillon">Brouillon</option>
                <option value="publie">Publié</option>
              </select>
            </div>

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
            <label htmlFor="pilier" className={label}>
              Catégorie (pilier)
            </label>
            <input
              id="pilier"
              value={pilier}
              onChange={(e) => setPilier(e.target.value)}
              list="piliers"
              placeholder="Clarté, Présence, Ventes…"
              className={`mt-1.5 ${field}`}
            />
            <datalist id="piliers">
              {PILIERS.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>

          <div>
            <span className={label}>Image de couverture</span>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onPickImage}
              className="hidden"
            />

            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-full bg-prune px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
              >
                {uploading ? "Envoi…" : "Téléverser une image"}
              </button>
              {image ? (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="text-xs font-medium text-greige underline transition-colors hover:text-prune"
                >
                  Retirer
                </button>
              ) : null}
            </div>

            {uploadError ? (
              <p className="mt-2 text-xs text-red-600">{uploadError}</p>
            ) : null}

            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt="Aperçu"
                className="mt-3 aspect-[16/9] w-full rounded-lg object-cover"
              />
            ) : null}

            {/* Option secondaire : coller une URL */}
            <label htmlFor="image" className="mt-3 block text-xs text-greige">
              … ou coller une URL
            </label>
            <input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://…"
              className={`mt-1 ${field}`}
            />
          </div>
        </aside>
      </div>
    </form>
  );
}
