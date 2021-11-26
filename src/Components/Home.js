import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Card, Button, Container, Carousel, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const client = axios.create({
    baseURL: "http://localhost:3001/products"
})
export default function Home() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    const [cat, setCat] = useState('all')
    const [selected, setSelected] = useState(null)
    const [show, setShow] = useState(false)
    const search = useRef(null);
    useEffect(() => {
        client.get()
            .then(res => { setProducts(res.data) })
    }, [])
    const display = () => {
        let check = false;
        products.map(val => {
            if (search.current.value == val.pname) {
                setSelected(val)
                setShow(true);
                check = true;
            }
        }
        )
        if (!check) {
            alert('item not found')
        }

    }
    if (sessionStorage.getItem('user') == undefined) {
        navigate('/')
    }
    return (
        <div>
            <h1>ShoPy <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/03/16/4p1W6RcD97vSfBswLFMaonix/abandoned_cart/images/icon_shopping_cart.gif" style={{ height: "80px", width: "80px", borderRadius: "50%" }} /></h1>

            <Container>
                <Row className="mx-0 my-4">
                    <Button as={Col} variant="info" className='me-2 catbtn' onClick={() => { setCat('all') }}>All</Button>
                    <Button as={Col} variant="info" className='me-2 catbtn' onClick={() => { setCat('shoe') }}>Shoe</Button>
                    <Button as={Col} variant="info" className='me-2 catbtn' onClick={() => { setCat('watch') }}>Watch</Button>
                    <Button as={Col} variant="info" className='me-2 catbtn' onClick={() => { setCat('ring') }}>rings</Button>
                    <Button as={Col} variant="info" className="catbtn" onClick={() => { setCat('cap') }}>Cap</Button>
                    <Button as={Col} variant="danger" className="catbtn" onClick={() => { navigate('/') }}>Log Out</Button>
                </Row>
                <Row>
                    <Col md={11}>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="xyz"
                                ref={search}
                            />
                            <label>search</label>
                        </Form.Floating></Col>
                    <Button as={Col} variant="info" onClick={() => display()} style={{ height: "58px" }}><svg style={{ margin: "12px auto" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg></Button>
                </Row>
            </Container>
            <Container>

                <Row className="g-3">
                    {products.map((val, i) => {
                        if (cat == val.category) {
                            return (<Col md={4} xs={6} key={val.pname}>
                                <Card className="bg1" style={{ height: "320px" }}>
                                    <Card.Img variant="top" className="d-block w-80 mx-auto"
                                        src={val.img1}
                                        height="250px"
                                        onMouseOver={e => (e.currentTarget.src = val.img2)}
                                        onMouseOut={e => (e.currentTarget.src = val.img1)}
                                    />


                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: " 'Bebas Neue', cursive", fontWeight: "bolder" }}>{val.pname}<Button className="wbtn">{val.price}</Button></Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            )
                        }
                        if (cat == 'all') {
                            return (<Col md={4} xs={6} key={val.pname}>
                                <Card className={i % 2 ? "bg1" : "bg2"} style={{ height: "320px" }}>
                                    <Card.Img variant="top" className="d-block w-80 mx-auto"
                                        src={val.img1}
                                        height="250px"
                                        onMouseOver={e => (e.currentTarget.src = val.img2)}
                                        onMouseOut={e => (e.currentTarget.src = val.img1)}
                                    />

                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: " 'Bebas Neue', cursive", fontWeight: "bolder", color: "black" }}>{val.pname}<Button className="wbtn">{val.price}</Button></Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            )
                        }
                    }
                    )}
                </Row>
            </Container>
            {selected && selected.pname && <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selected.pname}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Carousel className="mx-auto w-50">
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-80 mx-auto"
                                src={`${selected.img1}`}
                                height="250px"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100"
                                src={`${selected.img2}`}
                                height="250px"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <Button variant="info" className="text-white" size="lg">buy at {selected.price}</Button>
                </Modal.Body>
            </Modal>}

        </div >
    )
}

{/* <Carousel>
                                        <Carousel.Item interval={1000}>
                                            <img
                                                className="d-block w-80 mx-auto"
                                                src={`${val.img1}`}
                                                height="250px"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item interval={1000}>
                                            <img
                                                className="d-block w-100"
                                                src={`${val.img2}`}
                                                height="250px"
                                            />
                                        </Carousel.Item>
                                    </Carousel> */}