import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Row, Button, Container, Breadcrumb, Form, Card } from "react-bootstrap";

import KANBAN_LISTS from "@/data/kanban";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";

import { Paths } from "@/paths";
import segments from "@/data/segments";
import SegmentList from "@/pages/message/segment/Segments";
import SegmentCard from "@/pages/message/segment/SegmentCard";
import MessageDetail from "@/pages/message/MessageDetail";
import { SegmentCardCreateModal } from "@/pages/message/segment/SegmentCardCreateModal";
import { getQuestionnaires, storeQuestionnaire, updateQuestionnaire, deleteQuestionnaire, sortQuestionnaire } from "@/pages/questionnaire/api/QuestionnaireApiMethods";



// const questionnaires = [
//   {
//     type: 1,
//     questionTitle: 'questionTitle1',
//     questionnaireItems: [
//       {name: 'name1', value: '0'},
//       {name: 'name2', value: '1'},
//       {name: 'name3', value: '0'},
//     ]
//   },
//   {
//     type: 2,
//     questionTitle: 'questionTitle2',
//     questionnaireItems: [
//       {name: 'name1', value: '10'},
//       {name: 'name2', value: '30'},
//     ]
//   },
//   {
//     type: 3,
//     questionTitle: 'questionTitle3',
//     questionnaireItems: [
//       {name: 'name1', value: '2023-1-1'},
//       {name: 'name2', value: '2023-3-1'},
//     ]
//   },
// ]



const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary me-3",
    cancelButton: "btn btn-gray"
  },
  buttonsStyling: false
}));

export default () => {
  const [definedQuestion, setDefinedQuestion] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);

  const evenQuestionnaires = [];
  const oddQuestionnaires = [];
  questionnaires.forEach((v,k) => {
    if (k & 1) {
      oddQuestionnaires.push(v);
    } else {
      evenQuestionnaires.push(v);
    }
  })

  const changeTemplate = () => {
    
  }
  useEffect(() => {
    axios.get('/api/v1/management/default-segments')
    .then((response) => {
      const segments = response.data.segments;
      const newSegments = [];
      segments.forEach(v => {
        if (v.type == 1) {
          newSegments.push({
            id: v.id, type: v.type, questionTitle: v.name, 
            questionnaireItems: v.default_segment_items.map((item => ({name: item.name, value: 0})))
          });
        } else {
          newSegments.push({
            id: v.id, type: v.type, questionTitle: v.name, 
            questionnaireItems: [{name: 'start_' + v.name, value:''}, {name: 'end_' + v.name, value:''}]
          });
        }
      });
      setQuestionnaires(newSegments);
    })
    .catch(error => {
        console.error(error);
    });
    getQuestionnaires(setDefinedQuestion);
    
  }, [])

  const handleChange = (e) => {
    const newQuestionnaires = questionnaires.map((v, k) => {
      if (v.id == e.currentTarget.getAttribute('data-segmentid')) {
        return ({
          id: v.id,
          type: v.type,
          questionTitle: v.questionTitle,
          questionnaireItems: [
            ...v.questionnaireItems.map(b => {
              if (b.name == e.target.name) {
                return {name: b.name, value: e.target.value};
              } else {
                return {...b}
              }
            })
          ]
        })
      } else {
        return {...v};
      }
    })
    setQuestionnaires(newQuestionnaires);
  }

  const handleChangeForRange = (e) => {
    // console.log(e.target.value)
    // console.log(e.currentTarget.getAttribute('data-segmentid'))
    // console.log(e.target.name)
    const newQuestionnaires = questionnaires.map((v, k) => {
      if (v.id == e.currentTarget.getAttribute('data-segmentid')) {
        return ({
          id: v.id,
          type: v.type,
          questionTitle: v.questionTitle,
          questionnaireItems: [
            ...v.questionnaireItems.map(b => {
              if (b.name == e.target.name) {
                return {name: b.name, value: e.target.value};
              } else {
                return {...b}
              }
            })
          ]
        })
      } else {
        return {...v};
      }
    })
    setQuestionnaires(newQuestionnaires);
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">セグメント配信</h1>
          <Button onClick={() => {console.log(definedQuestion)}} />
        </div>
      </div>
      <Row>
        <Col xs={6} xl={6}>
        <div className="btn-group target-count-wrap" role="group" aria-label="Basic radio toggle button group">
          <div className="btn btn-primary d-flex pe-none align-items-center">キーワード選択</div>
            <div className="btn btn-outline-primary pe-none bg-white">該当人数
            <div className="fs-4 people-wrap d-inline"> <span className="people text-primary" id="people">28</span> </div>人 
          </div>
        </div>
        </Col>
        <Col xs={6} xl={6}>
          <div className="justify-content-end d-flex">
            <Form.Select className="w-50 h-50" onChange={() => changeTemplate(e)}>
              <option defaultValue>セグメント条件を選択</option>
              <option value={1}>セグメント条件1</option>
              <option value={2}>セグメント条件2</option>
              <option value={3}>セグメント条件3</option>
            </Form.Select>
          </div>
          <div className="justify-content-end d-flex mt-2">
            <Button variant="tertiary" className="mt-2 w-50">
              セグメント条件を保存する
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className="mt-4">
            {evenQuestionnaires.map((v, k) => <SegmentCard {...v} key={k} handleChange={handleChange} handleChangeForRange={handleChangeForRange} />)}
          </Row>
        </Col>
        <Col>
          <Row className="mt-4">
            {oddQuestionnaires.map((v, k) => <SegmentCard {...v} key={k} handleChange={handleChange} handleChangeForRange={handleChangeForRange} />)}
          </Row>
        </Col>
      </Row>
      
      <MessageDetail />

      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button href={Paths.Users.path} variant="gray-800" className="mt-2 animate-up-2 w-50 me-3">
          ユーザーID抽出
        </Button>
        <Button href={Paths.Users.path} variant="gray-800" className="mt-2 animate-up-2 w-50 ms-3">
          配信する
        </Button>
      </div>
    </>
  );
};
