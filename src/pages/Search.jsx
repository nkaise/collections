import Button from 'react-bootstrap/Button';
import '../css/search.css';

const Search = () => {
    return ( 
    <div className="search">
        <input type="text" className="form-control"></input>
        <Button variant="primary">Search</Button>
    </div> 
    );
}
 
export default Search;