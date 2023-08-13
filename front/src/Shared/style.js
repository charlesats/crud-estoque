import styled from "styled-components";
import Logo from "../Imagens/logo.png";
import Sair from "../Imagens/sair.png";
import Estoque from "../Imagens/estoque.png";
import Produto from "../Imagens/produto.png";
import Marca from "../Imagens/marca.png";
import DadosUsuario from "../Imagens/dados_ususarios.png";
import Funcionario from "../Imagens/funcionarios.png";
import Gerente from "../Imagens/gerente.png";

export const Geral = styled.section`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: aliceblue;
    display: flex;
`;


export const MenuSuperior = styled.section`
    width: calc(100vw - 290px);
    margin-left: 250px;
    position: absolute;
    height: 50px;
    overflow: hidden;
    background-color: #D7D7D7; 
    padding: 5px 20px;
    display: flex;
    -webkit-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 11px -6px rgba(0,0,0,0.75);
`;

export const ImagemLogo = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${Logo});
    background-position: center;
    background-size: contain;
    cursor: pointer;
`;

export const Titulo = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: #4B4B4B;
    margin-left: 20px;
    margin-top: 10px;
    cursor: pointer;
`;

export const NomeUsuario = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: #4B4B4B;
    margin-left: auto;
    margin-top: 10px;
    padding-right: 10px;
`;

export const ImagemSair = styled.a`
    width: 50px;
    height: 50px;
    background-image: url(${Sair});
    background-position: center;
    background-size: 70%;
    background-repeat: no-repeat;
    cursor: pointer;
`;

export const ConteudoLateral = styled.section`
    width: 250px;
    height: 100vh;
    background-color: #0098A1; 
    padding-top: 100px;
    overflow: hidden;
`;

export const Item = styled.section`
  width: 250px;
  height: 50px;
  position: relative;
  color: aliceblue;
  transition: 200ms;
  display: flex;
  align-items: center;
  padding: 10px;
  border-left: 10px solid transparent;

  :hover{
    border-left: 7px solid aliceblue ;
    padding-left: 20px;
    cursor: pointer;
    /* transform: translateX(1px); */
  }
`;

export const TextoItem = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;

  /* Adiciona cor quando o Item é hover */
  /* ${Item}:hover & {
    color: #0098A1;
  } */
`;

export const ImagemItem1 = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${Estoque}); /* Define a imagem de fundo */
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
`;

export const ImagemItem2 = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${Produto}); /* Define a imagem de fundo */
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
`;

export const ImagemItem3 = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${Marca}); /* Define a imagem de fundo */
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
`;

export const ImagemItem4 = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${DadosUsuario}); /* Define a imagem de fundo */
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
`;

export const ImagemItem5 = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${Funcionario}); /* Define a imagem de fundo */
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
`;

export const ImagemItem6 = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${Gerente}); /* Define a imagem de fundo */
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
`;


export const ConteudoPrincipal = styled.section`
    width: calc(100vw - 200px);
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
`;
