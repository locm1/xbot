import { Card, Col, Form, InputGroup } from "react-bootstrap"
import CheckboxButton from "@/components/CheckboxButton";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';

export default (props) => {
  const {questionTitle, type, questionnaireItems, handleChange, handleChangeForRange, id} = props;  
  const flatpickerOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setBirthDate(dateStr)
  }

  switch (type) {
    case 1:
      return (
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">{questionTitle}</h5>
              {questionnaireItems.map((v, k) => (
                v.value == 1 ? <CheckboxButton type={type} name={v.name} id={v.name} segmentid={id} value={0} title={v.name} key={`questionnaire-item-${k}`} checked={true} change={handleChange} />
                             : <CheckboxButton type={type} name={v.name} id={v.name} segmentid={id} value={1} title={v.name} key={`questionnaire-item-${k}`} checked={false} change={handleChange} /> 
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
                    <Form.Control name={questionnaireItems[0].name} value={questionnaireItems[0].value} data-segmentid={id} type="number" onChange={handleChangeForRange} />
                    <InputGroup.Text>〜</InputGroup.Text>
                    <Form.Control name={questionnaireItems[1].name} value={questionnaireItems[1].value} data-segmentid={id} type="number" onChange={handleChangeForRange} />
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
                    value={questionnaireItems[0].value ?? ''}
                    onChange={handleChangeForRange}
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
                            ref={ref}
                          />
                          <InputGroup.Text>〜</InputGroup.Text>
                        </>
                      );
                    }}
                  />
                  <Flatpickr
                      options={ flatpickerOptions }
                      value={questionnaireItems[1].value ?? ''}
                      onChange={handleChangeForRange}
                      render={(props, ref) => {
                        return (
                          <>
                            <Form.Control
                              data-time_24hr
                              required
                              type="text"
                              placeholder="YYYY-MM-DD"
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
    default:
      return (
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">{questionTitle}</h5>
              {questionnaireItems.map((v, k) => (
                v.value == 1 ? <CheckboxButton title={v.name} key={`questionnaire-item-${k}`} checked="true" />
                            : <CheckboxButton title={v.name} key={`questionnaire-item-${k}`} /> 
              ))}
            </Card.Body>
          </Card>
        </Col>
      )
      break;
  }
}