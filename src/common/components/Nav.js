import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavItems = styled.ul`
    list-style: none;
`;

const StyledListItem = styled.li`
    display: inline-block;
    font-style: ${props => props.activeRoute ? 'italic' : 'normal'}
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
                        <StyledListItem key={route.path} activeRoute={route.path === props.location.pathname}>
                            <StyledLink
                                to={route.path}
                            >
                                {route.display}
                            </StyledLink>
                        </StyledListItem>
                    ))
                }
            </NavItems>
        </nav>
    );
}

export default withRouter(Nav);
