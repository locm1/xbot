import { Card, Table, Image, Dropdown } from "react-bootstrap";

export const PrivilegeProductTable = (props) => {
  const TableRow = (props) => {
    const { name, image } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={image} className="image-small rounded-circle me-2" />
            <div><span className="h6">{name}</span></div>
          </Card.Link>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="shadow">
      <Card.Body>
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0 rounded-start">特典</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {props.products.map(product => <TableRow key={`product-${product.id}`} {...product} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};