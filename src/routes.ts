export const routes = {
  rsc: {
    users: "/rsc/users",
    user: (id: string) => `/rsc/users/${id}`,
  },
  reactQuery: {
    users: "/react-query/users",
    user: (id: string) => `/react-query/users/${id}`,
  },
};

export const apiRoutes = {
  v1: {
    users: "/api/v1/users",
    user: (id: string) => `/api/v1/users/${id}`,
  },
};
