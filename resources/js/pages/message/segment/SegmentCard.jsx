import { Button, Card, Col, Form, InputGroup } from "react-bootstrap"
import CheckboxButton from "@/components/CheckboxButton";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';
import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS
import { useState } from "react";

export default (props) => {
  const {questionTitle, type, questionnaireItems, handleChange, handleChangeForRange, id, handleChangeTags, isDefault, displayOrder, searchTerms} = props;  
  const flatpickerOptions = {
    locale: 'ja',
  }
  const baseTagifySettings = {
    blacklist: ["xxx", "yyy", "zzz"],
    maxTags: 4,
    backspace: "edit",
    placeholder: "最大４つまで設定することができます",
  }
  const [tags, setTags] = useState([]);

  switch (type) {
    case 1:
      return (
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">{questionTitle}</h5>
              {questionnaireItems.map((v, k) => (
                <CheckboxButton checked={searchTerms[v.name] ? searchTerms[v.name].some(b => b == v.value) ? true : false : false} isDefault={isDefault} type={type} name={v.name} id={v.label} segmentid={id} value={v.value} title={v.label} key={`questionnaire-item-${k}`} change={handleChange} /> 
              ))}
            </Card.Body>
          </Card>
        </Col>
      )
      break;
    case 2:
      return (
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">{questionTitle}</h5>
              <Form>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control name={questionnaireItems[0].name} value={searchTerms[questionnaireItems[0].name] ?? ""} data-segmentid={id} type="number" onChange={handleChangeForRange} />
                    <InputGroup.Text>〜</InputGroup.Text>
                    <Form.Control name={questionnaireItems[1].name} value={searchTerms[questionnaireItems[1].name] ?? ""} data-segmentid={id} type="number" onChange={handleChangeForRange} />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      )
      break;
    case 3:
      return (
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">{questionTitle}</h5>
              <Form>
                <InputGroup>
                <Flatpickr
                    options={ flatpickerOptions }
                    onChange={(_, __, instance) => handleChangeForRange(instance.element)}
                    render={(props, ref) => {
                      return (
                        <>
                          <InputGroup.Text>
                            <CalendarIcon className="icon icon-xs" />
                          </InputGroup.Text>
                          <Form.Control
                            data-time_24hr
                            required
                            type="text"
                            placeholder="YYYY-MM-DD"
                            onChange={(_, __, instance) => handleChangeForRange(instance.element)}
                            value={questionnaireItems[0].value ?? ''}
                            name={questionnaireItems[0].name}
                            ref={ref}
                          />
                          <InputGroup.Text>〜</InputGroup.Text>
                        </>
                      );
                    }}
                  />
                  <Flatpickr
                      options={ flatpickerOptions }
                      onChange={(_, __, instance) => handleChangeForRange(instance.element)}
                      render={(props, ref) => {
                        return (
                          <>
                            <Form.Control
                              data-time_24hr
                              required
                              type="text"
                              placeholder="YYYY-MM-DD"
                              onChange={(_, __, instance) => handleChangeForRange(instance.element)}
                              value={questionnaireItems[1].value ?? ''}
                              name={questionnaireItems[1].name}
                              ref={ref}
                            />
                          </>
                        );
                      }}
                    />
                  </InputGroup>
                </Form>
            </Card.Body>
          </Card>
        </Col>
      )
      break;
      case 4:
        return (
          <Col md={12} className="mb-4">
            <Card>
              <Card.Body>
                <h5 className="mb-4">{questionTitle}</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Tags
                      settings={baseTagifySettings} // tagify settings object
                      value={searchTerms[questionnaireItems.name] ?? ""}
                      onChange={handleChange}
                      className={`w-100`}
                      name={questionnaireItems.name}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )
        break;
    default:
      return (
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">error</h5>
            </Card.Body>
          </Card>
        </Col>
      )
      break;
  }
}