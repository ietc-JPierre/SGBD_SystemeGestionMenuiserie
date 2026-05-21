import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerPersonnelCommandeHandlers() {
  ipcMain.handle('personnelCommandes:getAll', async () => {
    return await prisma.personnelCommande.findMany({
      include: {
        personnel: true,
        commande: {
          include: {
            client: true,
          },
        },
      },
    });
  });

  ipcMain.handle('personnelCommandes:create', async (_, data) => {
    return await prisma.personnelCommande.create({ data });
  });

  ipcMain.handle('personnelCommandes:delete', async (_, ids) => {
    return await prisma.personnelCommande.delete({
      where: {
        personnelId_commandeId: {
          personnelId: ids.personnelId,
          commandeId: ids.commandeId,
        },
      },
    });
  });
}