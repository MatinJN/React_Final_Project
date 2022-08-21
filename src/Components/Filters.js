import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./style.css";

const Filters = () => {
    const {
        prodState: { byStock, byFastDelivery, byRating, sort },
        prdDispatch,
    } = CartState();
    console.log(byStock, byFastDelivery, byRating, sort);
    return (
        <div className="filters">
            <span className="title">Filter Products</span>
            <span>
                <Form.Check
                    inline
                    label="Ascending"
                    name="group1"
                    type="radio"
                    id={"inline-1"}
                    onChange={() =>
                        prdDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "lowToHigh"
                        })
                    }
                    checked={sort === "lowToHigh" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Descending"
                    name="group1"
                    type="radio"
                    id={"inline-2"}
                    onChange={() =>
                        prdDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "highToLow"
                        })
                    }
                    checked={sort === "highToLow" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Incloud Out of Stock"
                    name="group1"
                    type="checkbox"
                    id={"inline-3"}
                    onChange={() =>
                        prdDispatch({
                            type: "SORT_BY_STOCK",
                        })
                    }
                    checked={byStock}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Fast Delivery Only"
                    name="group1"
                    type="checkbox"
                    id={"inline-4"}
                    onChange={() =>
                        prdDispatch({
                            type: "SORT_BY_DELIVERY",
                        })
                    }
                    checked={byFastDelivery}
                />
            </span>
            <span>
                <label style={{ paddingRight: 10 }}>Raiting</label>
                <Rating
                    rating={byRating}
                    style={{ cursor: "pointer" }}
                    onClick={(i) =>
                        prdDispatch({
                            type: "SORT_BY_RATING",
                            payload: i + 1,
                        })
                    }
                />
            </span>
            <Button
                variant="light"
                onClick={() =>
                    prdDispatch({
                        type: "CLEAR_FILTERS"
                    })}
            >Clear Fillters
            </Button>
        </div>
    );
};

export default Filters;
