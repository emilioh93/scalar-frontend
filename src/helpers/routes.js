const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  details: (id) => (id ? `/details/${id}` : `/details/:id`),
  dashboard: "/dashboard",
};

export default routes;
