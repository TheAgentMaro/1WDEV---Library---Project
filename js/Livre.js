// Fonction ajoutlivre (création du tableau + traitement du données)
var ajoutLivre = new function () {

    // UN TABLEAU D'OBJETS JSON AVEC DES VALEURS.

    this.mesLivres = [
        { ID: '1', Nom_Du_Livre: 'Artificial Intelligence and Machine Learning', Catégorie: 'Machine', Pages: 498 },
        { ID: '2', Nom_Du_Livre: 'The Art of Computer Programming', Catégorie: 'La programmation', Pages: 322},
        { ID: '3', Nom_Du_Livre: 'Hidden Truth: Forbidden Knowledge', Catégorie: 'La vérité cachée', Pages: 297 }
    ]

    this.Catégorie = ['Entreprise', 'Machine', 'La programmation', 'Science','La vérité cachée'];
    this.col = [];

    this.createTable = function () {

        // EXTRACT VALEUR POUR EN-TÊTE DE TABLE

        for (var i = 0; i < this.mesLivres.length; i++) {
            for (var key in this.mesLivres[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        // CRÉER UN TABLEAU.
        var table = document.createElement('table');
        table.setAttribute('id', 'LibTableau');     // ID DU TABLEAU

        var tr = table.insertRow(-1);               // CRÉER UNE LIGNE (POUR EN-TÊTE).

        for (var h = 0; h < this.col.length; h++) {
          
            // AJOUTER Table Header
            
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        // Ajouter des lignes (format JSON)
        for (var i = 0; i < this.mesLivres.length; i++) {

            tr = table.insertRow(-1);           // Crée une nouvelle ligne

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.mesLivres[i][this.col[j]];
            }

            // CRÉEZ ET AJOUTEZ AUX CELLULES DE TABLE AVEC DES ÉVÉNEMENTS.

            this.td = document.createElement('td');

            // *** Supprimer.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btnSupp = document.createElement('input');
            btnSupp.setAttribute('type', 'button');    // ATTRIBUTE.
            btnSupp.setAttribute('value', 'Supprimer');
            btnSupp.setAttribute('style', 'background-color:#ED5650;');
            btnSupp.setAttribute('onclick', 'ajoutLivre.Delete(this)');   //  BUTTON >'onclick' EVENT.
            this.td.appendChild(btnSupp);
        }


        // AJOUTEZ UNE LIGNE À LA FIN AVEC DES ZONES DE TEXTE VIERGES ET UNE LISTE DÉROULANTE (POUR UNE NOUVELLE ENTRÉE)

        tr = table.insertRow(-1);           // CRÉEZ LA DERNIÈRE LIGNE.

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {

                if (j == 2) {   // NOUS AJOUTERONS UNE LISTE DÉROULANTE À LA DEUXIÈME COLONNE (POUR Catégorie)

                    var select = document.createElement('select');      // CRÉER ET AJOUTER UNE LISTE DÉROULANTE
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.Catégorie.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.Catégorie[k] + '">' + this.Catégorie[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else {
                    var tBox = document.createElement('input');          // CRÉER ET AJOUTER UNE ZONE DE TEXTE
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);
        
        // *** Crée 
        var btnCree = document.createElement('input');

        btnCree.setAttribute('type', 'button');       //ATTRIBUTES.
        btnCree.setAttribute('value', 'Ajouter');
        btnCree.setAttribute('id', 'New' + i);
        btnCree.setAttribute('style', 'background-color:#207DD1;');
        btnCree.setAttribute('onclick', 'ajoutLivre.CreateNew(this)');       // BUTTON's 'onclick' EVENT.
        this.td.appendChild(btnCree);

        var div = document.getElementById('tableau');
        div.innerHTML = '';
        div.appendChild(table);    // AJOUTER LE TABLEAU À LA PAGE WEB
    };

    // ******  Supp/Crée buttons :

   
    // Supprimer LES DONNÉES
    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.mesLivres.splice((activeRow - 1), 1);    // SUPPRIMER ligne
        this.createTable();                         // REFRESHER 'tableau'
    };


    // CRÉER UN NOUVEAU
    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('LibTableau').rows[activeRow];
        var obj = {};

        // AJOUTEZ UNE NOUVELLE VALEUR À mesLivres ARRAY
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // VÉRIFIEZ SI L'ÉLÉMENT (TEXTBOX / SELECT)
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('Tous les champs sont obligatoires');
                    break;
                }
            }
        }
        obj[this.col[0]] = this.mesLivres.length + 1;     // Nouvelle ID.

        if (Object.keys(obj).length > 0) {      // VÉRIFIEZ SI L'OBJET N'EST PAS VIDE
            this.mesLivres.push(obj);             // POUSSER (AJOUTER) DES DONNÉES AU TABLEAU 
            this.createTable();                 // RAFRAICHISSEZ LA TABLEAU
        }
    }

    // ****** OPERATIONS Fins
}

ajoutLivre.createTable();