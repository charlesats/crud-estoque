import React from "react";
import AtualizarEstoque from "../Shared/AtualizarEstoque";
import PesquisarProduto from "./PesquisarProduto";
import PesquisarMarca from "./PesquisarMarca";
import DashBoard from "./DashBoard";
import PesquisarFuncionario from "./PesquisarFuncionario";
import PesquisarGerente from "./PesquisarGerente";
import AlterarDadosUsuario from "./AtualizarDadosUsuario";

export function FlipComponent(props) {
    const { statusTela } = props;

    if (statusTela === "1") {
        return <AtualizarEstoque />;
    }else if (statusTela === "2") {
        return <PesquisarProduto />;
    }else if (statusTela === "3") {
        return <PesquisarMarca />;
    }else if (statusTela === "4") {
        return <AlterarDadosUsuario />;
    }else if(statusTela === "5"){
        return <PesquisarFuncionario />
    }else if(statusTela === "6"){
        return <PesquisarGerente />
    }else {
        return <DashBoard />;
    }
}
