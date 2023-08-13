import styled from "styled-components";
import Storage from "../../Imagens/storage.png";


export const Geral = styled.section`
    width: 90%;
    height: calc(90% - 100px);
    position: relative;
    margin: auto;
    top: 20px;
    display: flex;

    -webkit-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
`;

export const LeftGeral = styled.section`
    width: 50%;
    height: 100%;
    position: relative;
    margin: auto;
    user-select: none;
    padding: 30px;
`;

export const Titulo = styled.span`
    font-size: 35px;
    font-weight: 700;
    letter-spacing: 4pt;
    color: #0D8A8F;
    position: relative;
    top: 10%;
`;

export const Texto = styled.span`
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2pt;
    color: #505050;
    position: relative;
    top: 15%;
`;



export const RightGeral = styled.section`
    width: 50%;
    height: 100%;
    position: relative;
    margin: auto;
    background-image: url(${Storage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

