export const routes = {
  users: "/users",
  user: (id: string) => `/users/${id}`,
};

export const apiRoutes = {
  v1: {
    users: "/api/v1/users",
    user: (id: string) => `/api/v1/users/${id}`,
  },
};
