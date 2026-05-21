import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerProduitHandlers() {
  ipcMain.handle('produits:getAll', async () => {
    return await prisma.produit.findMany({
      include: {
        categorie: true,
      },
    });
  });

  ipcMain.handle('produits:create', async (_, data) => {
    return await prisma.produit.create({
      data,
    });
  });

  ipcMain.handle('produits:update', async (_, id: number, data) => {
    return await prisma.produit.update({
      where: { id },
      data,
    });
  });

  ipcMain.handle('produits:delete', async (_, id: number) => {
    return await prisma.produit.delete({
      where: { id },
    });
  });
}