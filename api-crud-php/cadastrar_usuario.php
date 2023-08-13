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

$nome = $dados['usuario']['nome'];
$cpf = $dados['usuario']['cpf'];
$nascimento = $dados['usuario']['nascimento'];
$senha = md5($dados['usuario']['senha']);
$tipo_usuario = $dados['usuario']['tipo_usuario'];

if($dados){

    $query_usuario = "INSERT INTO usuarios (nome, cpf, nascimento, senha, tipo_usuario) VALUES (:nome, :cpf, :nascimento, :senha, :tipo_usuario)";
    $cad_usuario = $conn -> prepare($query_usuario);
    
    $cad_usuario->bindParam(':nome', $nome, PDO::PARAM_STR);
    $cad_usuario->bindParam(':cpf', $cpf, PDO::PARAM_STR);
    $cad_usuario->bindParam(':senha', $senha, PDO::PARAM_STR);
    $cad_usuario->bindParam(':tipo_usuario', $tipo_usuario, PDO::PARAM_INT);

    $nascimento_dt = new DateTime($nascimento);
    $nascimento_str = $nascimento_dt->format('Y-m-d');
    $cad_usuario->bindParam(':nascimento', $nascimento_str, PDO::PARAM_STR);

    $cad_usuario -> execute();

    if($cad_usuario -> rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "Usuario cadastrado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Usuario não cadastrado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Usuario não cadastrado com sucesso!"
    ];
}


http_response_code(200);
echo json_encode($response);

?>