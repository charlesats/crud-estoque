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
$quantidade = $dados['quantidade'];

if($dados){
    if($dados['quantidade'] < 0){
        $quantidade = 0;
    }
    
    $query_produto = "UPDATE produtos SET quantidade=:quantidade, data_alteracao=:data_alteracao WHERE id=:id";
    
    $edit_produto = $conn -> prepare($query_produto);
    $edit_produto -> bindParam(':quantidade', $quantidade, PDO::PARAM_STR);
    $edit_produto -> bindParam(':id', $dados['id'], PDO::PARAM_INT);
    
    date_default_timezone_set('America/Sao_Paulo');
    $edit_produto -> bindParam(':data_alteracao', date("Y-m-d H:i:s"), PDO::PARAM_STR);


    $edit_produto -> execute();
    
    if($edit_produto -> rowCount()){
        $response = [
            "erro" => false,
            "message" => "Produto editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "message" => "Produto não editado com sucesso!",
        ];
    }
}else{
    $response = [
        "erro" => true,
        "message" => "Produto não editado com sucesso!",
    ];
}



http_response_code(200);
echo json_encode($response);