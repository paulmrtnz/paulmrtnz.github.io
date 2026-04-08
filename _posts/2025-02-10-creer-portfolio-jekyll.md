---
title: "Créer ce portfolio avec Jekyll"
description: "Pourquoi j'ai choisi Jekyll et comment je garde un design léger."
tags:
  - Web
  - Jekyll
  - Portfolio
---

Jekyll reste un excellent choix pour un site personnel hébergé sur GitHub Pages : pas de base de données, un flux RSS gratuit et du contenu versionné. Pour conserver le style minimaliste de ce portfolio, j'ai simplement ajouté :

- Une mise en page unique qui reprend la grille Tailwind CDN déjà utilisée.
- Des données structurées dans `_data` pour les projets, formations et expériences.
- Une page blog listant les articles sans casser le reste du contenu.

Le résultat : un site facile à maintenir, que je peux enrichir par simple ajout d'un fichier Markdown.
