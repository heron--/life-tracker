import React from 'react';
import styled from 'styled-components';
import { ClickyGem } from '../../common/components/';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    max-width: 340px;
`;

export default function GemGrid(props) {
    return (
        <Grid>
            {
                [...(new Array(9)).keys()].map(i => (
                    <ClickyGem
                        key={i}
                        value={i}
                        onClick={() => props.addToCurrentOrder(i)}
                    />
                ))
            }
        </Grid>
    )
}
