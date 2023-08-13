import styled from "styled-components";
import Search  from "../../Imagens/search.png";
import Lapis  from "../../Imagens/lapis.png";
import Logo from "../../Imagens/logo.png";
import Quantidade from "../../Imagens/produto.png";
import SetaDireita from "../../Imagens/seta-direita.png";
import SetaEsquerda from "../../Imagens/seta-esquerda.png";

export const AlertDanger = styled.section`
    width: 250px;
    height: 20px;
    padding: 10px;
    background-color: red;
    top: -30px;
    position: absolute;
    left: calc(50% - 125px);
    color: #282828;
    background-color: #FFCDCD;
    border-left: 15px solid #E40000;
    font-weight: 600;
    display: flex;
    align-items: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export const AlertSucess = styled.section`
    width: 250px;
    height: 20px;
    padding: 10px;
    background-color: red;
    top: -30px;
    position: absolute;
    left: calc(50% - 125px);
    color: #282828;
    background-color: #CDFFE4;
    border-left: 15px solid #0E7442;
    font-weight: 600;
    display: flex;
    align-items: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;


export const Geral = styled.section`
    width: 90%;
    height: calc(90% - 100px);
    position: relative;
    margin: auto;
    top: 20px;

    -webkit-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
`;

export const Tabela = styled.section`
    width: 100%;
    height: 100%;
`;

export const Paginacao = styled.section`
    display: flex;
    width: 100px;
    margin-left: auto;
    padding: 10px;
    position: absolute;
    right: 0;
    bottom: 10px;

    button{
        width: 40px;
        height: 40px;
        border-radius: 40px;
        border: none;
        background-color: #0AC2C5;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 40%;
        cursor: pointer;
    }
`;

export const BotaoDireito = styled.button`
    background-image: url(${SetaDireita});
    position: absolute;
    right: 10px;
    bottom: 0;
`;

export const BotaoEsquerdo = styled.button`
    background-image: url(${SetaEsquerda});
    position: absolute;
    left: 0;
    bottom: 0;
`;

export const TabelaTopo = styled.section`
    display: flex;
`;

export const Titulo = styled.p`
   border-left: 10px solid #009D94;;
   padding: 10px;
   color:  #009D94;
   font-weight: 600;
   font-size: 20px;
`;

export const Pesquisa = styled.section`
    width: 200px;
    height: 40px;
    margin-left: auto;
    margin-right: 100px;
    margin-top: 30px;
    display: flex;
`;

export const Lupa = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background: #009D94 url(${Search});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;
    position: absolute;
    margin-top: -5px;
    margin-left: -10px;
    margin-right: auto;
    border: none;
    cursor: pointer;
    -webkit-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
`;

export const Campo = styled.input`
    width: 180px;
    height: 40px;
    background-color: #c3c3c3;
    font-weight: 600;
    color: #3C3C3C;
    border: none;
    border-radius: 20px;
    padding: 0 50px;
    -webkit-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);

    :focus{
        outline: none;
    }
`;

export const BotaoEditar = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    background-image: url(${Lapis});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`;

export const TabelaConteudo = styled.table`
    width: 100%;
    max-height: 400px;
    border-collapse: collapse;
    
    th {
        background-color: aliceblue;
        color: #707070;
        font-weight: 700;
        padding: 10px;
    }

    tr {
        background-color: #D6D6D6;
        color: #6B6B6B;
        font-weight: 500;
        height: 40px;
        border-top: 2px solid aliceblue;
        :hover{
            background-color: #D2E3E2;
        }
    }

    td {
        text-align: center;
        vertical-align: middle;
        padding: 10px;
    }

    tbody {
        overflow-y: scroll;
        display: block;
        max-height: 350px;
    }

    thead, tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    thead {
        width: calc(100% - 1em);
    }


`;

export const ModalEditar= styled.div`
    width: 400px;
    height: 350px;
    background-color: aliceblue;
    position: absolute;
    left: calc(50% - 200px);
    top: 0;

    -webkit-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
`;

export const TopoModalEditar= styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background-color: aliceblue;
    background-image: url(${Lapis});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;

    position: relative;
    margin: auto;
    transform: translateY(-50px);

    -webkit-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
`;

export const BotaoSair= styled.button`
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    background-color: transparent;
    font-family: Arial, Helvetica, sans-serif;
    border: none;
    font-weight: 900;
    font-size: 20px;
    color: #A5A5A5;
    cursor: pointer;
`;

export const CampoModal = styled.section`
    display: flex;
`;

export const ImagemNome = styled.section`
    width: 40px;
    height: 40px;
    background-image: url(${Logo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
    position: absolute;
    left: 5%;
`;

export const ImagemQuantidade = styled.section`
    width: 40px;
    height: 40px;
    background-image: url(${Quantidade});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
    position: absolute;
    left: 5%;
`;

export const Label = styled.span`
    width: calc(90% - 50px);
    height: 40px;
    border: none;
    border-bottom: 5px solid #2EA0A4;
    margin: auto;
    margin-left: 5%;
    color: #5C5B5B;
    background-color: #F1F1F1;
    font-weight: 900;
    font-size: 20px;
    padding-left: 50px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`;

export const CampoEditar = styled.input`
    width: calc(90% - 50px);
    height: 40px;
    border: none;
    border-bottom: 5px solid #2EA0A4;
    margin: auto;
    margin-left: 5%;
    color: #5C5B5B;
    background-color: #F1F1F1;
    font-weight: 900;
    font-size: 18px;
    padding-left: 50px;
    margin-bottom: 15px;

    :focus{
        outline: none;
    }
`;

export const BotaoEnviar= styled.button`
    width: 90%;
    height: 40px;
    border: none;
    background-color: red;
    left: 5%;
    margin-top: 50px;
    position: relative;
    cursor: pointer;
    background-color: #2EA0A4;
    font-size: 20px;
    font-weight: 700;
    color: aliceblue;
    border-radius: 20px;
`;

export const Form = styled.form`
    margin: auto;
`;