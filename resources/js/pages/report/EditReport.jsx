import { Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import CheckboxButton from "@/components/CheckboxButton";
import SegmentCard from "@/pages/message/segment/SegmentCard";
import { useEffect, useState } from "react";
import { getDefaultSegments, storeReport, getReport, updateReport, getQuestionnaires } from "./api/ReportApiMethods";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Paths } from "@/paths";

export default () => {
	const [title, setTitle] = useState();
	const [searchTerms, setSearchTerms] = useState({});
	const [errors, setErrors] = useState({})
	const [data, setData] = useState({ name: '', period: '', xlabel: 0, type: '' });
	const [questionnaires, setQuestionnaires] = useState([]);
	const [originalQuestions, setOriginalQuestions] = useState([]);
	const [xlabels, setXlabels] = useState([{ label: '期間', value: '1' }, { label: '性別', value: '2' }, { label: '誕生月', value: '3' }, { label: '都道府県', value: '4' }])
	const { id } = useParams();
	const history = useHistory();
	const isEditing = useLocation().pathname.includes('/edit');
	const periods = ['1週間', '1ヶ月間', '1年間'];
	const types = ['棒グラフ', '折れ線グラフ', '円グラフ'];
	const sizes = [{ name: '1/1', img: '/images/layout_full.png' }, { name: '1/2', img: '/images/layout_half.png' }, { name: '1/4', img: '/images/layout_quarter.png' }]
	const mergedQuestions = [...questionnaires, ...originalQuestions];

	useEffect(() => {
		const fetch = async () => {
			getDefaultSegments(setQuestionnaires);
			const preOriginalQuestions = await getQuestionnaires(setOriginalQuestions)
			console.log(preOriginalQuestions);
			const typeOneQuestions = preOriginalQuestions.filter(v => v.type === 1)
			typeOneQuestions.forEach((v, k) => {
				setXlabels(prev => [...prev, { label: v.questionTitle, value: `questionnaireId-${v.id}` }])
			})
			console.log(preOriginalQuestions)
			if (isEditing) {
				getReport(id).then(response => {
					const report = response.data;
					setData({ name: report.name, period: report.period, xlabel: report.xlabel, type: report.type, size: report.size });
					setTitle(report.name);
					setSearchTerms(JSON.parse(report.search_json ?? {}));
				})
			}
		}
		fetch();
	}, []);

	const handleChange = (e) => {
		console.log(e.target);
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
		setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	}

	const handleSave = () => {
		data.searchTerms = searchTerms
		if (isEditing) {
			updateReport(id, data).then(response => {
				Swal.fire('保存成功', `${data.name}レポートの保存に成功しました`, 'success');
			}).catch(error => {
				console.error(error);
				if (error.response.status === 422) {
					setErrors(error.response.data);
				}
			})
			return;
		}
		storeReport(data).then(response => {
			Swal.fire('保存成功', `${data.name}レポートの保存に成功しました`, 'success');
			history.push(Paths.EditReport.path.replace(':id', response.data.id))
		}).catch(error => {
			console.log(error.response);
			if (error.response.status === 422) {
				setErrors(error.response.data.errors);
			}
		});
	}

	return (
		<>
			{/* <Button onClick={() => console.log(data)} />
			<Button onClick={() => console.log(searchTerms)} />
			<Button onClick={() => console.log(questionnaires)} />
			<Button onClick={() => console.log(xlabels)} /> */}
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
						<Card.Body disabled>
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
							{mergedQuestions.map((v, k) =>
								<SegmentCard {...v} key={k} questionnaireType="even" handleChange={handleChange} handleChangeForRange={handleChangeForRange} handleChangeTags={handleChangeTags} searchTerms={searchTerms} />
							)}
						</Card.Body>
					</Card>
				</Col>
				<Col>
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
							<h5 className="mb-0 fw-bolder">サイズ設定</h5>
						</Card.Header>
						<Card.Body>
							{sizes.map((v, k) =>
								<div className="mb-3" key={`size-${k}`}>
									<Form.Check
										name={'size'}
										id={`size-${k}`}
										className='d-flex'
									>
										<Form.Check.Input className="my-auto" type='radio' name={'size'}  
										checked={data.size == k + 1}
										onChange={handleDataChange}
										value={k + 1}
										/>
										<Form.Check.Label className="mb-0 ms-3">
											{/* {v.name} */}
											<Image className=" d-block" src={v.img} />
										</Form.Check.Label>
									</Form.Check>
								</div>
							)}
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
									label={v.label}
									name={'xlabel'}
									id={`xlabel-${k}`}
									value={v.value}
									checked={data.xlabel == v.value}
									onChange={handleDataChange}
								/>
							)}
						</Card.Body>
					</Card>
					{data.xlabel == 1 &&
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
						</Card>}

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