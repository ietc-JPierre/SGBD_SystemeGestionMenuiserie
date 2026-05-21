import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerCodePostalChantierHandlers() {
  ipcMain.handle('codesPostaux:getAll', async () => {
    return await prisma.codePostalChantier.findMany();
  });

  ipcMain.handle('codesPostaux:create', async (_, data) => {
    return await prisma.codePostalChantier.create({ data });
  });

  ipcMain.handle('codesPostaux:update', async (_, codePostal: string, data) => {
    return await prisma.codePostalChantier.update({
      where: { codePostal },
      data,
    });
  });

  ipcMain.handle('codesPostaux:delete', async (_, codePostal: string) => {
    return await prisma.codePostalChantier.delete({
      where: { codePostal },
    });
  });
}