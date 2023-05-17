import { Button, Card, Col, Form, Row } from "react-bootstrap"
import CheckboxButton from "@/components/CheckboxButton";
import SegmentCard from "@/pages/message/segment/SegmentCard";
import { useEffect, useState } from "react";
import { getDefaultSegments, storeReport, getReport } from "./api/ReportApiMethods";
import { useLocation, useParams } from "react-router-dom";

export default () => {
	const [title, setTitle] = useState();
	const [searchTerms, setSearchTerms] = useState({});
	const [errors, setErrors] = useState({})
	const [data, setData] = useState({name: '', period: '', xlabel: 0, type: ''});
  const { id } = useParams();
	const [questionnaires, setQuestionnaires] = useState([]);
	const periods = ['1週間', '1ヶ月間', '1年間'];
	const xlabels = ['期間', '性別', '誕生月'];
	const types = ['棒グラフ', '折れ線グラフ', '円グラフ'];
	const isEditing = useLocation().pathname.includes('/edit');

	useEffect(() => {
		getDefaultSegments(setQuestionnaires);
		if (isEditing) {
			getReport(id).then(response => {
				const report = response.data;
				setData({name: report.name, period: report.period, xlabel: report.xlabel, type: report.type});
				setTitle(report.name);
				setSearchTerms(JSON.parse(report.search_json));
			})
		}
	}, []);

	const handleChange = (e) => {
		let name, value, checked;
		if (e.target.length !== 0) {
			name = e.target.name;
			value = e.target.value;
			checked = e.target.checked ?? true;
			setSearchTerms(prev => {
				return ({
					...prev,
					[name]: checked
						? [...(prev[name] || []), value]
						: prev[name].filter((term) => term !== value)
				})
			});
		} else {
			name = e.detail.tagify.DOM.originalInput.name;
			value = e.detail.tagify.value[e.detail.tagify.value.length - 1].value ?? e.detail.tagify.value[0].value;
			checked = e.target.checked ?? true;
			setSearchTerms(prev => {
				if (prev[name] ? prev[name].some(v => v === value) : false) {
					return ({ ...prev });
				}
				return ({
					...prev,
					[name]: checked
						? [...(prev[name] || []), value]
						: prev[name].filter((term) => term !== value)
				})
			});
		}
	}

	const handleChangeForRange = (e) => {
		let name, value;
		if (e.target) {
			name = e.target.name;
			value = e.target.value;
		} else {
			name = e.name;
			value = e.value;
		}
		setSearchTerms((prevSearchTerms) => {
			if (value) {
				return {
					...prevSearchTerms,
					[name]: [value]
				};
			} else {
				delete prevSearchTerms[name];
				return {
					...prevSearchTerms,
				};
			}
		});
	}


	const handleChangeTags = (e) => {
		const newQuestionnaires = questionnaires.map((v, k) => {
			if (v.displayOrder == e.detail.tagify.DOM.originalInput.name) {
				return ({
					id: v.id,
					displayOrder: v.displayOrder,
					type: v.type,
					questionTitle: v.questionTitle,
					isDefault: v.isDefault,
					questionnaireItems: e.detail.tagify.value
				})
			} else {
				return { ...v };
			}
		})
		setQuestionnaires(newQuestionnaires);
	}

	const handleDataChange = (e) => {
		setData(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	const handleSave = () => {
		data.searchTerms = searchTerms
		if (isEditing) {
			updateReport(data).then(response => {
				console.log(response);
			}).catch(error => {
				console.error(error);
				if (error.response.status === 422) {
					setErrors(error.response.data);
				}
			})
			return ;
		}
		console.log('aaa');
		storeReport(data).then(response => {
			
		}).catch(error => {
			console.log(error.response.status);
			if (error.response.status === 422) {
				setErrors(error.response.data.errors);
			}
		});
	}

	return (
		<>
		<Button onClick={() => console.log(data)} />
		<Button onClick={() => console.log(searchTerms)} />
		<Button onClick={() => console.log(errors)} />
			<Row>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
					<div className="d-block mb-4 mb-md-0">
						<h1 className="page-title">{title ?? 'レポート新規作成'}</h1>
					</div>
					<Button variant="success" className="btn-default-success" onClick={handleSave}>
						保存する
					</Button>
				</div>
				<Col xs={8}>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">レポート名</h5>
						</Card.Header>
						<Card.Body>
							<Form.Control
								name="name"
								value={data.name}
								onChange={handleDataChange}
								isInvalid={!!errors.name}
							/>
							{
								errors.name && 
								<Form.Control.Feedback type="invalid">{errors.name[0]}</Form.Control.Feedback>
							}
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">出力条件</h5>
						</Card.Header>
						<Card.Body>
							{questionnaires.map((v, k) =>
								<SegmentCard {...v} key={k} questionnaireType="even" handleChange={handleChange} handleChangeForRange={handleChangeForRange} handleChangeTags={handleChangeTags} searchTerms={searchTerms} />
							)}
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">期間</h5>
						</Card.Header>
						<Card.Body>
							{periods.map((v, k) => 
								<Form.Check
									key={`period-${k}`}
									type='radio'
									label={v}
									name='period'
									id={`period-${k + 1}`}
									value={k + 1}
									checked={data.period == k + 1}
									onChange={handleDataChange}
									isInvalid={!!errors.period}
								/>
							)}
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">グラフ種別</h5>
						</Card.Header>
						<Card.Body>
							{types.map((v, k) =>
								<Form.Check
									key={`type-${k}`}
									type='radio'
									label={v}
									name={'type'}
									id={`type-${k}`}
									value={k + 1}
									checked={data.type == k + 1}
									onChange={handleDataChange}
									isInvalid={!!errors.type}
								/>
							)}
							<Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">x軸設定</h5>
						</Card.Header>
						<Card.Body>
							{xlabels.map((v, k) =>
								<Form.Check
									key={`xlabel-${k}`}
									type='radio'
									label={v}
									name={'xlabel'}
									id={`xlabel-${k}`}
									value={k + 1}
									checked={data.xlabel == k + 1}
									onChange={handleDataChange}
								/>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<div className="d-flex justify-content-end">
				<Button variant="success" className="btn-default-success" onClick={handleSave}>
					保存する
				</Button>
			</div>
		</>
	)
}