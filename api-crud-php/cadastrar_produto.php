<?php

// Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

error_reporting(0);
ini_set('display_errors', 0);
//header("Access-Control-Allow-Methods: GETM PUT, POST, DELETE");

//incluir a conexão
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

$nome = $dados['produto']['nome'];
$marca = $dados['produto']['marca'];
$preco_compra = $dados['produto']['preco_compra'];
$preco_venda = $dados['produto']['preco_venda'];


if($dados){

    $query_produto = "INSERT INTO produtos (nome, id_marca, preco_compra, preco_venda, data_alteracao) VALUES (:nome, :marca, :preco_compra, :preco_venda, :data_alteracao)";
    $cad_produto = $conn -> prepare($query_produto);
    
    $cad_produto->bindParam(':nome', $nome, PDO::PARAM_STR);
    $cad_produto->bindParam(':marca', $marca, PDO::PARAM_STR);
    $cad_produto->bindParam(':preco_compra', $preco_compra, PDO::PARAM_STR);
    $cad_produto->bindParam(':preco_venda', $preco_venda, PDO::PARAM_STR);

    date_default_timezone_set('America/Sao_Paulo');
    $cad_produto -> bindParam(':data_alteracao', date("Y-m-d H:i:s"), PDO::PARAM_STR);

    

    $cad_produto -> execute();

    if($cad_produto -> rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "Produto cadastrado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Produto não cadastrado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Produto não cadastrado com sucesso!"
    ];
}


http_response_code(200);
echo json_encode($response);

?>