import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerCommandeProduitHandlers() {
  ipcMain.handle('commandeProduits:getAll', async () => {
    return await prisma.commandeProduit.findMany({
      include: {
        commande: {
          include: {
            client: true,
          },
        },
        produit: true,
        dimension: true,
      },
    });
  });

  ipcMain.handle('commandeProduits:create', async (_, data) => {
    return await prisma.commandeProduit.create({ data });
  });

  ipcMain.handle('commandeProduits:update', async (_, ids, data) => {
    return await prisma.commandeProduit.update({
      where: {
        produitId_dimensionId_commandeId: {
          produitId: ids.produitId,
          dimensionId: ids.dimensionId,
          commandeId: ids.commandeId,
        },
      },
      data,
    });
  });

  ipcMain.handle('commandeProduits:delete', async (_, ids) => {
    return await prisma.commandeProduit.delete({
      where: {
        produitId_dimensionId_commandeId: {
          produitId: ids.produitId,
          dimensionId: ids.dimensionId,
          commandeId: ids.commandeId,
        },
      },
    });
  });
}