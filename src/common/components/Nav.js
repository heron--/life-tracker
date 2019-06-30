import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavItems = styled.ul`
    list-style: none;
`;

const StyledListItem = styled.li`
    display: inline-block;
`;

const StyledLink = styled(Link)`
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: 1.4;
`;

function Nav(props) {
    return (
        <nav>
            <NavItems>
                {
                    props.routes.map(route => (
                        <StyledListItem key={route.path}>
                            <StyledLink to={route.path}>{route.display}</StyledLink>
                        </StyledListItem>
                    ))
                }
            </NavItems>
        </nav>
    );
}

export default Nav;
