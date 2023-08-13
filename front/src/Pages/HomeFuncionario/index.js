import React, { useState } from "react";
import { Geral, MenuSuperior, ImagemLogo, Titulo, NomeUsuario, ImagemSair, Item, ImagemItem1,  ImagemItem2,  ImagemItem3,  ImagemItem4,  ImagemItem5, ImagemItem6, TextoItem, ConteudoLateral, ConteudoPrincipal} from "../../Shared/style";

import { FlipComponent } from "../../Shared/flipComponent";


export function HomeFuncionario({statusLogin}){

    const [statusTela, setStatusTela] = useState("0");

    const handleClickItem = (param) => {
        setStatusTela(param);    
    };

    const handleToggleTela = () => {
        statusLogin(0);
    }

    return (
        <Geral>
            <MenuSuperior>
                <ImagemLogo onClick={() => handleClickItem("0")}></ImagemLogo>
                <Titulo onClick={() => handleClickItem("0")}> Sistema de Estoque </Titulo>
                <NomeUsuario> Bem Vindo Funcionario </NomeUsuario>
                <ImagemSair onClick={handleToggleTela} ></ImagemSair>
            </MenuSuperior>
            <ConteudoLateral>
                <Item onClick={() => handleClickItem("1")}>                   
                    <ImagemItem1></ImagemItem1>
                    <TextoItem> Atualizar Estoque </TextoItem>
                </Item>
                <Item onClick={() => handleClickItem("2")}>
                    <ImagemItem2></ImagemItem2>
                    <TextoItem> Pesquisar Produto </TextoItem>
                </Item>
                <Item onClick={() => handleClickItem("3")}>
                    <ImagemItem3></ImagemItem3>
                    <TextoItem> Pesquisar Marca </TextoItem>
                </Item>
                <Item onClick={() => handleClickItem("4")}>
                    <ImagemItem4></ImagemItem4>
                    <TextoItem> Atualizar Dados </TextoItem>
                </Item>
            </ConteudoLateral>
            <ConteudoPrincipal>
                <FlipComponent statusTela={statusTela}></FlipComponent>
            </ConteudoPrincipal>
        </Geral>
    );
}
