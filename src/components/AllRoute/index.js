import React from "react";
import { routes } from "../../routes";
import { useRoutes } from "react-router-dom";
export default function AllRoute() {
  const element = useRoutes(routes);
  return <>{element}</>;
}