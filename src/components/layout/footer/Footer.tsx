import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
    return (
        <Container fluid style={{ background: 'black', color: 'white', textAlign: 'center' }}>
            <Row lg={4} md={2}>
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