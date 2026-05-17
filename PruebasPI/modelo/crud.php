<?php
require_once("config.php");

class Database {
    private $host = DB_HOST;
    private $user = DB_USER;
    private $password = DB_PASS;
    private $dbname = DB_NAME;
    private $conn;   // Objeto mysqli

    public function __construct() {
        $this->conn = new mysqli(
            $this->host,
            $this->user,
            $this->password,
            $this->dbname
        );

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }

        $this->conn->set_charset(DB_CHARSET);
    }

    public function create($table, $data) {
        $columns = implode(", ", array_keys($data));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));

        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $stmt = $this->conn->prepare($sql);

        $types = str_repeat("s", count($data));
        $values = array_values($data);

        $stmt->bind_param($types, ...$values);

        $result = $stmt->execute();

        $stmt->close();

        return $result;
    }

    public function read($table, $condition = "1") {
        $sql = "SELECT * FROM $table WHERE $condition";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->get_result();
        $datos = $result->fetch_all(MYSQLI_ASSOC);

        $stmt->close();

        return $datos;
    }

    public function update($table, $data, $condition) {
        $campos = array();

        foreach (array_keys($data) as $key) {
            $campos[] = $key . " = ?";
        }

        $set = implode(", ", $campos);

        $sql = "UPDATE $table SET $set WHERE $condition";
        $stmt = $this->conn->prepare($sql);

        $types = str_repeat("s", count($data));
        $values = array_values($data);

        $stmt->bind_param($types, ...$values);

        $result = $stmt->execute();

        $stmt->close();

        return $result;
    }

    public function delete($table, $condition) {
        $sql = "DELETE FROM $table WHERE $condition";
        $stmt = $this->conn->prepare($sql);

        $result = $stmt->execute();

        $stmt->close();

        return $result;
    }
    public function readCustom($sql) {
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->get_result();
    $datos = $result->fetch_all(MYSQLI_ASSOC);

    $stmt->close();

    return $datos;
}


    public function __destruct() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
}
?>