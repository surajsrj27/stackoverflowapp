import React, { useState, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { signout, isAuthenticated } from "./auth/index";

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/"><h3><i className="stack overflow icon" style={{color: '#f77205'}}></i>StackOverflow</h3></NavbarBrand> 
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/community"><h3>Community</h3></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/profile"><h3>Profile</h3></NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        {!isAuthenticated() && (
                            <Fragment>
                                <NavItem>
                                    <NavLink href="/signin"><h3>Signin</h3></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/signup"><h3>Signup</h3></NavLink>
                                </NavItem>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <Fragment>
                                <NavItem>
                                    <NavLink href="/" onClick={() => {signout(() => {})}} className="text-warning"><h3>Signout</h3></NavLink>
                                </NavItem> 
                            </Fragment>  
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
}

export default AppNavbar;