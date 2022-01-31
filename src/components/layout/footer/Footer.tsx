import { Col, Container, Row } from "react-bootstrap";

import './Footer.css'

export default function Footer() {
    return (
        <Container fluid className="footer-body text-center">
            <Row>
                <Col>
                    <img src="/logo_lg.png" alt="" />
                </Col>
                <Col className="text-left">
                    <h2 style={{ marginTop: 20 }}>Quick Links</h2>
                    <div style={{ fontSize: 15, lineHeight: 0.8 }}>
                        <p><a className="link-none" target={"_blank"} rel="noreferrer" href="https://fitnessvr.io/#About">About</a></p>
                        <p><a className="link-none" target={"_blank"} rel="noreferrer" href="https://fitnessvr.io/#Features">Features</a></p>
                        <p><a className="link-none" target={"_blank"} rel="noreferrer" href="https://fitnessvr.io/#Gameplay">Gameplay</a></p>
                        <p><a className="link-none" target={"_blank"} rel="noreferrer" href="https://fitnessvr.io/#Technologies">Technologies</a></p>
                        <p><a className="link-none" target={"_blank"} rel="noreferrer" href="https://fitnessvr.io/#Tokenomics">Tokenomics</a></p>
                        <p><a className="link-none" target={"_blank"} rel="noreferrer" href="https://fitnessvr.io/#Roadmap">Roadmap</a></p>
                    </div>
                </Col>
                <Col className="text-left">
                    <h2 style={{ marginTop: 20 }}>Social Media</h2>
                    <div style={{ fontSize: 15, lineHeight: 0.8 }}>
                        <a href="https://www.facebook.com/profile.php?id=100077198979967">
                            <img src="https://img.icons8.com/color/50/000000/facebook-new.png" alt="facebook" />
                        </a>
                        <a href="https://mobile.twitter.com/Fitnessvrio">
                            <img src="https://img.icons8.com/fluency/50/000000/stack-of-tweets.png" alt="tweeter" />
                        </a>
                        <a href="https://www.instagram.com/fitnessvr.io/">
                            <img src="https://img.icons8.com/plasticine/50/000000/instagram-new--v2.png" alt="instagram" />
                        </a>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}