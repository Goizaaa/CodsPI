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




            if(password_verify($password, $usuario["password"]))
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

            $passwordSegura = password_hash(
                $password,
                PASSWORD_DEFAULT
            );




            $sql = "INSERT INTO usuarios
                    (correo, password, nombre)
                    VALUES
                    ('$correo', '$passwordSegura', '$nombre')";

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

}

?>