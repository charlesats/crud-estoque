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
    $query_marca = "UPDATE marcas SET ";

    $params = array();

    if (!empty($dados['nome'])) {
        $query_marca .= "nome_marca=:nome, ";
        $params[':nome'] = $dados['nome'];
    }

    date_default_timezone_set('America/Sao_Paulo');
    $query_marca .= "data_alteracao=:data_alteracao WHERE id=:id";

    $params[':data_alteracao'] = date("Y-m-d H:i:s");
    $params[':id'] = $dados['id'];

    $edit_marca = $conn->prepare($query_marca);

    foreach ($params as $key => &$value) {
        $edit_marca->bindParam($key, $value);
    }

    $edit_marca->execute();

    if($edit_marca->rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "Marca editada com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Marca não editada com sucesso!",
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
