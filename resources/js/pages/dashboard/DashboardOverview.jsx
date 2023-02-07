
import React, { useState, useEffect } from "react";
import { CloudUploadIcon, CollectionIcon, FireIcon, PlusIcon, ShieldExclamationIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Button, Dropdown } from 'react-bootstrap';

import { CustomersWidget, RevenueWidget, UsersWidget, WeeklyReportWidget, LineGraphChartWidget, TeamMembersWidget, ProgressTrackWidget, EventsWidget, RankingWidget, VisitsMapWidget, SalesValueWidget, AcquisitionWidget, TimelineWidget } from "@/components/Widgets";
import { PieChart } from "@/components/Charts";
import { PageVisitsTable } from "@/components/Tables";
import { trafficShares, trafficVolumes, pieChartTest } from "@/data/charts";

import { getReportUsers, getReportAnalysis } from "@/pages/dashboard/api/DashboardApiMethods";

export default () => {
  const [friendCount, setFriendCount] = useState();
  const [blockCount, setBlockCount] = useState();
  const [analyses, setAnalyses] = useState([]);

  const params = {
    params: {
      begin_date: '2023-01-29',
      end_date: '2023-01-31',
    }
  }

  const period = `${params.params.begin_date} - ${params.params.end_date}`

  useEffect(() => {
    getReportUsers(setFriendCount, setBlockCount, params);
    getReportAnalysis(setAnalyses);
    console.log(pieChartTest);
  }, []);

  return (
    <>
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
        <Col xs={12} sm={12} xl={4} className="mb-4">
          <UsersWidget
            category="友達総数"
            title={friendCount}
            period={period}
            percentage={20}
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CustomersWidget
            category="ブロック数"
            title={blockCount}
            period={period}
            percentage={18.2}
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          {/* <RevenueWidget
            category="Revenue"
            title="$43,594"
            period={period}
            percentage={-5.4}
          /> */}
        </Col>
      </Row>

      <Row>
        <Col xs={12} xxl={4} className="mb-4">
          {/* <WeeklyReportWidget
            headerTitle="Weekly Sales"
            headerSubtitle="28 Daily Avg."
            reportTitle="$456,678"
            reportSubtitle="Total Themesberg Sales"
          /> */}
        </Col>

        {/* <Col xs={12} md={6} xxl={4} className="mb-4">
          <TopAuthorsWidget title="Top Author Earnings" />
        </Col>

        <Col xs={12} md={6} xxl={4} className="mb-4">
          <TimelineWidget title="Notifications" />
        </Col> */}
      </Row>

      <Row>
        <Col xs={12} xl={7} xxl={8} className="mb-4">
          <Row>
            <Col xs={12} className="mb-4">
              <PageVisitsTable />
            </Col>

            <Col xs={12} xxl={6} className="mb-4">
              <TeamMembersWidget />
            </Col>

            <Col xs={12} xxl={6} className="mb-4">
              <ProgressTrackWidget />
            </Col>
          </Row>
        </Col>

        <Col xs={12} xl={5} xxl={4} className="mb-4">
          <Col xs={12} className="px-0 mb-4">
            <RankingWidget />
          </Col>

          <Col xs={12} className="px-0 mb-4">
            <AcquisitionWidget />
          </Col>

          <Col xs={12} className="px-0">
            <VisitsMapWidget />
          </Col>
        </Col>
      </Row>
    </>
  );
};
