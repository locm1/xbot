
import React, { useState, useEffect } from "react";
import { Col, Row, Card } from 'react-bootstrap';
import ApexChart from "react-apexcharts";

export default (props) => {
  const { labels, series, colors, title } = props;
  const optionsPieChart = {
    // theme: {
    //   monochrome: {
    //     enabled: true,
    //     color: '#31316A',
    //   }
    // },
    colors: colors,
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      fillSeriesColor: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter',
      },
      y: {
        formatter: function (val) {
          return val + "人"
        }
      }
    },
  };

  return (
    <>
      <Card border="0" className="shadow">
        <Card.Header className="border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">{title}</h2>
        </Card.Header>
        <Card.Body>
          <ApexChart
            type="pie"
            height={360}
            series={series}
            options={optionsPieChart}
          />
        </Card.Body>
      </Card>
    </>
  );
};
