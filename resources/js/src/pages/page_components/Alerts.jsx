
import React from 'react';
import { BellIcon, SpeakerphoneIcon } from "@heroicons/react/solid";
import { Col, Row, Alert, Button, Container } from 'react-bootstrap';

import Documentation from "@/components/Documentation";

export default () => {
  return (
    <article>
      <Container className="px-0">
        <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
          <Col className="d-block mb-4 mb-md-0">
            <h1 className="h2">Alerts</h1>
            <p className="mb-0">
              Use alerts to provide contextual feedback to your users based on their input and behaviour.
            </p>
          </Col>
        </Row>

        <Documentation
          title="Example"
          description={
            <p>The <code>&#x3C;Alert&#x3E;</code> component can be used to show your users error, success, informational or warning messages. Use component properties such as  <code>variant="primary</code> or <code>variant="secondary"</code> to use the colors from the Sass variables:</p>
          }
          scope={{ Alert }}
          imports={`import { Alert } from 'react-bootstrap';`}
          example={`<React.Fragment>
  <Alert variant="primary">
    A simple primary alert — check it out!
  </Alert>
  <Alert variant="secondary">
    A simple secondary alert — check it out!
  </Alert>
  <Alert variant="success">
    A simple success alert — check it out!
  </Alert>
  <Alert variant="danger">
    A simple danger alert — check it out!
  </Alert>
  <Alert variant="warning">
    A simple warning alert — check it out!
  </Alert>
  <Alert variant="info">
    A simple info alert — check it out!
  </Alert>
  <Alert variant="gray-50">
    A simple light alert — check it out!
  </Alert>
  <Alert variant="gray-800">
    A simple dark alert — check it out!
  </Alert>
</React.Fragment>`}
        />

        <Documentation
          title="Dismissable alerts"
          description={
            <p>The <code>&#x3C;Alert&#x3E;</code> component can be used to create an alert component that can be closed by clicking on the close icon by adding the <code>show</code> and <code>onClose</code> properties. Additionally, you can also use the <code>&#x3C;FontAwesomeIcon&#x3E;</code> component to add an icon inside the alert component.</p>
          }
          scope={{ Alert, Button, SpeakerphoneIcon }}
          imports={`import { Alert, Button } from 'react-bootstrap';
import { SpeakerphoneIcon } from "@heroicons/react/solid";`}
          example={`function DismissableAlerts() {
  const [hiddenAlerts, setHiddenAlerts] = React.useState([]);

  const onClose = (alertId) => {
    const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
    setHiddenAlerts(hiddenAlertsUpdated);
  };

  const shouldShowAlert = (alertId) => (
    hiddenAlerts.indexOf(alertId) === -1
  );

  return(
    <React.Fragment>
      <Alert
        variant="primary"
        show={shouldShowAlert("primary")}
        onClose={() => onClose("primary")}>

        <div className="d-flex justify-content-between">
          <div>
            <SpeakerphoneIcon className="icon icon-xs me-1" />
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <Button variant="close" size="sm" onClick={() => onClose("primary")} />
        </div>
      </Alert>

      <Alert
        variant="secondary"
        show={shouldShowAlert("secondary")}
        onClose={() => onClose("secondary")}>

        <div className="d-flex justify-content-between">
          <div>
            <SpeakerphoneIcon className="icon icon-xs me-1" />
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <Button variant="close" size="sm" onClick={() => onClose("secondary")} />
        </div>
      </Alert>
      
      <Alert
        variant="danger"
        show={shouldShowAlert("danger")}
        onClose={() => onClose("danger")}>

        <div className="d-flex justify-content-between">
          <div>
            <SpeakerphoneIcon className="icon icon-xs me-1" />
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <Button variant="close" size="sm" onClick={() => onClose("danger")} />
        </div>
      </Alert>

      <Alert
        variant="success"
        show={shouldShowAlert("success")}
        onClose={() => onClose("success")}>

        <div className="d-flex justify-content-between">
          <div>
            <SpeakerphoneIcon className="icon icon-xs me-1" />
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <Button variant="close" size="sm" onClick={() => onClose("success")} />
        </div>
      </Alert>

      <Alert
        variant="warning"
        show={shouldShowAlert("warning")}
        onClose={() => onClose("warning")}>

        <div className="d-flex justify-content-between">
          <div>
            <SpeakerphoneIcon className="icon icon-xs me-1" />
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <Button variant="close" size="sm" onClick={() => onClose("warning")} />
        </div>
      </Alert>

      <Alert
        variant="gray-50"
        show={shouldShowAlert("light")}
        onClose={() => onClose("light")}>

        <div className="d-flex justify-content-between">
          <div>
            <SpeakerphoneIcon className="icon icon-xs me-1" />
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <Button variant="close" size="sm" onClick={() => onClose("light")} />
        </div>
      </Alert>

      <Alert
        variant="gray-800"
        show={shouldShowAlert("dark")}
        onClose={() => onClose("dark")}>

        <div className="d-flex justify-content-between">
          <div>
            <SpeakerphoneIcon className="icon icon-xs me-1" />
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <Button variant="close" size="sm" onClick={() => onClose("dark")} />
        </div>
      </Alert>
    </React.Fragment>
  );
}

render( <DismissableAlerts /> );`}
        />

        <Documentation
          title="Alerts with extra content"
          description={
            <p>The following <code>&#x3C;Alert&#x3E;</code> components are useful when you want to give more information and context to your users:</p>
          }
          scope={{ Alert, BellIcon }}
          imports={`import { Alert } from 'react-bootstrap';
import { BellIcon } from "@heroicons/react/solid";`}
          example={`<React.Fragment>
  <Alert variant="primary">
    <Alert.Heading className="d-flex align-items-center mt-2">
      <BellIcon className="icon icon-md me-2" />
      Well done!
    </Alert.Heading>

    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr />
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </Alert>

  <Alert variant="info">
    <Alert.Heading className="d-flex align-items-center mt-2">
      <BellIcon className="icon icon-md me-2" />
      Heads up!
    </Alert.Heading>

    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr />
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </Alert>

  <Alert variant="warning">
    <Alert.Heading className="d-flex align-items-center mt-2">
      <BellIcon className="icon icon-md me-2" />
      Warning!
    </Alert.Heading>

    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr />
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </Alert>

  <Alert variant="danger">
    <Alert.Heading className="d-flex align-items-center mt-2">
      <BellIcon className="icon icon-md me-2" />
      Danger!
    </Alert.Heading>

    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr />
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </Alert>

  <Alert variant="gray-50">
    <Alert.Heading className="d-flex align-items-center mt-2">
      <BellIcon className="icon icon-md me-2" />
      Light!
    </Alert.Heading>

    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr />
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </Alert>
</React.Fragment>`}
        />
      </Container>
    </article>
  );
};
