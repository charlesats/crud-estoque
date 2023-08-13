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

// Consulta para verificar se há produtos vinculados à marca
$query_verifica_produtos = "SELECT COUNT(*) AS num_produtos FROM Produtos WHERE id_marca = :id_marca;";
$verifica_produtos = $conn->prepare($query_verifica_produtos);
$verifica_produtos->bindParam(':id_marca', $dados['id'], PDO::PARAM_INT);
$verifica_produtos->execute();
$num_produtos = $verifica_produtos->fetch(PDO::FETCH_ASSOC)['num_produtos'];

if ($num_produtos > 0) {
    // Há produtos vinculados, não podemos excluir a marca
    $query_marca = "UPDATE marcas SET nome_marca='Marca Deletada', ";

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
            "mensagem" => "Marca apagada com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Marca não apagada com sucesso!",
        ];
    }

} else {
    // Não há produtos vinculados, podemos excluir a marca
    $query_marca = "DELETE FROM marcas WHERE id=:id LIMIT 1 ";
    $delete_marca = $conn->prepare($query_marca);
    $delete_marca->bindParam(':id', $dados['id'], PDO::PARAM_INT);

    if ($delete_marca->execute()) {
        $response = [
            "erro" => false,
            "mensagem" => "Marca apagada com sucesso!"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "Marca não apagada com sucesso!"
        ];
    }
}

http_response_code(200);
echo json_encode($response);