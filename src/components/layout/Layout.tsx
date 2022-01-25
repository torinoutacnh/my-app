import TopNav from "./navbar/TopNav";

import { Container, Row, Col } from 'react-bootstrap'
import Footer from "./footer/Footer";

import './Layout.css'

function Layout(props: any) {
    return (
        <div className="layout-background">
            <TopNav />
            <Container >
            
                        {/* <div style = {{marginLeft: '110px',marginTop: '80px'}}> */}
                        {props.children}
                        {/* </div>            */}
            
            </Container>
            <Footer />
        </div>
    )
}

export default Layout;