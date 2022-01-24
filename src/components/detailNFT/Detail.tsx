import React, { FC } from "react";
import Table from 'react-bootstrap/Table'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

const Detail: FC = () => {
    return (
        <div>
            <Container style={{paddingTop: '50px'}}  >
                <Row>
                    <Col md={6}>
                        <img src="https://thobaymau.vn/images/hero/tho_gach.svg" />

                    </Col>
                    <Col md={6} >
                        <h2>Create by</h2>
                        <p>Đạt</p>
                        <Row md={1}>
                            <h5>Decription</h5>
                            <p>Text nha</p>
                        </Row>
                        <Row md={1} >
                            <h5>Traits</h5>
                            <Table >
                                <tr>
                                    <th>Hello</th>
                                    <th>Tui là ai</th>
                                </tr>
                                <tr>
                                    <td>Hello</td>
                                    <td>Tui là ai</td>
                                </tr>
                            </Table>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Col md={3}>
                        <Button style ={{width: '100%'}} >Buy</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Detail

