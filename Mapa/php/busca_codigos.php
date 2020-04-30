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

	//Si no existe ninguna fila que sea igual a $consultaBusqueda, entonces mostramos el siguiente mensaje
	if ($filas === 0) {
		$mensaje = "<p>No se ha encontrado el codigo postal</p>";
	} else {
		//La variable $resultado contiene el array que se genera en la consulta, así que obtenemos los datos y los mostramos en un bucle
		while($resultados = mysqli_fetch_array($consulta)) {
			$codigo_postal = $resultados['codigo_postal'];
			$poblacion = $resultados['poblacion'];
			$provincia = $resultados['provincia'];
			//$mensaje .= ' Codigo Postal: '.$codigo_postal.' Poblacion:'.$poblacion.' Provincia:'.$provincia;
			$mensaje .= $codigo_postal.' ';
		};//Fin while $resultados
	}; //Fin else $filas
};//Fin isset $consultaBusqueda
//Devolvemos el mensaje que tomará jQuery
echo $mensaje;
?>
