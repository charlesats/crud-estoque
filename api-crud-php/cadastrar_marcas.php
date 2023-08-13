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

$nome = $dados['marca']['nome'];

if($dados){

    $query_marca = "INSERT INTO marcas (nome_marca, data_alteracao) VALUES (:nome, :data_alteracao)";
    $cad_marca = $conn -> prepare($query_marca);
    
    $cad_marca->bindParam(':nome', $nome, PDO::PARAM_STR);

    date_default_timezone_set('America/Sao_Paulo');
    $cad_marca -> bindParam(':data_alteracao', date("Y-m-d H:i:s"), PDO::PARAM_STR);

    

    $cad_marca -> execute();

    if($cad_marca -> rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "Marca cadastrada com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Marca não cadastrada com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Marca não cadastrada com sucesso!"
    ];
}


http_response_code(200);
echo json_encode($response);

?>