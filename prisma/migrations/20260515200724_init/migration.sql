-- CreateTable
CREATE TABLE "Type_client" (
    "Id_Type_client" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categorie" (
    "Id_Categorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_categorie" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dimension" (
    "Id_Dimension" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hauteur" REAL NOT NULL,
    "section" REAL NOT NULL,
    "largeur" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Personnel" (
    "Id_Personnel" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Code_postal_chantier" (
    "code_postal" TEXT NOT NULL PRIMARY KEY,
    "ville" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "Id_Client" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_client" TEXT NOT NULL,
    "adresse_client" TEXT NOT NULL,
    "tel_client" TEXT NOT NULL,
    "Id_Type_client" INTEGER NOT NULL,
    CONSTRAINT "Client_Id_Type_client_fkey" FOREIGN KEY ("Id_Type_client") REFERENCES "Type_client" ("Id_Type_client") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produit" (
    "Id_Produit" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_produit" TEXT NOT NULL,
    "prix_unitaire_produit" REAL NOT NULL,
    "Id_Categorie" INTEGER NOT NULL,
    CONSTRAINT "Produit_Id_Categorie_fkey" FOREIGN KEY ("Id_Categorie") REFERENCES "Categorie" ("Id_Categorie") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chantier" (
    "Id_Chantier" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_chantier" TEXT NOT NULL,
    "rue" TEXT NOT NULL,
    "date_debut_chantier" TEXT NOT NULL,
    "date_fin_chantier" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    CONSTRAINT "Chantier_code_postal_fkey" FOREIGN KEY ("code_postal") REFERENCES "Code_postal_chantier" ("code_postal") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commande" (
    "Id_Commande" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_commande" TEXT NOT NULL,
    "montant_paye" REAL NOT NULL,
    "reste_a_payer" REAL NOT NULL,
    "statut_commande" TEXT NOT NULL,
    "total_commande" REAL NOT NULL,
    "Id_Client" INTEGER NOT NULL,
    CONSTRAINT "Commande_Id_Client_fkey" FOREIGN KEY ("Id_Client") REFERENCES "Client" ("Id_Client") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client_chantier" (
    "Id_Client" INTEGER NOT NULL,
    "Id_Chantier" INTEGER NOT NULL,

    PRIMARY KEY ("Id_Client", "Id_Chantier"),
    CONSTRAINT "Client_chantier_Id_Client_fkey" FOREIGN KEY ("Id_Client") REFERENCES "Client" ("Id_Client") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Client_chantier_Id_Chantier_fkey" FOREIGN KEY ("Id_Chantier") REFERENCES "Chantier" ("Id_Chantier") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commande_produit" (
    "Id_Produit" INTEGER NOT NULL,
    "Id_Dimension" INTEGER NOT NULL,
    "Id_Commande" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prix_unitaire" REAL NOT NULL,

    PRIMARY KEY ("Id_Produit", "Id_Dimension", "Id_Commande"),
    CONSTRAINT "Commande_produit_Id_Produit_fkey" FOREIGN KEY ("Id_Produit") REFERENCES "Produit" ("Id_Produit") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Commande_produit_Id_Dimension_fkey" FOREIGN KEY ("Id_Dimension") REFERENCES "Dimension" ("Id_Dimension") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Commande_produit_Id_Commande_fkey" FOREIGN KEY ("Id_Commande") REFERENCES "Commande" ("Id_Commande") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Personnel_commande" (
    "Id_Personnel" TEXT NOT NULL,
    "Id_Commande" INTEGER NOT NULL,

    PRIMARY KEY ("Id_Personnel", "Id_Commande"),
    CONSTRAINT "Personnel_commande_Id_Personnel_fkey" FOREIGN KEY ("Id_Personnel") REFERENCES "Personnel" ("Id_Personnel") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Personnel_commande_Id_Commande_fkey" FOREIGN KEY ("Id_Commande") REFERENCES "Commande" ("Id_Commande") ON DELETE CASCADE ON UPDATE CASCADE
);
