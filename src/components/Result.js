import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ResultDiv = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`;

const Price = styled.p`
    font-size: 30px;
    span {
        font-weight: bold;
    }
`;

const Result = ({ result }) => {
    if (Object.keys(result).length === 0) return null;

    return (
        <ResultDiv>
            <Price>
                The price is: <span>{result.PRICE}</span>
            </Price>
            <Info>
                Higher price: <span>{result.HIGHDAY}</span>
            </Info>
            <Info>
                Lower price: <span>{result.LOWDAY}</span>
            </Info>
            <Info>
                24 hour variation: <span>{result.CHANGEPCT24HOUR}</span>
            </Info>
            <Info>
                Last update: <span>{result.LASTUPDATE}</span>
            </Info>
        </ResultDiv>
    );
};

Result.propTypes = {
    result: PropTypes.object.isRequired,
};

export default Result;
