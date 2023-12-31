import { useState } from "react";
import ApexChart from "react-apexcharts";
import { Button, Card, Col } from "react-bootstrap";
import { Paths } from "@/paths";
import { useHistory } from "react-router-dom";

export default (props) => {
	const { id, data, name, period, title, type, xlabel, size, className, terms } = props;
	const history = useHistory();
	const labels = xlabel == 1 ? {
		formatter: (timestamp) => {
			var date = new Date(timestamp);
			return date.getMonth() + 1 + '/' + date.getDate();
		}
	} : '';
	const [options, setOptions] = useState({
		chart: {
			id: id
		},
		labels: data.map(item => item[0]),
		colors: [
			'#DA93A6',
			'#CDC3D1',
			'#D6E1E9',
			'#D3B5BA',
			'#CA9886',
			'#D2C2BD',
			'#C2C2D9',
			'#E8DAD9',
			'#E0D49A',
			'#F2D896',
		],
		xaxis: {
			min: xlabel == 1 ? new Date(period[0]).getTime() : '',
			max: xlabel == 1 ? new Date(period[1]).getTime() : '',
			type: xlabel == 1 ? 'datetime' : 'category',
			categories: data.map(item => item[0]),
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return Math.round(value); // 小数点以下を切り捨てて整数にする
				}
			}
		}
	});
	const [series, setSeries] = useState(type != "pie" ? [
		{
			name: name,
			data: data.map(item => item[1]),
		}
	] : data.map(item => item[1]));

	console.log(options);
	const searchSegment = () => {
		history.push({
			pathname: Paths.SendSegments.path,
			state: { segmentTemplate: terms }
		});
	}

	const convertSizeValue = (val) => {
		switch (val) {
			case 1:
				return 12
			case 2:
				return 6
			case 3:
				return 3
			default:
				return 12
		}
	}

	return (
		<Col xs={convertSizeValue(size)}>
			<Card className={className}>
				<Card.Body className="d-flex flex-row align-items-center justify-content-between flex-0 border-bottom">
					<div className="">
						<h2 className="fs-3 fw-extrabold">
							{title}
						</h2>
					</div>
					<Button variant="outline-primary" onClick={searchSegment}>
						この条件で配信する
					</Button>
				</Card.Body>
				<Card.Body className="p-2 py-5">
					<ApexChart
						options={options}
						series={series}
						type={type}
						height="400"
					/>
				</Card.Body>
			</Card>
		</Col>
	)
}