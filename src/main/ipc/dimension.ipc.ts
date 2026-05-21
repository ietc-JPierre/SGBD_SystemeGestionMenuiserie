import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerDimensionHandlers() {
  ipcMain.handle('dimensions:getAll', async () => {
    return await prisma.dimension.findMany();
  });

  ipcMain.handle('dimensions:create', async (_, data) => {
    return await prisma.dimension.create({ data });
  });

  ipcMain.handle('dimensions:update', async (_, id: number, data) => {
    return await prisma.dimension.update({
      where: { id },
      data,
    });
  });

  ipcMain.handle('dimensions:delete', async (_, id: number) => {
    return await prisma.dimension.delete({
      where: { id },
    });
  });
}