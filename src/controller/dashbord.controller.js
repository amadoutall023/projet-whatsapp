import { userModel } from '../models/user.model.js';
import { renderDashboard } from '../views/dashboard.view.js';

export async function dashboardController() {
  const users = await userModel.getUsers();
  renderDashboard(users);
}
