
// =========================================================
// * Volt Pro React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-pro-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * License Information (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.
import "./bootstrap";

// packages
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// Components
import Routing from "@/routing";
import ScrollToTop from "@/components/ScrollToTop";

import "./../scss/volt.scss";

//vendor styles
import "leaflet/dist/leaflet.css";
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datetime/css/react-datetime.css";
import { create } from "lodash";


import { LoadingProvider } from "./components/LoadingContext";
import { LoadingScreen } from "./components/LoadingScreen";


function App() {
  return (
    <LoadingProvider>
      <LoadingScreen />
      <BrowserRouter>
        <ScrollToTop />
        <Routing />
      </BrowserRouter>
    </LoadingProvider>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
