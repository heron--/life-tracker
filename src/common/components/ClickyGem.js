import React from 'react';
import styled from 'styled-components';
import Color from 'color';


const Gem = styled.button`
    background-color: ${props => props.color.hex()};
    border-width: ${props => props.borderWidth};
    border-style: solid;
    border-top-color: ${props => props.color.darken(0.5).hex()};
    border-right-color: ${props => props.color.darken(0.6).hex()};
    border-left-color: ${props => props.color.darken(0.3).hex()};
    border-bottom-color: ${props => props.color.darken(0.4).hex()};
    height: ${props => props.size};
    width: ${props => props.size};
    color: #fff;
    display: inline-flex;
    align-item: center;
    justify-content: center;

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
    const size = props.size || '100px';
    const borderWidth = props.borderWidth || '10px';

    return (
        <Gem
            onClick={props.onClick}
            color={props.reverse ? activeColor : color}
            activeColor={props.reverse ? color : activeColor}
            size={size}
            borderWidth={borderWidth}
        >{props.children}</Gem>
    );
}
