import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getCollections, getItems } from "../actions/user";
import { useEffect, useState } from "react";
import '../css/home.css'

const Home = () => {
    const [items, setItems] = useState([]);
    const [collections, setCollections] = useState([]);

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

    const lastFiveItems = items.slice(Math.max(items.length - 5, 0));

    return ( 
    <div className="home">
      <h4 className="home__title">Welcome</h4>
      <p>On this website you can look at different users' collections and items.</p>
      <h5>Here are a list of recently added items:</h5>
      <ListGroup as="ol">
        {lastFiveItems.map(item => (
          <ListGroupItem>{item.name} from <span className="home__li-collection">{collections.map(id => id._id === item.collectionId ? (id.name) : null )}</span></ListGroupItem>
        ))}
      </ListGroup>
    </div> );
}
 
export default Home;