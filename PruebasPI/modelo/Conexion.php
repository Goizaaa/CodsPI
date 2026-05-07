<?php
require_once "config.php";

class Conexion
{
    protected $db; 

    public function __construct()
    {
        $this->db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($this->db->connect_error)
{
    die("Error de conexion");
}
else
{
    echo "Conexion exitosa";
}

        //%%$this->db->set_charset(DB_CHARSET);
        //echo "Se conectó a la BD"; 
        //$obj = new Conexion();


}
    }


?>