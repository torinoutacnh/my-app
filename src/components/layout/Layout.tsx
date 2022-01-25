import TopNav from "./navbar/TopNav";

import { Container, Row, Col } from 'react-bootstrap'
import Footer from "./footer/Footer";

import './Layout.css'

function Layout(props: any) {
    return (
        <div className="layout-background">
            <TopNav />
            <Container className="layout-content" >
                {props.children}
            </Container>
            <Footer />
        </div>
    )
}

export default Layout;