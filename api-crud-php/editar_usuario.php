<?php

// Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GETM PUT, POST, DELETE");

// error_reporting(0);
// ini_set('display_errors', 0);

//incluir a conexão
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){
    $query_usuario = "UPDATE usuarios SET ";

    $params = array();

    if (!empty($dados['nome'])) {
        $query_usuario .= "nome=:nome, ";
        $params[':nome'] = $dados['nome'];
    }

    if (!empty($dados['cpf'])) {
        $query_usuario .= "cpf=:cpf, ";
        $params[':cpf'] = $dados['cpf'];
    }

    if (!empty($dados['nascimento'])) {
        $query_usuario .= "nascimento=:nascimento, ";
        $params[':nascimento'] = $dados['nascimento'];
    }

    if (!empty($dados['senha'])) {
        $query_usuario .= "senha=:senha, ";
        $params[':senha'] = md5($dados['senha']);
    }

    $query_usuario .= "tipo_usuario=:tipo_usuario WHERE id=:id";

    $params[':tipo_usuario'] = $dados['tipo_usuario'];
    $params[':id'] = $dados['id'];

    $edit_usuario = $conn->prepare($query_usuario);

    foreach ($params as $key => &$value) {
        $edit_usuario->bindParam($key, $value);
    }

    $edit_usuario->execute();

    if($edit_usuario->rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "usuario editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "usuario não editado com sucesso!",
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
