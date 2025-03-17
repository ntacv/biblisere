import Homepage from "./components/homepage/Homepage";

export const routes = {
  Homepage: undefined,
  User: undefined,
} as const;

export type routesType = typeof routes;
