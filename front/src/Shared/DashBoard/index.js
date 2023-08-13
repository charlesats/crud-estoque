import React from "react";
import { Geral, LeftGeral, RightGeral, Titulo, Texto } from "./style";


function PesquisarProduto(){
    return(
        <Geral>
            <LeftGeral>
                <Titulo> Sistema CRUD <br/> Controle de Estoque </Titulo>
                <Texto>
                Apresentamos nosso sistema de controle de estoque, que foi projetado para ajudar as empresas a gerenciar seu estoque de 
                forma eficiente e precisa, permitindo o monitoramento em tempo real. Simplifique o gerenciamento do 
                seu estoque com nosso sistema confiável, intuitivo e fácil de usar.
                </Texto>
            </LeftGeral>
            <RightGeral></RightGeral>
        </Geral>
    )
}

export default PesquisarProduto;