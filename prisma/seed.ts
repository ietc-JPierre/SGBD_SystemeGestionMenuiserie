import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.typeClient.upsert({
    where: { id: 1 },
    update: {},
    create: { nomType: 'Particulier' },
  });

  await prisma.typeClient.upsert({
    where: { id: 2 },
    update: {},
    create: { nomType: 'Entreprise' },
  });

  await prisma.categorie.upsert({
    where: { id: 1 },
    update: {},
    create: { nomCategorie: 'Porte' },
  });

  await prisma.categorie.upsert({
    where: { id: 2 },
    update: {},
    create: { nomCategorie: 'Fenêtre' },
  });

  await prisma.codePostalChantier.upsert({
    where: { codePostal: '1000' },
    update: {},
    create: { codePostal: '1000', ville: 'Bruxelles' },
  });

  await prisma.personnel.upsert({
    where: { id: 'EMP001' },
    update: {},
    create: {
      id: 'EMP001',
      nom: 'Jean Dupont',
      role: 'Menuisier',
    },
  });

  await prisma.personnel.upsert({
    where: { id: 'EMP002' },
    update: {},
    create: {
      id: 'EMP002',
      nom: 'Marie Lambert',
      role: 'Chef de chantier',
    },
  });

  console.log('Seed terminé.');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });