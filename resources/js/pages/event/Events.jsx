import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import EventTable from "./EventTable";

export default () => {
	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
				<h1 className="page-title">イベント一覧</h1>
			</div>
			<EventTable />
		</>
	)
}