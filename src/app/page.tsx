import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookOpen, KeyRound, FileDown, Sparkles, Filter, ShieldCheck } from "lucide-react";
import { isStripeConfigured } from "@/lib/stripe";

const features = [
  {
    icon: Sparkles,
    title: "Fiches conformes au canevas APC/PI",
    description:
      "Choisissez la classe, l'unité et la leçon du programme officiel (6e à 3e) : Bee2 génère la fiche complète — compétence, fonctions, structures, phases de la séance — selon le canevas exact du Guide d'utilisation des curricula.",
  },
  {
    icon: Filter,
    title: "Consolidation & situations d'intégration",
    description:
      "Séances de consolidation et situations d'intégration générées automatiquement, avec grille de correction critériée (Pertinence, Language Accuracy, Coherence, Refinement).",
  },
  {
    icon: BookOpen,
    title: "Bibliothèque de textes",
    description:
      "Des textes originaux classés par niveau CECRL, utilisables comme support de lecture pendant vos séances, avec la possibilité d'ajouter vos propres textes.",
  },
  {
    icon: FileDown,
    title: "Export PDF",
    description: "Fiches et textes prêts à imprimer ou à distribuer à vos élèves.",
  },
  {
    icon: KeyRound,
    title: "Accès par clé de licence",
    description:
      "Une clé d'accès valide est obligatoire dès la création du compte : nom d'utilisateur, mot de passe et clé, dans le même formulaire.",
  },
  {
    icon: ShieldCheck,
    title: "Anti-piratage",
    description:
      "Vérification de la licence côté serveur à chaque connexion : une clé révoquée coupe l'accès immédiatement.",
  },
];

export default function Home() {
  return (
    <div className="flex-1">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400 text-slate-900">
              B
            </span>
            Bee2
          </div>
          <nav className="flex items-center gap-3">
            <LinkButton href="/login" variant="ghost" size="sm">
              Se connecter
            </LinkButton>
            <LinkButton href="/signup" variant="primary" size="sm">
              Créer un compte
            </LinkButton>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          La préparation de cours d&apos;anglais,
          <br className="hidden sm:block" /> enfin sans friction.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Bee2 génère vos fiches pédagogiques d&apos;anglais (6e à 3e) selon le canevas
          officiel APC/PI, directement à partir du programme du post-primaire.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <LinkButton href="/signup" size="lg">
            Créer un compte avec ma clé d&apos;accès
          </LinkButton>
          <LinkButton href="/login" variant="secondary" size="lg">
            J&apos;ai déjà un compte
          </LinkButton>
        </div>
        {isStripeConfigured() && (
          <p className="mt-4 text-sm text-slate-500">
            Pas encore de clé ?{" "}
            <LinkButton href="/acheter" variant="ghost" size="sm" className="inline-flex">
              Acheter une clé d&apos;accès
            </LinkButton>
          </p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <f.icon className="h-6 w-6 text-amber-500" />
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        Bee2 — outil de préparation pédagogique pour enseignants d&apos;anglais.
      </footer>
    </div>
  );
}
