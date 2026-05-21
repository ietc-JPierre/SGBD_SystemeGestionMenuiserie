import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerPersonnelHandlers() {
  ipcMain.handle('personnels:getAll', async () => {
    return await prisma.personnel.findMany();
  });

  ipcMain.handle('personnels:create', async (_, data) => {
    return await prisma.personnel.create({ data });
  });

  ipcMain.handle('personnels:update', async (_, id: string, data) => {
    return await prisma.personnel.update({
      where: { id },
      data,
    });
  });

  ipcMain.handle('personnels:delete', async (_, id: string) => {
    return await prisma.personnel.delete({
      where: { id },
    });
  });
}