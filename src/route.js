import { dashboardController } from './controllers/dashboard.controller.js';

export function router(path) {
  const routes = {
    '/': dashboardController,
    '/dashboard': dashboardController,
    // tu peux ajouter ici d'autres routes
  };

  const controller = routes[path];
  if (controller) {
    controller();
  } else {
    document.getElementById('app').innerHTML = `<h1>404 - Page not found</h1>`;
  }
}
