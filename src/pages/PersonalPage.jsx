import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth, getCollections } from '../actions/user';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FormLabel, InputGroup, Modal, ListGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../css/personalPage.css';
import { Link } from 'react-router-dom';
import { createCollection, getThemes } from '../actions/user';
import Dropdown from 'react-bootstrap/Dropdown';
import { getCurrentUserId } from '../reducers/userReducer';

const PersonalPage = () => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.user.role);
    const userId = useSelector(getCurrentUserId);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [theme, setTheme] = useState('');
    const [themes, setThemes] = useState([]);
    const [collections, setCollections] = useState([]);
    const [additionalFields, setAdditionalFields] = useState({});
    const [fieldType, setFieldType] = useState('');
    const [fieldUserName, setFieldUserName] = useState([]);
    const [fieldName, setFieldName] = useState('');

    useEffect(() => {
        dispatch(auth());
    }, []);

    useEffect(() => {
      const fetchThemes = async () => {
        try {
          const response = await getThemes();
          setThemes(response); 
        } catch (error) {
          console.log(error);
        }
      };
      fetchThemes();
    }, []);

    useEffect(() => {
      const fetchCollections = async () => {
        try {
          const response = await getCollections();
          console.log(response)
          setCollections(response['collections']); 
        } catch (error) {
          console.log(error);
        }
      };
      fetchCollections();
    }, []);

    const handleCreateCollection = async () => {
      try {
        // const selectedThemeId = themes.find((theme) => theme.name === setTheme)?._id;
        const selectedThemeId = themes.find((theme) => theme.name === theme)?.id;
        await createCollection(name, description, selectedThemeId, userId, additionalFields);
        setShowModal(false);
        setName('');
        setDescription('');
        setTheme('');
        setAdditionalFields([]);
      } catch (e) {
        console.log('Failed to create collection:', e)
      }
    };
    

    const handleTypeField = (e) => {
      const selectedType = e.currentTarget.dataset.type;
      setFieldType(selectedType);
      setFieldUserName([...fieldUserName, e.target.textContent]);
    };

    const handleNameField = (e) => {
      setFieldName(e);
    }

    const handleTheme = (e) => {
      setTheme(e)
    }

    const handleAddAdditionalFields = (e) => {
      e.preventDefault();
      setAdditionalFields({...additionalFields, [fieldName]: fieldType});
    }

    return ( 
    <div className='personal-page-main'>
        <h5 className='personal-page-title'>Hello, {role}</h5>
        {(role === 'admin') && <Link to="/users">Go to users table</Link>}
        <h2 className='personal-page-collections'>Collections</h2>
        <ButtonGroup aria-label="Basic example" className='user-buttons'>
          <Button variant="success" onClick={() => setShowModal(true)}>Create</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="primary">Edit</Button>
        </ButtonGroup>
        {/* <Table striped bordered hover variant='secondary'>
          <thead>
            <tr>
              <th><Form.Check /></th>
              <th>Name</th>
              <th>Description</th>
              <th>Theme</th>
            </tr>
          </thead>
          <tbody>
          {collections.map(collection => (
            <tr key={collection.id}>
              <td>
                <Form.Check />
              </td>
              <td><Link>{collection.name}</Link></td>
            </tr>
          ))}
          </tbody>
        </Table> */}

      <ListGroup as="ol" numbered>
        {collections.map(collection => (
          <ListGroup.Item><Link>{collection.name}</Link></ListGroup.Item>
        ))}
      </ListGroup>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
               </Form.Group>
               <Form.Group controlId="formTheme">
                <Form.Label>Theme</Form.Label>
                <Form.Control as="select" onChange={(e) => handleTheme(e.target.value)}>
                <option value="">Choose theme</option>
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
               </Form.Control>
                </Form.Group>

              <Dropdown className='personal-page__dropdown'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Add additional fields
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item data-type="integer" onClick={handleTypeField}>Integer</Dropdown.Item>
                  <Dropdown.Item data-type="string" onClick={handleTypeField}>Text</Dropdown.Item>
                  <Dropdown.Item data-type="longString" onClick={handleTypeField}>Multiline text</Dropdown.Item>
                  <Dropdown.Item data-type="boolean" onClick={handleTypeField}>Radio buttons</Dropdown.Item>
                  <Dropdown.Item data-type="date" onClick={handleTypeField}>Date</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


              {fieldUserName.map((fieldUserName, index) => ( 
                
                <div key={index}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                      {fieldUserName}
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder='Enter field name'
                      onChange={(e) => handleNameField(e.target.value)}
                    />
                    <Button 
                      variant="info"
                      onClick={(e) => handleAddAdditionalFields(e)}
                      >
                      Add
                    </Button>
                  </InputGroup>
                </div> 
                ))}

{/* {console.log(additionalFields)} */}

            

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleCreateCollection}>Create</Button>
          </Modal.Footer>
        </Modal>
    </div>
    );
}
 
export default PersonalPage;