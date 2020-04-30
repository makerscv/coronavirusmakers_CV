<?php
require('conexion.php');

$consultaBusqueda = $_POST['comarca'];

//Filtro anti-XSS
$caracteres_malos = array("<", ">", "\"", "'", "/", "<", ">", "'", "/");
$caracteres_buenos = array("&lt;", "&gt;", "&quot;", "&#x27;", "&#x2F;", "&#060;", "&#062;", "&#039;", "&#047;");
$consultaBusqueda = str_replace($caracteres_malos, $caracteres_buenos, $consultaBusqueda);

//Variable vacía (para evitar los E_NOTICE)
$mensaje = "";

if (isset($consultaBusqueda)) {

	$consulta = mysqli_query($conexion, "SELECT * FROM comarcas_bien
	WHERE comarca LIKE '".$consultaBusqueda."'");

	//Obtiene la cantidad de filas que hay en la consulta
	$filas = mysqli_num_rows($consulta);

	$unidades = 0;
	if ($filas > 0) {
		//La variable $resultado contiene el array que se genera en la consulta, así que obtenemos los datos y los mostramos en un bucle
		while($resultados = mysqli_fetch_array($consulta)) {
			$codigo_postal = $resultados['codigo_postal'];
			$consulta1 = mysqli_query($conexion, "SELECT * FROM pedidos
			WHERE codigo_postal='".$codigo_postal."' AND entregado='SI' 
			AND NOT anulacion = 'SI'");
			$filas1 = mysqli_num_rows($consulta1);
			if ($filas1 > 0) {
				while($resultados1 = mysqli_fetch_array($consulta1)) {
					//echo $resultados1['unidades'].' '.$codigo_postal."\n";
					$unidades = (int)$resultados1['unidades'] + $unidades;
				};
			};
		};//Fin while $resultados
	}; //Fin else $filas
};
echo $unidades;
?>
