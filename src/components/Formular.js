import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Error from "./Error";
import useCurrency from "../hooks/useCurrency";
import useCryptocurrency from "../hooks/useCryptocurrency";
import PropTypes from "prop-types";

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #3fff;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formular = ({ addCurrency, addCryptocurrency }) => {
    const [cryptocurrencyList, addCryptocurrencyToList] = useState([]);
    const [error, addError] = useState(false);

    const COINS = [
        { code: "USD", name: "US Dollar" },
        { code: "MXN", name: "Mexican Peso" },
        { code: "EUR", name: "Euro" },
        { code: "GBP", name: "Pound" },
    ];

    const [currency, SelectCurrency] = useCurrency(
        "Choose your currency",
        "",
        COINS
    );

    const [cryptocurrency, SelectCryptocurrency] = useCryptocurrency(
        "Choose your Cryptocurrency",
        "",
        cryptocurrencyList
    );

    useEffect(() => {
        const callApi = async () => {
            const apiUrl = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const result = await axios.get(apiUrl);
            addCryptocurrencyToList(result.data.Data);
        };
        callApi();
    }, []);

    const getCryptocurrencyPrice = (e) => {
        e.preventDefault();

        if (currency === "" || cryptocurrency === "") {
            addError(true);
            return;
        }

        addError(false);

        addCurrency(currency);
        addCryptocurrency(cryptocurrency);
    };

    return (
        <form>
            {error ? <Error message="Please select both fields" /> : null}
            <SelectCurrency />
            <SelectCryptocurrency />
            <Button
                type="submit"
                value="Calculate"
                onClick={(e) => getCryptocurrencyPrice(e)}
            />
        </form>
    );
};

Formular.propTypes = {
    addCurrency: PropTypes.func.isRequired,
    addCryptocurrency: PropTypes.func.isRequired,
};

export default Formular;
