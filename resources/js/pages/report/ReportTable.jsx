import React, { useState, useRef } from "react";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger, Stack } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { first } from "lodash";
import Swal from "sweetalert2";
import QRCode from "qrcode.react";
import Pagination from "@/components/Pagination";
import withReactContent from 'sweetalert2-react-content';
import ReportsContentLoader from "@/pages/report/ReportsContentLoader";
import PaginationContentLoader from "@/components/loader/PaginationContentLoader";
import { deleteReport } from "./api/ReportApiMethods";

export const ReportTable = (props) => {
	const { reports, setReports, getAllReports, links, setLinks, paginate, setPaginate, isRendered, questionnaires } = props;
	const history = useHistory();

	const convertType = (type) => {
		switch (type) {
			case 1:
				return '棒グラフ'
			case 2:
				return '折れ線グラフ'
			case 3:
				return '円グラフ'
			default:
				return 'error'
		}
	}

	const convertXlabel = (xlabel) => {
	if (xlabel === '1') {
		return '期間';
	} else if (xlabel === '2') {
		return '性別';
	} else if (xlabel === '3') {
		return '誕生月';
	} else if (xlabel === '4') {
		return '都道府県';
	} else if (xlabel.startsWith('questionnaireId-')) {
		const questionnaireId = +xlabel.split('-')[1];
		let title = '';
		questionnaires.forEach(obj => {
			if (obj.id === questionnaireId) {
				console.log(obj.title)
				title = obj.title;
			}
		});
		return title;
	} else {
		return 'error';
	}
	
	}

	const TableRow = (props) => {
		const { id, name, period, xlabel, type, search_json } = props;
		const detailPath = Paths.EditReport.path.replace(':id', id);
		const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-danger',
				cancelButton: 'btn btn-gray-400 me-3'
			},
			buttonsStyling: false
		}));
		const handleDelete = async(id) => {
			const textMessage = "本当にこのレポートを削除しますか？";
	
			const result = await SwalWithBootstrapButtons.fire({
				icon: "error",
				title: "削除確認",
				text: textMessage,
				reverseButtons: true,
				showCancelButton: true,
				confirmButtonText: "削除",
				cancelButtonText: "キャンセル",
			});
	
			if (result.isConfirmed) {
				deleteReport(id).then(response => {
					setReports(prev => prev.filter(report => report.id !== id))
				})
			}
		}
		return (
			<tr className="border-bottom">
				<td>
					<Link to={detailPath} className='text-decoration-underline'>{name}</Link>
				</td>
				<td>
					{convertType(type)}
				</td>
				<td>
					{convertXlabel(xlabel)}
				</td>
				<td>
					<Stack direction="horizontal" className="text-center justify-content-center" gap={2}>
						<Button variant="info" size="sm" onClick={() => history.push(detailPath)}>編集</Button>
						<Button variant="danger" size="sm" onClick={() => handleDelete(id)}>削除</Button>
					</Stack>
				</td>
			</tr>
		);
	};

	return (
		<Card border="0" className="table-wrapper table-responsive shadow">
			<Table hover className="user-table align-items-center">
				<thead className="bg-primary text-white">
					<tr>
						<th className="border-bottom">タイトル</th>
						<th className="border-bottom">グラフ種別</th>
						<th className="border-bottom">x軸設定</th>
						<th className="border-bottom text-center">編集・削除</th>
					</tr>
				</thead>
				<tbody className="border-0">
					{
						isRendered ? (
							reports.map((v, k) => <TableRow key={`table-${k}`} {...v} />)
						) : (
							<ReportsContentLoader />
						)
					}
				</tbody>
			</Table>
			{
				isRendered ? (
					<Pagination
						links={links}
						paginate={paginate}
						getListBypage={getAllReports}
						setList={setReports}
						setLinks={setLinks}
						setPaginate={setPaginate}
					/>
				) : (
					<PaginationContentLoader />
				)
			}
		</Card>
	);
};