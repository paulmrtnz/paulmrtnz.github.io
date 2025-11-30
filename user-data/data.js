export const projets = [
  {
    titre: "Info Politique Presse",
    date: "2020-2021",
    description:
      "Projet de site internet pour visualiser la presse française sur un échiquier politique. Le projet n'a jamais abouti.",
    tags: ["En équipe", "Web", "BDD", "API"],
    liens: [],
  },
  {
    titre: "Serre connectée IoT",
    date: "juin 2022",
    description:
      "Projet de conception d'une serre connectée, avec un système de contrôle d'humidité, de température et de luminosité.",
    tags: ["1<sup>ère</sup> année INSA", "En équipe", "IoT", "Arduino", "LoRA"],
    liens: [
      // { url: "https://github.com/paulmrtnz/serre-connectee", label: "GitHub" },
    ],
  },
  {
    titre: "Projet C - Bataille navale",
    date: "janvier 2025",
    description:
      "Programmation en C d'un jeu de bataille navale avec interface graphique SDL.",
    tags: ["2<sup>ème</sup> année INSA", "Groupe", "C", "SDL"],
    liens: [
      {
        url: "https://github.com/paulmrtnz/bataille-navale-en-C",
        label: "GitHub",
      },
    ],
  },
  {
    titre: "Redesign - Site Cafet étudiante de l'INSA",
    date: "2023",
    description:
      "Réécriture du design du site de la cafétéria étudiante de l'INSA CVL.",
    tags: ["Groupe", "CSS", "PHP"],
    liens: [{ url: "https://cafet.insa-cvl.org/", label: "Site web" }],
  },
  {
    titre: "Classificateur naïf Bayésien en python",
    date: "juin 2024",
    description:
      "Introduction à la recherche expérimentale. Écriture d'un script python pour classifier des données en utilisant un classificateur naïf Bayésien.",
    tags: ["3<sup>ème</sup> année INSA", "Groupe", "Python"],
    liens: [
      {"url": "https://github.com/paulmrtnz/naive-bayes-classifier-python", "label": "GitHub"}
    ],
  },
  {
    titre: "Le Menutator",
    date: "janvier 2025",
    description:
      "Application python pour générer son menu de la semaine, à partir de plats enregistrés localement.",
    tags: ["Python"],
    liens: [
      // {"url": "https://github.com/paulmrtnz/menutator", "label": "GitHub"}
    ],
  },
  {
    titre: "Intégration de l'instrumentation virtuelle d'un vibromètre laser",
    date: "octobre 2025",
    description:
      "Programmation en Python d'une classe de contrôle et d'acquisition de données pour un vibromètre laser Polytec et intégration avec une interface utilisateur.",
    tags: [
      "5<sup>ème</sup> année INSA",
      "Acquisition / Instrumentation",
      "Groupe",
      "Python",
      "GPIB / VISA",
      "Liaison série",
    ],
    liens: [
      //{"url": "https://github.com/paulmrtnz/INS_VIR_5A", "label": "GitHub"}
    ],
  },
  {
    titre: "AGV suiveur de ligne IoT",
    date: "octobre 2025",
    description:
      "Conception et réalisation d'un véhicule autoguidé (AGV) suiveur de ligne avec communication IoT en Bluetooth pour le suivi et le contrôle à distance via une application web.",
    tags: [
      "5<sup>ème</sup> année INSA",
      "IoT",
      "Groupe",
      "Systèmes embarqués",
      "Temps réel",
      "C (Arduino)",
      "Python Web (FastAPI)",
    ],
    liens: [
      //{"url": "https://github.com/paulmrtnz/5A_ACAD_IoT", "label": "GitHub"}
    ],
  },
  {
    titre: "K3",
    date: "novembre 2025",
    description:
      "Application web React pour gérer et visualiser le graphe des joueurs du jeu Killer. Cette application permet de suivre en temps réel les cibles, les éliminations et l'état des joueurs à travers un graphe visuel interactif.",
    tags: [
      "Graphe",
      "UI / UX",
      "React (+ ReactFlow)",
      "Firebase (Auth + Firestore)",
    ],
    liens: [
      // {"url": "https://github.com/paulmrtnz/kill3r", "label": "GitHub"}
    ],
  },
  {
    titre: "Projet de fin d'études: Détection de migraines avec IA",
    date: "2024-2025",
    description:
      "Etude des données de santé Apple HealthKit et développement d'un modèle d'IA pour la détection précoce de migraines chez un patient.",
    tags: [
      "5<sup>ème</sup> année INSA",
      "IA",
      "Data Science",
      "Python",
      "Pytorch",
      "Apple HealthKit",
    ],
    liens: [
      // {"url": "https://github.com/paulmrtnz/migraine_prediction_nn", "label": "GitHub"}
    ],
  },
];

export const competences = [
  {
    label: "Soft skills",
    contenu: [
      "Créativité",
      "Adaptabilité / Résilience",
      "Rigueur / Souci du détail",
      "Organisation / Fiabilité",
      "Curiosité",
      "Prise d'initiative",
    ],
  },
  {
    label: "Hard skills",
    contenu: [
      "Coordination d'équipe et gestion de planning",
      "Gestion et régie événementielle",
    ],
  },
  {
    label: "Programmation",
    contenu: [
      "C / C++",
      "Python",
      "JavaScript / TypeScript / React / NextJS",
      "PHP",
      "SQL",
      "HTML / CSS",
    ],
  },
  {
    label: "Analyse de données + IA",
    contenu: [
      "MATLAB",
      "R",
      "Python (Numpy / Pandas / Pytorch / Scikit-learn)",
    ],
  },
  {
    label: "Langues",
    contenu: ["Français (Maternel)", "Anglais (C1)", "Allemand (B2)"],
  },
];
