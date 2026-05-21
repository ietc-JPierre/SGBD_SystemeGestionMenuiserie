import { ipcMain } from 'electron';
import { prisma } from '../prisma';

export function registerClientHandlers() {

  // GET ALL
  ipcMain.handle('clients:getAll', async () => {
    try {
      return await prisma.client.findMany({
        include: {
          typeClient: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // CREATE
  ipcMain.handle('clients:create', async (_, data) => {
    try {
      return await prisma.client.create({
        data,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // UPDATE
  ipcMain.handle('clients:update', async (_, id: number, data) => {
    try {
      return await prisma.client.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // DELETE
  ipcMain.handle('clients:delete', async (_, id: number) => {
    try {
      return await prisma.client.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

}