import Accordion from 'react-bootstrap/Accordion';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { createItem, getCollections, getItems } from '../actions/user';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import '../css/items.css';

const ItemsPage = () => {
    const [collections, setCollections] = useState([]);
    const { collectionName } = useParams(); 
    const selectedItem = collections.find((item) => item.name === collectionName);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [items, setItems] = useState([]);
    var collectionId;
    if (selectedItem) {collectionId = selectedItem._id};

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

    const handleEnterName = (e) => {
      setName(e)
    }

    const handleEnterTags = (e) => {
      setTags(e)
    }

    const handleCreateItem = async () => {
      const tagsArr = tags.split();
      try {
          await createItem(name, tagsArr, collectionId);
          setShow(false);
      } catch (e) {
          console.log(e)
      }
    }

    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await getItems();
          setItems(response['items']); 
        } catch (error) {
          console.log(error);
        }
      };
      fetchItems();
    }, []);

    return ( 
        <div className='items-block'>
            {selectedItem && (
              <div>
                <h2>{selectedItem.name}</h2>
                <Accordion defaultActiveKey="0" >
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
                  <Button variant="outline-success" onClick={handleShow}>Create</Button>
                  <Button variant="outline-primary">Edit</Button>
                  <Button variant="outline-danger">Delete</Button>
                </ButtonGroup>
                <Table striped bordered hover variant='secondary'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => ((collectionId === item.collectionId) &&
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.tags.map(tag => (tag))}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal show={show} onHide={handleClose} className='items-modal'>
                  <Modal.Header closeButton>
                    <Modal.Title>Create an item</Modal.Title>
                  </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={(e) => handleEnterName(e.target.value)}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control as="textarea" rows={3} onChange={(e) => handleEnterTags(e.target.value)} />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleCreateItem}>
                    Create
                  </Button>
                </Modal.Footer>
              </Modal>
            </div> 
            )}
        </div> 
    );
}
 
export default ItemsPage;