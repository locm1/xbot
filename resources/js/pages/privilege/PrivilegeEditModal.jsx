import { PrivilegeProductTable } from "@/pages/privilege/PrivilegeProductTable";

export const PrivilegeEditModal = (props) => {
  const { id: visitTimes, products = [] } = props;
  const [title, setTitle] = useState(props.title ?? "");
  const [comment, setComment] = useState("");
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onChange = () => {
    const payload = { listId, cardId, title };

    if (title !== props.title) {
      props.onChange && props.onChange(payload);
    }

    toggleIsTitleEditable();
  };

  const onEditMembers = () => {
    props.onEditMembers && props.onEditMembers(props);
  };

  const onEditLabels = () => {
    props.onEditLabels && props.onEditLabels(props);
  };

  const onArchive = () => {
    props.onArchive && props.onArchive({ cardId, listId });
  };

  const onMove = () => {
    props.onMove && props.onMove({ listId, index });
  };

  return (
    <Modal as={Modal.Dialog} centered size="lg" show={show} onHide={onHide}>
      <Form className="modal-content p-lg-3">
        <Modal.Header className="align-items-start border-bottom">
          <div className="d-block">
            {isTitleEditable ? (
              <Form.Group id="title" className="mb-3">
                <Form.Control
                  required
                  autoFocus
                  value={visitTimes}
                  className="text-gray-900 fs-5 fw-bold border-0 px-1 py-0 m-0"
                />
              </Form.Group>
            ) : (
              <h5 className="text-gray-900 fs-5 fw-bold py-1 ps-1 mb-3" onClick={toggleIsTitleEditable}>
                {title}
              </h5>
            )}

            {/* <div className="d-flex">
              <div className="d-block me-3 me-sm-4">
                <h5 className="fs-6 fw-bold text-gray-500">Members</h5>
                <div className="d-flex align-items-center">
                  {members.map(m => <KanbanAvatar key={`kanban-avatar-${m.id}`}  {...m} />)}

                  <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center px-3 ms-1" onClick={onEditMembers}>
                    <PlusIcon className="icon icon-xs" />
                  </Button>
                </div>
              </div>
            </div> */}
          </div>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="py-4">
          <Row>
            <Col xs={12} lg={9}>
              <Row className="mb-4 mb-lg-0">
                <PrivilegeProductTable products={products} />
              </Row>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-top">
          <Button variant="gray-800" className="me-2 text-start">
            <SelectorIcon className="icon icon-xs me-2" />
            変更
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};