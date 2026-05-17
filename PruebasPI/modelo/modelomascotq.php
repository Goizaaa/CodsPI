
<?php
require_once("crud.php");

$db = new Database();

$sql = "SELECT
            nom_mascota,
            especie,
            raza,
            fecha_adopcion,
            peso_inicial,
            sexo,
            IF(esterilizado = 1, 'Sí', 'No') AS esterilizado
        FROM mascota";
       

$result = $db->readCustom($sql);

header("Content-Type: application/json");
echo json_encode($result);
?>
