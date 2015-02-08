<?php

	class mySQL{

		private $servidor, $usuario, $senha, $link;

		function __construct()
		{
			$this->servidor = 'localhost';
			$this->usuario = 'u321650215_jgp';
			$this->senha = '@@johnny@@2012';
			$this->link = $this->abrir_conexao();
		}

		function __destruct()
		{
			$this->fechar_conexao();
		}

		public function send_Query($_query) {

			if($res = $this->link->query($_query, MYSQLI_STORE_RESULT)) {

				return mysqli_fetch_object($res);

			} else {

				return -1;
			}

		}

		private function abrir_conexao()
		{
			$conn = new mysqli($this->servidor, $this->usuario, $this->senha);
			if(!$conn)
			{
				die('Não foi possível conectar!'.mysqli_error());

			} else {
				return $conn;
			}

		}

		public function fechar_conexao()
		{
			mysqli_close($this->link);
		}

		public function selecionar_bd($_bd)
		{
			$sel = mysqli_select_db($this->link, $_bd);
			if(!$sel)
			{
				die('Não foi possível selecionar o bd!'.mysql_error());

			} else {
				return $sel;
			}
		}

	}
	

?>