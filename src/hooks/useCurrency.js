import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
    font-family: "Bebas Neue", cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const SelectTag = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCurrency = (label, initialState, options) => {
    //custom hook state
    const [state, updateState] = useState(initialState);

    const Select = () => (
        <Fragment>
            <Label>{label}</Label>
            <SelectTag
                onChange={(e) => updateState(e.target.value)}
                value={state}
            >
                <option key="select" value="">
                    Select your currency
                </option>
                {options.map((option) => (
                    <option key={option.code} value={option.code}>
                        {option.name}
                    </option>
                ))}
            </SelectTag>
        </Fragment>
    );

    return [state, Select, updateState];
};

export default useCurrency;
