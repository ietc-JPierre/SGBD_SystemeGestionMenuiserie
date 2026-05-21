import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerClientChantierHandlers() {
  ipcMain.handle('clientChantiers:getAll', async () => {
    return await prisma.clientChantier.findMany({
      include: {
        client: true,
        chantier: {
          include: {
            ville: true,
          },
        },
      },
    });
  });

  ipcMain.handle('clientChantiers:create', async (_, data) => {
    return await prisma.clientChantier.create({ data });
  });

  ipcMain.handle('clientChantiers:delete', async (_, ids) => {
    return await prisma.clientChantier.delete({
      where: {
        clientId_chantierId: {
          clientId: ids.clientId,
          chantierId: ids.chantierId,
        },
      },
    });
  });
}