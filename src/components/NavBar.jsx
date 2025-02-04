import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './NavBar.module.css';

function NavBar() {
    return (
        <Navbar
            expand='lg'
            className={`bg-body-tertiary ${styles.NavBar} `}
            fixed='top'
        >
            <Container fluid>
                <Navbar.Brand href='#'>MP App</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav
                        className='ms-auto my-2 my-lg-0'
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Profiles</Nav.Link>
                        <NavDropdown
                            title='Link'
                            id='navbarScrollingDropdown'
                        >
                            <NavDropdown.Item>Action</NavDropdown.Item>
                            <NavDropdown.Item>Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className='d-flex'>
                        <Form.Control
                            type='search'
                            placeholder='Search'
                            className='me-2'
                            aria-label='Search'
                        />
                        <Button variant='outline-success'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
