<?php
require_once("crud.php");

$db = new Database();
$sql = "SELECT id_usuario, correo, nombre, apellido_paterno, apellido_materno, password FROM usuarios";
$result = $db->readCustom($sql);

header("Content-Type: application/json");
echo json_encode($result);
?>