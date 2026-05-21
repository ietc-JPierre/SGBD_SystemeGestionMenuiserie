import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerCommandeHandlers() {
  ipcMain.handle('commandes:getAll', async () => {
    return await prisma.commande.findMany({
      include: {
        client: true,
      },
    });
  });

  ipcMain.handle('commandes:create', async (_, data) => {
    return await prisma.commande.create({ data });
  });

  ipcMain.handle('commandes:update', async (_, id: number, data) => {
    return await prisma.commande.update({
      where: { id },
      data,
    });
  });

  ipcMain.handle('commandes:delete', async (_, id: number) => {
    return await prisma.commande.delete({
      where: { id },
    });
  });
}