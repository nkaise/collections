import { ListGroup, ListGroupItem } from "react-bootstrap";
import '../css/home.css'

const Home = () => {
    return ( <div className="home">
    <h4 className="home__title">Welcome</h4>
    <p>On this website you can look at different users collections and items.</p>
    <h5>Here are a list of recently added items:</h5>
    <ListGroup as="ol">
        <ListGroupItem>First</ListGroupItem>
        <ListGroupItem>Second</ListGroupItem>
        <ListGroupItem>Third</ListGroupItem>
    </ListGroup>
    </div> );
}
 
export default Home;