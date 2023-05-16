import { Card, Col, Form, Row } from "react-bootstrap"
import CheckboxButton from "@/components/CheckboxButton";

export default () => {
	const xlabels = ['期間', '性別', '誕生月'];
	const types = ['棒グラフ', '折れ線グラフ', '円グラフ'];
	const terms = [{id: '1', title: '性別', questionnaires: {name: '男性', }}]

	return (
		<Row>
			<Col xs={8}>
				<Card className="mb-3">
					<Card.Header className="bg-primary text-white px-3 py-2">
						<h5 className="mb-0 fw-bolder">レポート名</h5>
					</Card.Header>
					<Card.Body>
						<Form.Control />
					</Card.Body>
				</Card>
				<Card className="mb-3">
					<Card.Header className="bg-primary text-white px-3 py-2">
						<h5 className="mb-0 fw-bolder">出力条件</h5>
					</Card.Header>
					<Card.Body>
						<div className="border-bottom py-3">
							<h5>性別</h5>
							<CheckboxButton />
						</div>
						<div className=" border-bottom py-3">
							<h5>性別</h5>
							<CheckboxButton />
						</div>
						<div className=" border-bottom py-3">
							<h5>性別</h5>
							<CheckboxButton />
						</div>
					</Card.Body>
				</Card>
			</Col>
			<Col>
				<Card className="mb-3">
					<Card.Header className="bg-primary text-white px-3 py-2">
						<h5 className="mb-0 fw-bolder">期間</h5>
					</Card.Header>
					<Card.Body>
							<Form.Check
								type='radio'
								label='全期間'
								name='period'
								id='period-1'
							/>
							<Form.Check
								type='radio'
								label='期間指定'
								name='period'
								id='period-1'
							/>
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
								key={`xlabel-${k}`}
								type='radio'
								label={v}
								name={'xlabel'}
								id={`xlabel-${k}`}
							/>
						)}
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}