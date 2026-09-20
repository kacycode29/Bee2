import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookOpen, KeyRound, FileDown, Sparkles, Filter, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Bibliothèque de textes",
    description:
      "Des dizaines de textes originaux classés par niveau CECRL (A1–C2), thème et tranche d'âge, avec la possibilité d'ajouter vos propres textes.",
  },
  {
    icon: Sparkles,
    title: "Fiches de leçon automatiques",
    description:
      "Génère en un clic une fiche complète : objectifs, mise en route, vocabulaire, activités, évaluation — adaptée au niveau de votre classe.",
  },
  {
    icon: Filter,
    title: "Exercices générés",
    description:
      "Questions de vrai/faux, texte à trous et vocabulaire créés automatiquement à partir de chaque texte.",
  },
  {
    icon: FileDown,
    title: "Export PDF",
    description: "Fiches et textes prêts à imprimer ou à distribuer à vos élèves.",
  },
  {
    icon: KeyRound,
    title: "Compte protégé par licence",
    description:
      "Chaque compte est activé par une clé unique, liée à un nombre limité d'appareils.",
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
          Bee2 réunit une bibliothèque de textes et un générateur de fiches de leçon
          pour les enseignants d&apos;anglais, du collège au lycée.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <LinkButton href="/signup" size="lg">
            Commencer gratuitement
          </LinkButton>
          <LinkButton href="/login" variant="secondary" size="lg">
            J&apos;ai déjà un compte
          </LinkButton>
        </div>
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
