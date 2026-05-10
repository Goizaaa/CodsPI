<?php
require_once "config.php";

class Conexion
{
    protected $db;

    public function __construct()
    {
        $this->db = new mysqli(
            DB_HOST,
            DB_USER,
            DB_PASS,
            DB_NAME
        );

        if ($this->db->connect_error)
        {
            die("Error de conexion: " . $this->db->connect_error);
        }

        $this->db->set_charset("utf8");
    }
}
?>