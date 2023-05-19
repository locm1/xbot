
import React, { useState, useEffect } from "react";
import { CloudUploadIcon, CollectionIcon, FireIcon, PlusIcon, ShieldExclamationIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Button, Dropdown } from 'react-bootstrap';

import { CustomersWidget, RevenueWidget, UsersWidget, WeeklyReportWidget, LineGraphChartWidget, TeamMembersWidget, ProgressTrackWidget, EventsWidget, RankingWidget, VisitsMapWidget, SalesValueWidget, AcquisitionWidget, TimelineWidget } from "@/components/Widgets";
import { PageVisitsTable } from "@/components/Tables";
import { getReportUsers, getReportAnalysis, getDemographic, getReportAnalysisByOrderProducts, getReportData } from "@/pages/dashboard/api/DashboardApiMethods";
import PieChart from "@/pages/dashboard/PieChart";
import PrefectureWidget from "@/pages/dashboard/PrefectureWidget";
import BarChartWidget from "@/pages/dashboard/BarChartWidget";
import OrderProductsWidget from "@/pages/dashboard/OrderProductsWidget";
import moment from "moment-timezone";
import BarOrLineChart from "./graphs/BarOrLineChart";

export default () => {
  const [friendCount, setFriendCount] = useState();
  const [blockCount, setBlockCount] = useState();
  const [analyses, setAnalyses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [birthMonths, setBirthMonths] = useState([]);
  const [prefectures, setPrefectures] = useState([]);
  const [products, setProducts] = useState([{
    product_images: [{ image_path: '' }]
  }]);
  const [reportData, setReportData] = useState([]);
  const genderLabels = ['男性', '女性', 'その他', '無記入'];
  const colors = ['#0073a8', '#c82c55', '#00a968', '#f39800'];
  const date = new Date();
  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2)
  const day = ('00' + (date.getDate())).slice(-2)

  const getLastDayOfMonth = (date) => {
    const lastDate = new Date(date);
    lastDate.setDate(1);
    lastDate.setMonth(lastDate.getMonth() + 1);
    lastDate.setDate(0);
    return moment(lastDate.toLocaleDateString()).format("YYYY-MM-DD")
  };

  const getFirstDayOfMonth = (date) => {
    const lastDate = new Date(date);
    lastDate.setDate(1);
    return moment(lastDate.toLocaleDateString()).format("YYYY-MM-DD")
  };

  const params = {
    params: {
      begin_date: getFirstDayOfMonth(`${year}-${month}-${day}`),
      end_date: getLastDayOfMonth(`${year}-${month}-${day}`),
    }
  }
  const period = `${moment(params.params.begin_date).format("MM月DD日")} - ${moment(params.params.end_date).format("MM月DD日")}`

  useEffect(() => {
    getReportUsers(setFriendCount, setBlockCount, params);
    getReportAnalysis(setAnalyses);
    getDemographic(setGenders, setBirthMonths, setPrefectures)
    getReportAnalysisByOrderProducts(setProducts)
    getReportData().then(response => {
      console.log(response.data);
      setReportData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <>
      {reportData.map((v, k) =>
        <BarOrLineChart key={`chart-${k}`} {...v} className="my-3" />
      )}
      <div className="py-4">
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="gray-800" className="d-inline-flex align-items-center me-2">
            <PlusIcon className="icon icon-xs me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-start mt-2 py-1">
            <Dropdown.Item className="d-flex align-items-center">
              <UserAddIcon className="icon icon-xs text-gray-400 me-2" /> Add User
            </Dropdown.Item>
            <Dropdown.Item className="d-flex align-items-center">
              <CollectionIcon className="icon icon-xs text-gray-400 me-2" /> Add Widget
            </Dropdown.Item>
            <Dropdown.Item className="d-flex align-items-center">
              <CloudUploadIcon className="icon icon-xs text-gray-400 me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="d-flex align-items-center">
              <ShieldExclamationIcon className="icon icon-xs text-gray-400 me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider as="div" className="my-1" />

            <Dropdown.Item className="d-flex align-items-center">
              <FireIcon className="icon icon-xs text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="justify-content-lg-center">
        <Col xs={12} className="mb-4">
          {/* <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          /> */}
          <LineGraphChartWidget
            title="友達総数・ブロック数"
            data={analyses}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} xl={8} className="mb-4">
          <Row>
            <Col xs={12} sm={6} xl={6} className="mb-4">
              <UsersWidget
                category={`友達総数（${year}）`}
                title={friendCount}
                period={period}
                percentage={20}
              />
            </Col>
            <Col xs={12} sm={6} xl={6} className="mb-4">
              <CustomersWidget
                category={`ブロック数（${year}）`}
                title={blockCount}
                period={period}
                percentage={18.2}
              />
            </Col>
            <Col xs={12} xxl={12} className="mb-4">
              <PieChart title="性別" labels={genderLabels} series={genders} colors={colors} />
            </Col>
            <Col xs={12} xxl={12} className="mb-4">
              <BarChartWidget title="誕生月別" data={birthMonths} />
            </Col>
            <Col xs={12} xxl={12} className="mb-4">
              <OrderProductsWidget title="1ヶ月間での上位20件の売れ筋商品" products={products} />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} xl={4} className="mb-4">
          <PrefectureWidget prefectures={prefectures} />
        </Col>
      </Row>
    </>
  );
};
