import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Driver from "./pages/Driver/Driver";
import TableResult from "./pages/Races/Races";

import Filter from "./conponents/Filter/Filter";
import Team from "./pages/Team/Team";
import Dhl from "./pages/DHL/Dhl";
import Detail from "./pages/Detail/Detail";

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
        <Route path="/detail/:id/:yearFilter" Component={Detail} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
