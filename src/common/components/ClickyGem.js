import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const defaultBorderWidth = '10px';


const Gem = styled.button`
    background-color: ${props => props.color.hex()};
    border-width: ${defaultBorderWidth};
    border-style: solid;
    border-top-color: ${props => props.color.darken(0.5).hex()};
    border-right-color: ${props => props.color.darken(0.6).hex()};
    border-left-color: ${props => props.color.darken(0.3).hex()};
    border-bottom-color: ${props => props.color.darken(0.4).hex()};
    height: 100px;
    width: 100px;

    &:active {
        background-color: ${props => props.activeColor.hex()};
        border-top-color: ${props => props.activeColor.darken(0.5).hex()};
        border-right-color: ${props => props.activeColor.darken(0.6).hex()};
        border-left-color: ${props => props.activeColor.darken(0.3).hex()};
        border-bottom-color: ${props => props.activeColor.darken(0.4).hex()};
    }
`;

export default function ClickyGem(props) {
    const color = Color(props.color || '#96fbff');
    const activeColor = Color(props.activeColor || '#ffb711');

    return <Gem onClick={props.onClick} color={color} activeColor={activeColor} />;
}
