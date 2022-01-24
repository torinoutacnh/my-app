import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { Endpoints } from '../../Endpoint';

import './Nav.css';

export default function TopNav() {
    return (
        <Navbar style={{ backgroundColor: '#5800FF', fontWeight: 'bolder', fontSize: 20 }} expand="md" sticky='top'>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://react-bootstrap.github.io/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {Endpoints.map((endpoint, index) => {
                            return (
                                <Nav.Link style={{ color: '#EEEEEE' }} key={index} href={endpoint.path}>{endpoint.name}</Nav.Link>
                            )
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
            </Container>
        </Navbar>
    )
}