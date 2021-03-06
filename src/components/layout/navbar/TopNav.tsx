import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import { Endpoints } from '../../Endpoint';

import './Nav.css';

export default function TopNav() {
    return (
        <Navbar className='nav-font-style' expand="md" sticky='top'>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="../text-logo.png"
                        width="200"
                        height="30"
                        className="d-inline-block align-top"
                        alt="FitnessVR"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="pills" className="me-auto">
                        {Endpoints.map((endpoint, index) => {
                            if (endpoint.isNav) {
                                return (
                                    <Link key={index} to={endpoint.path} className='link-none'>
                                        <span className='bg-nav-primary'>{endpoint.name}</span>
                                    </Link>
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
                    <Nav className="justify-content-end">
                        <WalletMultiButton className='button-style' />
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}