import Accordion from 'react-bootstrap/Accordion';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { getCollections } from '../actions/user';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import '../css/items.css';

const ItemsPage = () => {
    const [collections, setCollections] = useState([]);
    const { collectionName } = useParams(); 
    console.log(collectionName)
    const selectedItem = collections.find((item) => item.name === collectionName);

    useEffect(() => {
        const fetchCollections = async () => {
          try {
            const response = await getCollections();
            setCollections(response['collections']); 
          } catch (error) {
            console.log(error);
          }
        };
        fetchCollections();
      }, []);

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

    return ( 
        <div className='items-block'>
            {selectedItem && (
                <div>
            <h2>{selectedItem.name}</h2>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b>Description</b></Accordion.Header>
                    <Accordion.Body>
                        {selectedItem.description}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><b>Theme</b></Accordion.Header>
                    <Accordion.Body>
                    {selectedItem.theme && selectedItem.theme.name}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br></br>
            <ButtonGroup aria-label="Basic example" className='user-buttons'>
                <Button variant="success" onClick={handleShow}>Create</Button>
                <Button variant="danger">Delete</Button>
                <Button variant="primary">Edit</Button>
            </ButtonGroup>
            <Table striped bordered hover variant='secondary'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>


            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an item</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Tags</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

            </div> )}
        </div> 
    );
}
 
export default ItemsPage;