import { CartState } from "../context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import "./style.css";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prd) => (
            <ListGroup.Item key={prd.id}>
              <Row>
                <Col lg={2}>
                  <Image src={prd.image} alt={prd.name} fluid rounded />
                </Col>
                <Col lg={2}>
                  <span>{prd.name}</span>
                </Col>
                <Col lg={2}>{prd.price}</Col>
                <Col lg={2}>
                  <Rating rating={prd.ratings} />
                </Col>
                <Col lg={2}>
                  <Form.Control 
                  as="select"
                  value={prd.qty}
                  onChange={(e) => dispatch({
                    type:'CHANGE_CART_QTY',
                    payload:{
                      id:prd.id,
                      qty:e.target.value,
                    },
                  })}
                  >
                    {[...Array(prd.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col lg={2}>
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
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filterCart">
        <span className="title">Subtotal({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total{total} items
        </span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
