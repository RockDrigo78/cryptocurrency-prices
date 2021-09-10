import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import image from "./cryptomonedas.png";
import Formular from "./components/Formular";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Image = styled.img`
    max-width: 100%;
    margin-top: 5rem;
`;

const Header = styled.h1`
    font-family: "Bebas Neue", cursive;
    color: #fff;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top: 80px;

    &::after {
        content: "";
        width: 100px;
        height: 6px;
        background-color: #66a2fe;
        display: block;
    }
`;

function App() {
    const [currency, addCurrency] = useState("");
    const [cryptocurrency, addCryptocurrency] = useState("");
    const [result, addResult] = useState({});
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        if (currency === "") return;

        const getPrice = async () => {
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;

            const result = await axios.get(url);

            isLoading(true);

            setTimeout(() => {
                isLoading(false);

                addResult(result.data.DISPLAY[cryptocurrency][currency]);
            }, 3000);
        };
        getPrice();
    }, [currency, cryptocurrency]);

    return (
        <Container>
            <div>
                <Image src={image} alt="crypto image" />
            </div>
            <div>
                <Header>Find your Cryptocurrency value</Header>
                <Formular
                    addCurrency={addCurrency}
                    addCryptocurrency={addCryptocurrency}
                />
                {loading ? <Spinner /> : <Result result={result} />}
            </div>
        </Container>
    );
}

export default App;
