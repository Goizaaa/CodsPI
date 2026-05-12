<?php

require_once __DIR__ . '/../modelo/conexion.php';

class ControLogin extends Conexion {

    public function iniciarSesion($correo, $password)
    {

        $correo = $this->db->real_escape_string($correo);

        $sql = "SELECT * FROM usuarios 
                WHERE correo = '$correo'";

        $resultado = $this->db->query($sql);

        if ($resultado->num_rows > 0)
        {

            $usuario = $resultado->fetch_assoc();

           
            if($password == $usuario["password"])
            {

                echo json_encode([
                    "status" => true,
                    "mensaje" => "Inicio de sesion correcto",
                    "usuario" => $usuario["nombre"]
                ]);

            }
            else
            {

                echo json_encode([
                    "status" => false,
                    "mensaje" => "Contraseña incorrecta"
                ]);

            }

        }
        else
        {

            echo json_encode([
                "status" => false,
                "mensaje" => "El usuario no existe"
            ]);

        }

    }

    public function crearCuenta($correo, $password, $nombre)
    {

        $correo = $this->db->real_escape_string($correo);
        $nombre = $this->db->real_escape_string($nombre);

        $buscar = "SELECT * FROM usuarios 
                   WHERE correo = '$correo'";

        $resultado = $this->db->query($buscar);

        if($resultado->num_rows > 0)
        {

            echo json_encode([
                "status" => false,
                "mensaje" => "El correo ya existe"
            ]);

        }
        else
        {

           
            $sql = "INSERT INTO usuarios
                    (correo, password, nombre)
                    VALUES
                    ('$correo', '$password', '$nombre')";

            $guardar = $this->db->query($sql);

            if($guardar)
            {

                echo json_encode([
                    "status" => true,
                    "mensaje" => "Cuenta creada correctamente"
                ]);

            }
            else
            {

                echo json_encode([
                    "status" => false,
                    "mensaje" => "Error al crear la cuenta"
                ]);

            }

        }

    }

    // ========== NUEVOS METODOS PARA RECUPERACION ==========

    public function buscarUsuario($correo)
    {
        $correo = $this->db->real_escape_string($correo);
        
        $sql = "SELECT correo, nombre FROM usuarios WHERE correo = '$correo'";
        $resultado = $this->db->query($sql);
        
        if ($resultado->num_rows > 0) {
            $usuario = $resultado->fetch_assoc();
            echo json_encode([
                "status" => true,
                "mensaje" => "Usuario encontrado",
                "usuario" => $usuario
            ]);
        } else {
            echo json_encode([
                "status" => false,
                "mensaje" => "El correo no está registrado"
            ]);
        }
    }

    public function actualizarPassword($correo, $password)
    {
        $correo = $this->db->real_escape_string($correo);
        
        $sql = "UPDATE usuarios SET password = '$password' WHERE correo = '$correo'";
        $resultado = $this->db->query($sql);
        
        if ($resultado) {
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

if($_SERVER["REQUEST_METHOD"] === "POST")
{

    $controller = new ControLogin();

    if(isset($_POST["login"]))
    {

        $correo = $_POST["correo"];
        $password = $_POST["password"];

        $controller->iniciarSesion(
            $correo,
            $password
        );

    }

    if(isset($_POST["crear"]))
    {

        $correo = $_POST["correo"];
        $password = $_POST["password"];
        $nombre = $_POST["nombre"];

        $controller->crearCuenta(
            $correo,
            $password,
            $nombre
        );

    }

    // ========== NUEVOS CASOS PARA RECUPERACION ==========

    if(isset($_POST["buscar_usuario"]))
    {
        $correo = $_POST["correo"];
        $controller->buscarUsuario($correo);
    }

    if(isset($_POST["actualizar_password"]))
    {
        $correo = $_POST["correo"];
        $password = $_POST["password"];
        $controller->actualizarPassword($correo, $password);
    }

}

?>