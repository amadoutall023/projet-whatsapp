const API_URL = 'http://localhost:3000/users';

export const userModel = {
  async getUsers() {
    const res = await fetch(API_URL);
    return await res.json();
  },

  async getUser(id) {
    const res = await fetch(`${API_URL}/${id}`);
    return await res.json();
  }
};
