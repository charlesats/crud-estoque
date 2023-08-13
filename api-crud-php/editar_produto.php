<?php

// Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GETM PUT, POST, DELETE");

error_reporting(0);
ini_set('display_errors', 0);

//incluir a conexão
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){
    $query_produto = "UPDATE produtos SET ";

    $params = array();

    if (!empty($dados['nome'])) {
        $query_produto .= "nome=:nome, ";
        $params[':nome'] = $dados['nome'];
    }

    if (!empty($dados['id_marca'])) {
        $query_produto .= "id_marca=:id_marca, ";
        $params[':id_marca'] = $dados['id_marca'];
    }

    if (!empty($dados['preco_compra'])) {
        $query_produto .= "preco_compra=:preco_compra, ";
        $params[':preco_compra'] = $dados['preco_compra'];
    }

    if (!empty($dados['preco_venda'])) {
        $query_produto .= "preco_venda=:preco_venda, ";
        $params[':preco_venda'] = $dados['preco_venda'];
    }

    date_default_timezone_set('America/Sao_Paulo');
    $query_produto .= "data_alteracao=:data_alteracao WHERE id=:id";

    $params[':data_alteracao'] = date("Y-m-d H:i:s");
    $params[':id'] = $dados['id'];

    $edit_produto = $conn->prepare($query_produto);

    foreach ($params as $key => &$value) {
        $edit_produto->bindParam($key, $value);
    }

    $edit_produto->execute();

    if($edit_produto->rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "Produto editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Produto não editado com sucesso!",
        ];
    }
}else{
    $response = [
        "erro" => true,
        "mensagem" => "ERRO API",
    ];
}

http_response_code(200);
echo json_encode($response);
