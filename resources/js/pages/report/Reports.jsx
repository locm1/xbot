import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { ReportTable } from "./ReportTable";
import { getAllReports } from "./api/ReportApiMethods";
import { useHistory } from "react-router-dom";
import { Paths } from "@/paths";


export default () => {
	const [reports, setReports] = useState([]);
	const [paginate, setPaginate] = useState({ 
		current_page: 0, per_page: 0, from: 0, to: 0,total: 0 
	})
	const [links, setLinks] = useState([]);
	const history = useHistory();

	useEffect(() => {
		getAllReports()
			.then(response => {
				setReports(response.data.data);
				delete response.data.data;
				setPaginate(response.data);
				setLinks([...Array(response.data.last_page)].map((_, i) => i + 1))
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
				<div className="">
					<h1 className="page-title">レポート一覧</h1>
				</div>
				<div className="w-50 d-flex justify-content-end">
					<Button onClick={() => history.push(Paths.CreateReport.path)}>新規作成</Button>
				</div>
			</div>

			<ReportTable
				reports={reports}
				setReports={setReports}
				getAllReports={getAllReports}
				links={links}
				setLinks={setLinks}
				paginate={paginate}
				setPaginate={setPaginate}
			/>
    </>
	)
}