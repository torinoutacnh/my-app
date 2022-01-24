import { Col, Container, Row } from "react-bootstrap";

import './Footer.css'

export default function Footer() {
    return (
        <Container fluid className="footer-body">
            <Row md={4} sm={2}>
                <Col>
                    <p>hello</p>
                </Col>
                <Col>
                    <p>hello</p>
                </Col>
                <Col>
                    <p>hello</p>
                </Col>
                <Col>
                    <p>hello</p>
                </Col>
            </Row>
        </Container>
    )
}