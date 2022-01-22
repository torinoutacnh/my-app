import TopNav from "./navbar/TopNav";

import { Container } from 'react-bootstrap'

function Layout(props: any) {
    return (
        <div>
            <TopNav />
            <Container fluid='md'>
                {props.children}
            </Container>
        </div>
    )
}

export default Layout;