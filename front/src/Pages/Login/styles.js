import styled from "styled-components";
import fundo from "../../Imagens/fundo.jpg"
import logo from "../../Imagens/logo.png"
import olho from "../../Imagens/eye.png"
import usuario from "../../Imagens/user.png"
import senha from "../../Imagens/senha.png"

export const Geral = styled.section`
    width: 100vw;
    height: 100vh;
    
    background-image: url(${fundo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
`;


export const Container = styled.section`
    width: 400px;
    margin: 100px auto;
    box-shadow: 0 0 1em #6c757d;
    padding: 30px;
    border-radius: 40px;
    background-color: aliceblue;
`;

export const Imagemtopo = styled.section`
    width: 150px;
    height: 150px;
    background-color: aliceblue;
    border-radius: 200px;
    position: absolute;
    top: 50px;
    left: calc(50% - 75px);
    box-shadow: 0 0 1px 0 #6c757d;

    background-image: url(${logo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;

    transition: 200ms;

    :hover{
        transition: 200ms;
        transform: translateY(-10px);
    }
`;


export const ConteudoTitulo = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const BotaoAcao = styled.section`
    margin: 30px 0px;
`;

export const ButtonInfo = styled.button`
    background-color: #EEEEEE;
    color: #008BD6;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #008BD6;
    cursor: pointer;
    font-size: 18px;
    
    :hover{
        color: #fff;
        background-color: #008BD6;
    }
`;

export const Titulo = styled.h1`
    font-size: 23px;
    color: #3e3e3e;
    text-align: center;
    padding: 10px;
`;

export const AlertSuccess = styled.p`
    background-color: #B8FFDF;
    color: #0f5132;
    margin: 20px 0px;
    border: 1px solid #badbcc;
    border-radius: 4px;
    padding: 7px;
`;

export const AlertDanger = styled.p`
    padding: 15px;
    border: none;
    border-left: 10px solid #B80505;
    font-size: 15px;
    background-color: rgba(255, 0, 0, 0.1);
`;


export const ConteudoForm = styled.section`
    margin-top: 100px;
    max-width: 960px;
    padding: 10px 30px 30px;
`;

export const Form = styled.form`
    margin: 0px auto;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    margin-bottom: 16px;
`;


export const Input = styled.input`
    width: 100%;
    padding: 12px 50px;

    font-weight: 600;
    color: #6C6C6C;

    border: none;
    border-bottom: 5px solid #008B94;
    
    box-sizing: border-box;
    margin-top: 16px;
    resize: vertical;

    margin-top: 6px;
    margin-bottom: 16px;

    :focus {
        outline: none;
    }
`;

export const AjustarInput = styled.div`
  position: relative;
`;

export const ToggleButton = styled.button`
    position: absolute;
    top: 30px;
    right: 10px;
    transform: translateY(-50%);
    border: none;

    width: 40px;
    height: 40px;

    background: none;

    background-image: url(${olho});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;
    cursor: pointer;
`;

export const ImagemUsuario = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;

    width: 40px;
    height: 40px;

    background: none;

    background-image: url(${usuario});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;

`;

export const ImagemSenha = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;


    width: 40px;
    height: 40px;

    background: none;

    background-image: url(${senha});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;

`;

export const ButtonSuccess = styled.button`
    color: aliceblue;
    background-color: #198754;
    padding: 8px 12px;
    border-radius: 20px;
    width: 100%;
    cursor: pointer;
    font-size: 18px;
    transition: 200ms;
    border: none;
    
    :hover{
        transform: translateY(-3px);
        transition: 200ms;
    }

    :focus{
        outline: none;
    }
`;