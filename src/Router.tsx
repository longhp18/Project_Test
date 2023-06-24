import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Driver from "./pages/Driver/Driver";
import TableResult from "./pages/Races/Races";

import Filter from "./conponents/Filter/Filter";
import Team from "./pages/Team/Team";
import Dhl from "./pages/DHL/Dhl";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Filter />
      <Routes>
        <Route path="/driver" Component={Driver} />
        <Route path="/" Component={TableResult} />
        <Route path="/race" Component={TableResult} />
        <Route path="/team" Component={Team} />
        <Route path="/dhl" Component={Dhl} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
