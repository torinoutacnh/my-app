import TopNav from "./navbar/TopNav";

import { Container } from 'react-bootstrap'
import Footer from "./footer/Footer";

function Layout(props: any) {
    return (
        <div>
            <TopNav />
            <Container fluid='md'>
                {props.children}
            </Container>
            <Footer />
        </div>
    )
}

export default Layout;