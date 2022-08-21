import {
  Container,
  FormControl,
  Navbar,
  Nav,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";
import './style.css'

const Header = () => {
  const {
    state: { cart },
    dispatch,
    prdDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Sale Product</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            className="m-auto"
            style={{ width: 400 }}
            placeholder="Search a Product"
            onChange={(e) => 
            prdDispatch({
              type:"CLEAR_SEARCH",
              payload: e.target.value,
            })
            }
          />
        </Navbar.Text>
        <Nav>
          <Dropdown className='nav'>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 300}}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prd) => (
                    <span className="cartitem" key={prd.id}>
                      <img
                        className="cartItemImg"
                        src={prd.image}
                        alt={prd.name}
                      />
                      <div className="cartItem Detail">
                        <span>{prd.name}</span>
                        <span>{prd.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prd,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{width:'95px', margin:"0 10px"}}>Go To Cart</Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
