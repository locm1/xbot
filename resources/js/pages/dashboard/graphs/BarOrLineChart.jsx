import { useState } from "react";
import ApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";

export default (props) => {
	const { id, data, name, period, title, type, xlabel, className } = props;
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
	const [series, setSeries] = useState([
		{
			name: name,
			data: data.map(item => item[1])
		}
	]);

	return (
		<Card className={className}>
			<Card.Body className="d-flex flex-row align-items-center justify-content-between flex-0 border-bottom">
				<div>
					<h2 className="fs-3 fw-extrabold">
						{title}
					</h2>
				</div>
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
	)
}