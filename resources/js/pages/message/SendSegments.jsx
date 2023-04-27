import React, { useState, useEffect, useContext } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Row, Button, Container, Breadcrumb, Form, Card } from "react-bootstrap";

import { Paths } from "@/paths";
import segments from "@/data/segments";
import SegmentList from "@/pages/message/segment/Segments";
import SegmentCard from "@/pages/message/segment/SegmentCard";
import MessageDetail from "./MessageDetail";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { SegmentCardCreateModal } from "@/pages/message/segment/SegmentCardCreateModal";
import { getQuestionnaires, storeQuestionnaire, updateQuestionnaire, deleteQuestionnaire, sortQuestionnaire } from "@/pages/questionnaire/api/QuestionnaireApiMethods";
import { UsersTable } from "@/pages/user/UsersTable";
import { getUsers, getDemographic, deleteUser } from "@/pages/user/api/UserApiMethods";
import {SendSegmentUserCard} from "./segment/SendSegmentUserCard"
import { calculateAge } from "../../components/common/CalculateAge";
import { getAllMessages, sendMulticastMessage } from "@/pages/message/api/MessageApiMethods";
import { CSVLink } from "react-csv";
import { LoadingContext } from "@/components/LoadingContext";

export default () => {
  const location = useLocation();
  const [isRendered, setIsrendered] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);
  const [definedQuestion, setDefinedQuestion] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchResultUsers, setSearchResultUsers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [segmentTemplates, setSegmentTemplates] = useState([]);
  const [segmentTemplateOption, setSegmentTemplateOption] = useState("0");
  const [templates, setTemplates] = useState([]);
  const [timing, setTiming] = useState(0);
  const [sendDate, setSendDate] = useState();
  const [selectTemplate, setSelectTemplate] = useState();

  const evenQuestionnaires = [];
  const oddQuestionnaires = [];

  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const hour = ("0" + now.getHours()).slice(-2);
  const minute = ("0" + now.getMinutes()).slice(-2);
  const dateTime = year + month + day + hour + minute;

  const csvDLUsers = searchResultUsers.map(v => v.isSelected == true ? [v.line_id] : undefined).filter(v => v);

  const handleSendButtonClick = () => {
    Swal.fire({
      icon: 'question',
      title: '本当に配信してもよろしいですか？',
      confirmButtonText: '配信する',
      showCancelButton: true,
      cancelButtonText: 'キャンセル'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const userIds = searchResultUsers.map(v => v.isSelected == true ? v.id : undefined).filter(v => v);
        const userLineIds = searchResultUsers.map(v => v.isSelected == true ? v.line_id : undefined).filter(v => v);
        const data = {
          "userIds": userIds,
          "userLineIds": userLineIds,
          "templateId": selectTemplate,
          "timing": timing,
          "sendDate": sendDate,
          "searchTerms": searchTerms,
        }
        const errorMessages = validation(data);
        if (errorMessages.length > 0) {
          let formatErrMsg = '';
          errorMessages.forEach(v => formatErrMsg += v + '<br>');
          Swal.fire(
            `エラー`,
            formatErrMsg,
            'error'
          )
        } else {
          setIsLoading(true);
          sendMulticastMessage(data).then(() => setIsLoading(false));
        }
      }
    })
  }

  const validation = (data) => {
    let error = [];
    data.userLineIds.length === 0 && error.push('ユーザーが選択されていません');
    data.templateId == undefined && error.push('メッセージテンプレートが選択されていません');
    data.timing == undefined && error.push('配信タイミングが選択されていません');
    if (data.timing == 1) data.sendDate == undefined && error.push('配信日時が選択されていません');
    return error;
  }

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary me-3",
      cancelButton: "btn btn-gray-100"
    },
    buttonsStyling: false
  }));

  //奇数と偶数でディスプレイ表示を分ける
  questionnaires.forEach((v,k) => {
    if (v.displayOrder & 1) {
      oddQuestionnaires.push(v);
    } else {
      evenQuestionnaires.push(v);
    }
  })

  const showConfirmModal = async (e, id) => {
    if (segmentTemplateOption == 0) {
      const textMessage = "保存するテンプレート名を入力してください";

      const result = await SwalWithBootstrapButtons.fire({
        icon: "question",
        text: textMessage,
        html: <div className="mb-2 p-2">
                {textMessage}
                <Form.Control className="m-1" id="segment-template" />
              </div>,
        showCancelButton: true,
        confirmButtonText: "保存",
        cancelButtonText: "キャンセル",
        preConfirm: () => {
          const templateName = Swal.getPopup().querySelector('#segment-template').value
          if (!templateName) {
            Swal.showValidationMessage(`Please enter login and password`)
          }
          return { templateName }
        }
      })

      if (result.isConfirmed) {
        await axios.post(`/api/v1/management/segment-template`, {'name': result.value.templateName, 'search_terms_json': searchTerms})
        .then((response) => {
          Swal.fire(
            '保存完了',
            `テンプレート名「${result.value.templateName}」を保存しました`,
            'success'
          )
          setSegmentTemplates(prev => {
            prev.push(response.data.segmentTemplate);
            return prev;
          });
          setSegmentTemplateOption(response.data.segmentTemplate.id);
        })
        .catch(error => {
          console.error(error);
          Swal.fire(
            'エラー',
            `テンプレート名「${result.value.templateName}」を保存できませんでした`,
            'error'
          )
        });
      }
    } else {
      const segmentTemplate = segmentTemplates.find(v => v.id == segmentTemplateOption);
      const textMessage = `テンプレート名「${segmentTemplate.name}」を上書きしますか？`;

      const result = await SwalWithBootstrapButtons.fire({
        icon: "question",
        text: textMessage,
        showCancelButton: true,
        confirmButtonText: "上書き",
        cancelButtonText: "キャンセル",
      })

      if (result.isConfirmed) {
        await axios.put(`/api/v1/management/segment-template/${segmentTemplate.id}`, {'search_terms_json': searchTerms})
        .then((response) => {
          Swal.fire(
            '上書き完了',
            `テンプレート名「${segmentTemplate.name}」を上書きしました`,
            'success'
          )
          const newSegmentTemplates = response.data.segmentTemplate.map(u => ({ ...u }));
          setSegmentTemplates(newSegmentTemplates);
        })
        .catch(error => {
          console.error(error);
          Swal.fire(
            'エラー',
            `テンプレート名「${segmentTemplate.name}」を上書きできませんでした`,
            'error'
          )
        });
      }
    }
  };


  useEffect(() => {
    const params = {
      params: {count: 'all'}
    };

    getAllMessages(params, setTemplates);
    axios.get('/api/v1/management/default-segments')
    .then((response) => {
      const segments = response.data.segments;
      const newSegments = [];
      segments.forEach(v => {
        if (v.type == 1) {
          newSegments.push({
            id: v.id, displayOrder: v.display_order, type: v.type, questionTitle: v.title, isDefault: 1,
            questionnaireItems: v.default_segment_items.map((item, k) => ({id: k + 1, name: v.name, value: item.value, label: item.label}))
          });
        } else if (v.type == 4) {
          newSegments.push({
            id: v.id, displayOrder: v.display_order, type: v.type, questionTitle: v.title, isDefault: 1,
            questionnaireItems: {value: [] ,name: v.name,}
          });
        } else {
          newSegments.push({
            id: v.id, displayOrder: v.display_order, type: v.type, questionTitle: v.title, isDefault: 1,
            questionnaireItems: [{name: 'start_' + v.name, value:''}, {name: 'end_' + v.name, value:''}]
          });
        }
      });
      let maxDisplayOrder = newSegments[newSegments.length - 1].id;
      getQuestionnaires(setDefinedQuestion)
      .then((res) => {
        res.forEach(v => {
          if (v.questionnaire_items.length == 0) {
            return;
          } else
          {maxDisplayOrder++;
          if (v.type == 1 || v.type == 2) {
            newSegments.push({
              id: v.id,
              displayOrder: maxDisplayOrder,
              isDefault: 0,
              type: 4,
              questionTitle: v.title,
              questionnaireItems: 
                {id: 1, name: 'questionnaireId-' + v.id, label: v.questionnaire_items[0].name, value: ''}
            })
          } else {
            newSegments.push({
              id: v.id,
              displayOrder: maxDisplayOrder,
              isDefault: 0,
              type: 1,
              questionTitle: v.title,
              questionnaireItems: 
                v.questionnaire_items.map((b, k) => ({id: b.id, name: 'questionnaireId-' + b.id, label: b.name, value: ''}))
            })
          }}
        })
        setQuestionnaires(newSegments);
        // getUsers(setUsers)
        axios.get('/api/v1/management/user-with-questionnaires')
        .then((response) => {
          const newUsers = response.data.users.map(u => ({ ...u, isSelected: false, show: true }));
          setUsers(newUsers);
          setSearchResultUsers(newUsers);
        })
        .catch(error => {
            console.error(error);
        });
        axios.get('/api/v1/management/segment-template')
        .then((response) => {
          const newSegmentTemplates = response.data.segmentTemplate.map(u => ({ ...u }));
          setSegmentTemplates(newSegmentTemplates);
          console.log(newSegmentTemplates);

          //  別画面から、セグメント条件が渡されていたら
          if (typeof location.state !== "undefined") {
            const selectSegmentTemplate = newSegmentTemplates.find(v => _.isEqual(v.search_terms_json, location.state.segmentTemplate));
            console.log(selectSegmentTemplate);
            typeof selectSegmentTemplate !== "undefined" && setSearchTerms(selectSegmentTemplate.search_terms_json);
          } 

          setIsrendered(true);
        })
        .catch(error => {
            console.error(error);
        });
      });
    })
    .catch(error => {
        console.error(error);
    })
  }, [])

  useEffect(() => {
    let results = users;
    Object.entries(searchTerms).forEach(([name, terms]) => {
      if (terms.length > 0) {
        results = results.filter((user) => {
          return terms.some((term) => {
            // user[name].includes(term)
            if (name === 'gender') {
              return user.gender == term;
            } else if (name === 'birth_date') {
              const d = new Date(user.birth_date);
              return Number(d.getMonth() + 1) === Number(term);
            } else if (name === 'prefecture') {
              return user.prefecture === term;
            } else if (name === 'start_age') {
              if (user.birth_date) {
                const birthday = new Date(user.birth_date);
                const age = calculateAge(birthday);
                return age >= Number(term);
              } else {
                return false;
              }
            } else if (name === 'end_age') {
              if (user.birth_date) {
                const birthday = new Date(user.birth_date);
                const age = calculateAge(birthday);
                return age <= Number(term);
              } else {
                return false;
              }
            } else if (name === 'start_visit_count') {
              if (user.visitor_histories) {
                return user.visitor_histories.length >= Number(term);
              } else {
                return false;
              }
            } else if (name === 'end_visit_count') {
              if (user.visitor_histories) {
                return user.visitor_histories.length <= Number(term);
              } else {
                return false;
              }
            } else if (name === 'start_buy_count') {
              if (user.order_histories) {
                return user.order_histories.length >= Number(term);
              } else {
                return false;
              }
            } else if (name === 'end_buy_count') {
              if (user.order_histories) {
                return user.order_histories.length <= Number(term);
              } else {
                return false;
              }
            } else if (name === 'start_last_visit_date') {
              if (user.visitor_histories.length !== 0) {
                const latestHistory = user.visitor_histories.reduce((prev, current) => {
                  return new Date(prev.created_at) > new Date(current.created_at) ? prev : current;
                });
                const visitLastDate = new Date(latestHistory.created_at);
                const inputDate = new Date(term);
                return visitLastDate >= inputDate;
              } else {
                return false;
              }
            } else if (name === 'end_last_visit_date') {
              if (user.visitor_histories.length !== 0) {
                const latestHistory = user.visitor_histories.reduce((prev, current) => {
                  return new Date(prev.created_at) > new Date(current.created_at) ? prev : current;
                });
                const visitLastDate = new Date(latestHistory.created_at);
                const inputDate = new Date(term);
                return visitLastDate <= inputDate;
              } else {
                return false;
              }
            } else if (name === 'residence') {
              if (user.city) {
                return user.city.indexOf(term) !== -1;
              } else {
                return false;
              }
            } else {
              const matchResult = name.match(/\d+/);
              const questionnaireId = matchResult ? matchResult[0] : null;
              const obj = questionnaires.find(questionnaire => questionnaire.id == questionnaireId);
              const type = obj ? obj.type : null;
              return user.questionnaire_answers.some(v => {
                if (v.questionnaire_id == questionnaireId) {
                  return v.questionnaire_answer_items.some(b => {
                    if (type == 1) {
                      return b.answer == term;
                    } else {
                      return b.answer.indexOf(term) !== -1;
                    }
                  })
                } else {
                  return false;
                }
              })
            }
          });
        });
      }
      setSearchResultUsers(results);
    });
  }, [searchTerms])

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
          return ({...prev});
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
        return {...v};
      }
    })
    setQuestionnaires(newQuestionnaires);
  }

  const handleChangeSegmentTemplate = (e) => {
    setSegmentTemplateOption(e.target.value);
    if (e.target.value != 0) {
      const selectSegmentTemplate = segmentTemplates.find(v => v.id == e.target.value);
      setSearchTerms(selectSegmentTemplate.search_terms_json);
    }
  }

  const deleteSegmentTemplate = async () => {
    const segmentTemplate = segmentTemplates.find(v => v.id == segmentTemplateOption);
    const textMessage = `テンプレート名「${segmentTemplate.name}」を削除しますか？`;
    const title = "削除確認";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "question",
      title: title,
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル",
    });

    if (result.isConfirmed) {
      await axios.delete(`/api/v1/management/segment-template/${segmentTemplate.id}`)
        .then((response) => {
          Swal.fire(
            '削除完了',
            `テンプレート名「${segmentTemplate.name}」を削除しました`,
            'success'
          )
          setSegmentTemplates(prev => (prev.filter(v => v.id != segmentTemplate.id)));
          setSegmentTemplateOption('0');
        })
        .catch(error => {
          console.error(error);
          Swal.fire(
            'エラー',
            `テンプレート名「${segmentTemplate.name}」を削除できませんでした`,
            'error'
          )
        });
    };
  }

  return isRendered ? (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">セグメント配信</h1>
          {/* <Button onClick={() => {console.log(templates)}} /> */}
          {/* <Button onClick={() => {console.log(users)}} /> */}
          {/* <Button onClick={() => {console.log(searchResultUsers)}} /> */}
          {/* <Button onClick={() => {console.log(sendDate)}} /> */}
          {/* <Button onClick={() => {console.log(segmentTemplates)}} />
          <Button onClick={() => {console.log(segmentTemplateOption)}} /> */}
        </div>
      </div>
      <Row>
        <Col xs={6} xl={6}>
        <div className="btn-group target-count-wrap" role="group" aria-label="Basic radio toggle button group">
          <div className="btn btn-primary d-flex pe-none align-items-center text-white">キーワード選択</div>
            <div className="btn btn-outline-primary pe-none bg-white">該当人数
            <div className="fs-4 people-wrap d-inline"> <span className="people text-primary" id="people">{searchResultUsers.length}</span> </div>人 
          </div>
        </div>
        </Col>
        <Col xs={3} xl={3}>
        </Col>
        <Col xs={3} xl={3}>
          <div className=" justify-content-between d-flex">
            <Form.Select value={segmentTemplateOption} className="h-50 w-75" onChange={handleChangeSegmentTemplate}>
              <option value="0">テンプレート選択</option>
              {segmentTemplates.map(v => (
                <option value={v.id} key={`template-${v.id}`}>{v.name}</option>
              ))}
            </Form.Select>
            {segmentTemplateOption == 0 ? <Button variant="danger" className="" disabled onClick={deleteSegmentTemplate}>削除</Button> 
                                        : <Button variant="danger" className="" onClick={deleteSegmentTemplate}>削除</Button>}
          </div>
          <div className="justify-content-end d-flex mt-2">
            <Button variant="primary" className="mt-2 w-100" onClick={showConfirmModal}>
              セグメント条件を保存する
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className="mt-4">
            {oddQuestionnaires.map((v, k) => 
              <SegmentCard {...v} key={k} questionnaireType="odd" handleChange={handleChange} handleChangeForRange={handleChangeForRange} handleChangeTags={handleChangeTags} searchTerms={searchTerms}
            />)}
          </Row>
        </Col>
        <Col>
          <Row className="mt-4">
            {evenQuestionnaires.map((v, k) => 
              <SegmentCard {...v} key={k} questionnaireType="even" handleChange={handleChange} handleChangeForRange={handleChangeForRange} handleChangeTags={handleChangeTags} searchTerms={searchTerms}/>
            )}
          </Row>
        </Col>
      </Row>
        <SendSegmentUserCard
          users={searchResultUsers}
          setUsers={setSearchResultUsers}
        />
      <MessageDetail
        templates={templates}
        timing={timing}
        setTiming={setTiming}
        sendDate={sendDate}
        setSendDate={setSendDate}
        selectTemplate={selectTemplate}
        setSelectTemplate={setSelectTemplate}
      />

      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <CSVLink filename={`data-${dateTime}.csv`} 
        data={searchResultUsers.map(v => v.isSelected == true ? [v.line_id] : undefined).filter(v => v)}
        className={`btn btn-primary mt-2 w-50 me-3 ${csvDLUsers.length > 0 ? '' : 'disabled'}`}>
          ユーザーID抽出
        </CSVLink>
        {/* <Button variant="primary" className="mt-2 w-50 me-3">
          ユーザーID抽出
        </Button> */}
        <Button variant="primary" className="mt-2 w-50 ms-3" onClick={handleSendButtonClick}>
          {timing == 0 ? '配信する' : '予約する'}
        </Button>
      </div>
    </>
  ) : (
    <></>
  );
};
