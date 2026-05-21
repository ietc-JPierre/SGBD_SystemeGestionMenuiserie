import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerChantierHandlers() {
  ipcMain.handle('chantiers:getAll', async () => {
    return await prisma.chantier.findMany({
      include: {
        ville: true,
      },
    });
  });

  ipcMain.handle('chantiers:create', async (_, data) => {
    return await prisma.chantier.create({ data });
  });

  ipcMain.handle('chantiers:update', async (_, id: number, data) => {
    return await prisma.chantier.update({
      where: { id },
      data,
    });
  });

  ipcMain.handle('chantiers:delete', async (_, id: number) => {
    return await prisma.chantier.delete({
      where: { id },
    });
  });
}