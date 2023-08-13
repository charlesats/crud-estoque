<?php

// Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GETM PUT, POST, DELETE");

//incluir a conexão
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $dados['usuario']['senha'] = md5($dados['usuario']['senha']);

    $query_login = "SELECT tipo_usuario, nome, nascimento, cpf FROM usuarios WHERE id=:id AND senha=:senha";
    $login_usuario = $conn->prepare($query_login);

    $login_usuario->bindParam(':id', $dados['usuario']['user'], PDO::PARAM_STR);
    $login_usuario->bindParam(':senha', $dados['usuario']['senha'], PDO::PARAM_STR);

    $login_usuario -> execute();
    
    if($login_usuario -> rowCount()){
        
        $result = $login_usuario->fetch(PDO::FETCH_ASSOC);
        $tipo_usuario = $result['tipo_usuario'];
        $nome = $result['nome'];
        $nascimento = $result['nascimento'];
        $cpf = $result['cpf'];

        $response = [
            "erro" => false,
            "mensagem" => "Logado com sucesso!",
            "id" => $dados['usuario']['user'],
            "tipo" => $tipo_usuario,
            "nome" => $nome,
            "nascimento" => $nascimento,
            "senha" => $dados['usuario']['senha'],
            "cpf" => $cpf
        ];

        
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Usuário ou senha incorretos!",
            "tipo" => null
        ];
    }
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Erro na conexao!",
        "tipo" => null
    ];
}


http_response_code(200);
echo json_encode($response);
