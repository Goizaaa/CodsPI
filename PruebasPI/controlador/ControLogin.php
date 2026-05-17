<?php
require_once __DIR__ . '/../modelo/crud.php';

class ControLogin {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function iniciarSesion($correo, $password) {
        // Buscar usuario por correo
        $usuarios = $this->db->read("usuarios", "correo = '$correo'");
        
        if (count($usuarios) > 0) {
            $usuario = $usuarios[0];
            if ($password == $usuario["password"]) { // Contraseña en texto plano (coincide con tu sistema)
                echo json_encode([
                    "status" => true,
                    "mensaje" => "Inicio de sesion correcto",
                    "usuario" => $usuario["nombre"]
                ]);
            } else {
                echo json_encode([
                    "status" => false,
                    "mensaje" => "Contraseña incorrecta"
                ]);
            }
        } else {
            echo json_encode([
                "status" => false,
                "mensaje" => "El usuario no existe"
            ]);
        }
    }

    public function crearCuenta($correo, $password, $nombre, $apellidoP, $apellidoM) {
        // Verificar si el correo ya existe
        $existe = $this->db->read("usuarios", "correo = '$correo'");
        if (count($existe) > 0) {
            echo json_encode([
                "status" => false,
                "mensaje" => "El correo ya existe"
            ]);
            return;
        }

        // Insertar nuevo usuario
        $data = [
            "correo" => $correo,
            "password" => $password,
            "nombre" => $nombre,
            "apellido_paterno" => $apellidoP,
            "apellido_materno" => $apellidoM
        ];
        $result = $this->db->create("usuarios", $data);
        
        if ($result) {
            echo json_encode([
                "status" => true,
                "mensaje" => "Cuenta creada correctamente"
            ]);
        } else {
            echo json_encode([
                "status" => false,
                "mensaje" => "Error al crear la cuenta"
            ]);
        }
    }

    public function buscarUsuario($correo) {
        $usuarios = $this->db->read("usuarios", "correo = '$correo'");
        if (count($usuarios) > 0) {
            $usuario = $usuarios[0];
            echo json_encode([
                "status" => true,
                "mensaje" => "Usuario encontrado",
                "usuario" => ["correo" => $usuario["correo"], "nombre" => $usuario["nombre"]]
            ]);
        } else {
            echo json_encode([
                "status" => false,
                "mensaje" => "El correo no está registrado"
            ]);
        }
    }

    public function actualizarPassword($correo, $password) {
        $data = ["password" => $password];
        $condition = "correo = '$correo'";
        $result = $this->db->update("usuarios", $data, $condition);
        if ($result) {
            echo json_encode([
                "status" => true,
                "mensaje" => "Contraseña actualizada correctamente"
            ]);
        } else {
            echo json_encode([
                "status" => false,
                "mensaje" => "Error al actualizar la contraseña"
            ]);
        }
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $controller = new ControLogin();

    if (isset($_POST["login"])) {
        $correo = $_POST["correo"];
        $password = $_POST["password"];
        $controller->iniciarSesion($correo, $password);
    }

    if (isset($_POST["crear"])) {
        $correo = $_POST["correo"];
        $password = $_POST["password"];
        $nombre = $_POST["nombre"];
        $apellidoP = isset($_POST["apellido_paterno"]) ? $_POST["apellido_paterno"] : "";
        $apellidoM = isset($_POST["apellido_materno"]) ? $_POST["apellido_materno"] : "";
        $controller->crearCuenta($correo, $password, $nombre, $apellidoP, $apellidoM);
    }

    if (isset($_POST["buscar_usuario"])) {
        $correo = $_POST["correo"];
        $controller->buscarUsuario($correo);
    }

    if (isset($_POST["actualizar_password"])) {
        $correo = $_POST["correo"];
        $password = $_POST["password"];
        $controller->actualizarPassword($correo, $password);
    }
}
?>