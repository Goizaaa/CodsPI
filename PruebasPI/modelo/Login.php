<?php

class Database {

    private string $host = "localhost";
    private string $user = "root";
    private string $password = "root";
    private string $dbname = "bdveterinaria";

    private mysqli $conn;

    public function __construct() {

        $this->conn = new mysqli(
            $this->host,
            $this->user,
            $this->password,
            $this->dbname
        );

        if ($this->conn->connect_error) {

            die("Error de conexion: " . $this->conn->connect_error);

        }
    }

    public function create(string $table, array $data): bool {

        $columns = implode(", ", array_keys($data));

        $placeholders = implode(", ", array_fill(0, count($data), "?"));

        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";

        $stmt = $this->conn->prepare($sql);

        $types = str_repeat("s", count($data));

        $stmt->bind_param($types, ...array_values($data));

        $result = $stmt->execute();

        $stmt->close();

        return $result;
    }

    public function read(string $table, string $condition = "1"): array {

        $sql = "SELECT * FROM $table WHERE $condition";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->get_result();

        $stmt->close();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function update(string $table, array $data, string $condition): bool {

        $set = implode(", ", array_map(fn($key) => "$key = ?", array_keys($data)));

        $sql = "UPDATE $table SET $set WHERE $condition";

        $stmt = $this->conn->prepare($sql);

        $types = str_repeat("s", count($data));

        $stmt->bind_param($types, ...array_values($data));

        $result = $stmt->execute();

        $stmt->close();

        return $result;
    }

    public function delete(string $table, string $condition): bool {

        $sql = "DELETE FROM $table WHERE $condition";

        $stmt = $this->conn->prepare($sql);

        $result = $stmt->execute();

        $stmt->close();

        return $result;
    }

    public function __destruct() {

        $this->conn->close();
    }
}

$db = new Database();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (isset($_POST["crear"])) {

        $correo = trim($_POST["correo"]);
        $password = trim($_POST["password"]);
        $nombre = trim($_POST["nombre"]);

        $buscarUsuario = $db->read(
            "usuarios",
            "correo = '$correo'"
        );

        if (count($buscarUsuario) > 0) {

            echo "El correo ya esta registrado";

        } else {

            // Guardar contraseña en texto plano (sin cifrar)
            $crearUsuario = $db->create(
                "usuarios",
                [
                    "correo" => $correo,
                    "password" => $password, // Contraseña en texto plano
                    "nombre" => $nombre
                ]
            );

            if ($crearUsuario) {

                echo "Cuenta creada correctamente";

            } else {

                echo "Error al crear la cuenta";
            }
        }
    }
    
    if (isset($_POST["login"])) {

        $correo = trim($_POST["correo"]);
        $password = trim($_POST["password"]);

        $buscarUsuario = $db->read(
            "usuarios",
            "correo = '$correo'"
        );

        if (count($buscarUsuario) > 0) {

            $usuario = $buscarUsuario[0];

            // Comparación directa en texto plano
            if ($password == $usuario["password"]) {

                echo "Inicio de sesion correcto";

            } else {

                echo "Contraseña incorrecta";
            }

        } else {

            echo "El usuario no existe";
        }
    }
}
?>