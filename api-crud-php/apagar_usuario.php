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


$response = "";

$query_usuario = "DELETE FROM usuarios WHERE id=:id LIMIT 1 ";
$delete_usuario = $conn -> prepare($query_usuario);
$delete_usuario -> bindParam(':id', $dados['id'], PDO::PARAM_INT);


if($delete_usuario -> execute()){

    $response = [
        "erro" => false,
        "mensagem" => "usuario apagado com sucesso!"
    ];

}else{

    $response = [
        "erro" => true,
        "mensagem" => "usuario não apagado com sucesso!"
    ];
}



http_response_code(200);

echo json_encode($response);