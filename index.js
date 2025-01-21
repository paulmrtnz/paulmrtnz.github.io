import {
    projets
} from './user-data/data.js';

function populateProjets(items, id) {
    const target = document.getElementById(id);

    for (let i = 0; i < items.length ; i++) {
        const projetItem = document.createElement("div");
        projetItem.className = "border border-slate-300 rounded-md px-2 py-1 md:px-4 md:py-2 flex flex-col space-y-1 shadow projet-item";
    
        // Créer le titre
        const projetTitre = document.createElement("h5");
        projetTitre.className = "text-lg font-semibold";
        projetTitre.innerText = items[i].titre;
        projetItem.appendChild(projetTitre);

        // Créer la date
        const projetDate = document.createElement("p");
        projetDate.className = "subtext";
        projetDate.innerText = items[i].date;
        projetItem.appendChild(projetDate);

        // Créer la description
        const projetDescription = document.createElement("p");
        projetDescription.className = "";
        projetDescription.innerText = items[i].description;
        projetItem.appendChild(projetDescription);

        // Créer les tags
        const projetTagsConteneur = document.createElement("div");
        projetTagsConteneur.className = "flex flex-wrap space-x-2 projet-tags";
        for (let j = 0; j < items[i].tags.length; j++) {
            const projetTag = document.createElement("span");
            projetTag.className = "projet-tag bg-indigo-200";
            projetTag.innerHTML = items[i].tags[j];
            projetTagsConteneur.appendChild(projetTag);
        }
        projetItem.appendChild(projetTagsConteneur);

        // Créer les liens
        const projetLiensConteneur = document.createElement("div");
        projetLiensConteneur.className = "flex flex-wrap space-x-2 projet-liens";
        for (let k = 0; k < items[i].liens.length; k++) {
            const projetLien = document.createElement("a");
            projetLien.href = items[i].liens[k].url;
            projetLien.target = "_blank";
            projetLien.innerText = items[i].liens[k].label;
            projetLiensConteneur.appendChild(projetLien);
        }
        projetItem.appendChild(projetLiensConteneur);
        
        target.appendChild(projetItem);
    }
}

populateProjets(projets, "projets");