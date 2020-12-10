import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCourseDetails } from "../actions/courseActions";

const CourseScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, error, course } = courseDetails;

  useEffect(() => {
    dispatch(listCourseDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <h2 className="mx-auto m-4 text-uppercase">{course.name}</h2>
          </Row>
          <Row>
            <Col className="p-3" md={3}>
              <Image src={course.image} alt={course.name} fluid></Image>
            </Col>

            <Col className="p-3" md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <p>Length: {course.length}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Location: {course.location}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Description: {course.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Date: {course.date}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup varient="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${course.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {course.slotsInStock > 0
                          ? "Slots Available"
                          : "No Slots Available"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {course.slotsInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(course.slotsInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={course.slotsInStock === 0}
                    >
                      Add Course To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CourseScreen;
