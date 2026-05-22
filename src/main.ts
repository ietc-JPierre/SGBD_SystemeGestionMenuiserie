import { app, BrowserWindow } from 'electron';
import path from 'path';

import { registerClientHandlers } from './main/ipc/client.ipc';
import { registerCategorieHandlers } from './main/ipc/categorie.ipc';
import { registerProduitHandlers } from './main/ipc/produit.ipc';
import { registerDimensionHandlers } from './main/ipc/dimension.ipc';
import { registerCommandeHandlers } from './main/ipc/commande.ipc';
import { registerCommandeProduitHandlers } from './main/ipc/commande-produit.ipc';
import { registerPersonnelHandlers } from './main/ipc/personnel.ipc';
import { registerPersonnelCommandeHandlers } from './main/ipc/personnel-commande.ipc';
import { registerCodePostalChantierHandlers } from './main/ipc/code-postal-chantier.ipc';
import { registerChantierHandlers } from './main/ipc/chantier.ipc';
import { registerClientChantierHandlers } from './main/ipc/client-chantier.ipc';
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

function createWindow(): void {

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

mainWindow.loadFile(
  path.join(
    process.cwd(),
    'src/renderer/angular-app/dist/angular-app/browser/index.html'
  )
);
 

  registerClientHandlers();
  registerCategorieHandlers();
  registerProduitHandlers();
  registerDimensionHandlers();
  registerCommandeHandlers();
  registerCommandeProduitHandlers();
  registerPersonnelHandlers();
  registerPersonnelCommandeHandlers();
  registerCodePostalChantierHandlers();
  registerChantierHandlers();
  registerClientChantierHandlers();
}

app.whenReady().then(() => {

  createWindow();

  app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }

  });

});

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }

});