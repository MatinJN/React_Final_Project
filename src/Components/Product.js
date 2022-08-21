import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const Product = ({ prd }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="product">
      <Card>
        <Card.Img variant="top" src={prd.image} alt={prd.name} />
        <Card.Body>
          <Card.Title>{prd.name}</Card.Title>
          <Card.Subtitle style={{ paddinBottom: 10 }}>
            <span>$ {prd.price}</span>
            {prd.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={prd.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prd.id) ? (
            <Button
            onClick={() => {
              dispatch({
                type:"REMOVE_FROM_CART",
                payload:prd,
              });
            }}
            
            variant="danger">Remove from cart</Button>
          ) : (
            <Button
            onClick={() => {
              dispatch({
                type:"ADD_TO_CART",
                payload:prd,
              });
            }}
              variant="primary"
              disabled={!prd.inStock}
            >
              {!prd.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
