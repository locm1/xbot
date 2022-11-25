
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
import ReactDOM from 'react-dom';

// Components
import Routing from "@/routing";

// core styles
import "../../scss/volt.scss";

//vendor styles
import "leaflet/dist/leaflet.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datetime/css/react-datetime.css";


ReactDOM.render(<Routing />, document.getElementById("app"));
