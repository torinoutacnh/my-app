import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { Endpoints } from '../../Endpoint';

import './Nav.css';

export default function TopNav() {
    return (
        <Navbar  style={{ backgroundColor: '#EDC7B7', fontWeight: 'bolder', fontSize: 20 }} expand="md" sticky='top'>
            <Container>
               <Nav> 
               <Navbar.Brand href="/">
                    <img
                        src="https://res.cloudinary.com/design123/image/upload/v1642135260/fboqwxpx15wf9p7hx9to.png"
                        width="100%"
                        height="50"
                        className="d-inline-block align-top"
                        alt="FitnessVR"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {Endpoints.map((endpoint, index) => {
                            if (endpoint.isNav) {
                                return (
                                    <Nav.Link style={{ color: 'Black', paddingLeft: '10px' }} key={index} href={endpoint.path}>{endpoint.name}</Nav.Link>
                                )
                            }
                            return null;
                        })}
                        {/* <NavDropdown title="Dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav className="justify-content-end" activeKey="/home">
                        <WalletMultiButton className='button-style' />
                    </Nav>
                </Navbar.Collapse>
               </Nav>
            </Container>
        </Navbar>
    )
}