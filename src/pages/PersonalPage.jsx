import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth, getCollections } from '../actions/user';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { InputGroup, Modal, ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../css/personalPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { createCollection, getThemes } from '../actions/user';
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector(state => state.user.role);
    const currentUser = useSelector(state => state.user.currentUser);
    const userId = currentUser ? currentUser.id : null;
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [theme, setTheme] = useState('');
    const [themes, setThemeNames] = useState([]);
    const [ids, setThemeIds] = useState([]);
    const [selectedThemeId ,setSelectedThemeId] = useState('');
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
          const { ids, names } = await getThemes();
          setThemeIds(ids);
          setThemeNames(names);
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
          setCollections(response['collections']); 
        } catch (error) {
          console.log(error);
        }
      };
      fetchCollections();
    }, []);

    const handleCreateCollection = async () => {
      try {
        const selectedTheme = { _id: selectedThemeId, name: theme };
        const additionalFieldsArray = Object.entries(additionalFields).map(([fieldName, fieldType]) => ({
          [fieldName]: {
            type: fieldType,
            required: true, 
          },
        }));
        await createCollection(name, description, selectedTheme, userId, additionalFieldsArray);
        setShowModal(false);
        setName('');
        setDescription('');
        setTheme('');
        setAdditionalFields([]);
        const response = await getCollections();
        setCollections(response['collections']); 
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
      const selectedTheme = e;
      setTheme(selectedTheme);
      const selectedIndex = themes.indexOf(selectedTheme);
      const selectedThemeId = ids[selectedIndex];
      setSelectedThemeId(selectedThemeId);
    }

    const handleAddAdditionalFields = (e) => {
      e.preventDefault();
      setAdditionalFields({...additionalFields, [fieldName]: fieldType});
    }

    const handleCollectionClick = (collectionName) => {
      navigate(`/collections/${collectionName}`);
    };

    return ( 
    <div className='personal-page-main'>
        <ToastContainer />
        <h5 className='personal-page-title'>Hello, {role}</h5>
        {(role === 'admin') && <Link to="/users">Go to users table</Link>}
        <h2 className='personal-page-collections'>Your collections</h2>
        <ButtonGroup aria-label="Basic example" className='user-buttons'>
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>Create</Button>
          <Button variant="outline-primary">Edit</Button>
          <Button variant="outline-danger">Delete</Button>
        </ButtonGroup>
        <ListGroup as="ol" numbered>
          {collections.map((collection) => (
            (role === 'admin' || collection.userId === userId) ? (
              <ListGroup.Item
                className='personal-page-main__li'
                onClick={() => handleCollectionClick(collection.name)}
                key={collection._id} >
                {collection.name}
              </ListGroup.Item>
            ) : null
          ))}
        </ListGroup>

        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)} 
          className='personal-page__modal'>
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
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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