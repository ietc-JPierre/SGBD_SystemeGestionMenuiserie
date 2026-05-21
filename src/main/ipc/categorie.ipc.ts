import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerCategorieHandlers() {

  ipcMain.handle('categories:getAll', async () => {
    return await prisma.categorie.findMany();
  });

  ipcMain.handle('categories:create', async (_, data) => {
    return await prisma.categorie.create({
      data,
    });
  });

  ipcMain.handle('categories:update', async (_, id, data) => {
    return await prisma.categorie.update({
      where: { id },
      data,
    });
  });

  ipcMain.handle('categories:delete', async (_, id) => {
    return await prisma.categorie.delete({
      where: { id },
    });
  });

}