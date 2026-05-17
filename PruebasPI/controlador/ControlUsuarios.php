<?php
require_once ("../modelo/crud.php");

header("Content-Type: application/json");

$db = new Database();
$opc = $_POST['opc'];


switch ($opc) {
    case 'update':

        $id_usuario = $_POST['id_usuario'];
        $correo = $_POST['correo'];
        $nueva_password = isset($_POST['password']) ? trim($_POST['password']) : '';


        if (empty($correo)) {
            echo json_encode(["success" => false, "message" => "El correo no puede estar vacío"]);
            exit;
        }
        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(["success" => false, "message" => "Correo no válido"]);
            exit;
        }
        if (!empty($nueva_password) && strlen($nueva_password) < 4) {
            echo json_encode(["success" => false, "message" => "La contraseña debe tener al menos 4 caracteres"]);
            exit;
        }


        $checkCorreo = $db->read("usuarios", "correo='$correo' AND id_usuario != '$id_usuario'");

        if (count($checkCorreo) > 0) {
            echo json_encode(["success" => false, "message" => "El correo ya está registrado por otro usuario"]);
            exit;
        }
        
        $data = ["correo" => $correo];
        if (!empty($nueva_password)) {
            $data["password"] = $nueva_password; 
        }
        
        $condition = "id_usuario='$id_usuario'";
        $result = $db->update("usuarios", $data, $condition);
        echo json_encode(["success" => $result, "message" => $result ? "Usuario actualizado correctamente" : "Error al actualizar el usuario"   ]);
        break;

    case 'delete':
        $id_usuario = $_POST['id_usuario'];
        $result = $db->delete("usuarios", "id_usuario='$id_usuario'");
        echo json_encode(["success" => $result, "message" => $result ? "Usuario eliminado correctamente" : "Error al eliminar el usuario"]);
        break;

        default:
        echo json_encode(["success" => false, "message" => "Operación no válida"]);
        break;
}
?>


   
        




