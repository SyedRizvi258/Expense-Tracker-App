import React from 'react';
import styled from 'styled-components';

/*
    This is a reusable button component that accepts the following props:
    name: the name of the button
    icon: the icon of the button
    onClick: the function to be executed when the button is clicked
    bg: the background color of the button
    bPad: the padding of the button
    color: the color of the button
    bRad: the border radius of the button
*/
function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color
        }} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;

export default Button;