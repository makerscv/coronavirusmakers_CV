var regions=[
//CASTELLO
    { "regio_nom": "Ports","entregadas":0,"pendientes":0 },
    { "regio_nom": "BaixMaestrat","entregadas":0,"pendientes":0 },
	{ "regio_nom": "AltMaestrat","entregadas":0,"pendientes":0 },
    { "regio_nom": "Alcalaten","entregadas":0,"pendientes":0 },
    { "regio_nom": "PlanaAlta","entregadas":0,"pendientes":0 },
    { "regio_nom": "PlanaBaixa","entregadas":0,"pendientes":0 },
    { "regio_nom": "AltMillars","entregadas":0,"pendientes":0 },
    { "regio_nom": "AltPalancia","entregadas":0,"pendientes":0 },
//VALENCIA
    { "regio_nom": "RacoDAdemus","entregadas":0,"pendientes":0 },
    { "regio_nom": "Serrans","entregadas":0,"pendientes":0 },
	{ "regio_nom": "CampDeTuria","entregadas":0,"pendientes":0 },
    { "regio_nom": "CampDeMorvedre","entregadas":0,"pendientes":0 },
    { "regio_nom": "HortaNord","entregadas":0,"pendientes":0 },
    { "regio_nom": "Valencia","entregadas":0,"pendientes":0 },
    { "regio_nom": "HortaOest","entregadas":0,"pendientes":0 },
    { "regio_nom": "HortaSud","entregadas":0,"pendientes":0 },
    { "regio_nom": "PlanaDUtielRequena","entregadas":0,"pendientes":0 },
    { "regio_nom": "FoiaDeBunyol","entregadas":0,"pendientes":0 },
	{ "regio_nom": "VallDeCofrents","entregadas":0,"pendientes":0 },
    { "regio_nom": "CanalDeNavarres","entregadas":0,"pendientes":0 },
    { "regio_nom": "RiberaAlta","entregadas":0,"pendientes":0 },
    { "regio_nom": "RiberaBaixa","entregadas":0,"pendientes":0 },
    { "regio_nom": "Costera","entregadas":0,"pendientes":0 },
    { "regio_nom": "VallDAlbaida","entregadas":0,"pendientes":0 },
    { "regio_nom": "Safor","entregadas":0,"pendientes":0 },
//ALACANT
    { "regio_nom": "AltVinalopo","entregadas":0,"pendientes":0 },
    { "regio_nom": "Alcoia","entregadas":0,"pendientes":0 },
	{ "regio_nom": "Comtat","entregadas":0,"pendientes":0 },
    { "regio_nom": "MarinaAlta","entregadas":0,"pendientes":0 },
    { "regio_nom": "MarinaBaixa","entregadas":0,"pendientes":0 },
    { "regio_nom": "VinalopoMitja","entregadas":0,"pendientes":0 },
    { "regio_nom": "Alacanti","entregadas":0,"pendientes":0 },
    { "regio_nom": "BaixVinalopo","entregadas":0,"pendientes":0 },
    { "regio_nom": "VegaBaja","entregadas":0,"pendientes":0 }
];



//var temp_array= regions.map(function(item){
//    return item.poblacio;
//});
//var highest_value = Math.max.apply(Math, temp_array);

$(function() {
	var modal = document.getElementById("modal-form");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
    for(i = 0; i < regions.length; i++) {
//        $('#'+ regions[i].regio_nom)
//        .css({'fill': 'rgba(11, 104, 170,' + regions[i].poblacio/highest_value +')'});
//		$('#'+ regions[i].regio_nom).data('iregio',regions[i].poblacio);
		pendientes(regions[i].regio_nom);
		entregadas(regions[i].regio_nom);
    }

    $('.map path').mouseover(function (e) {
		for(i = 0; i < regions.length; i++)  {
			if(this.id == regions[i].regio_nom) {
				vpendientes = 0;
				ventregadas = 0;
				vnom = this.id;
				regions.map(function(dato){
					if(dato.regio_nom==vnom) {
						vpendientes=dato.pendientes;
					}
				});
				regions.map(function(dato){
					if(dato.regio_nom==vnom) {
						ventregadas=dato.entregadas;
					}
				});
				datos = 'Pendientes: '+vpendientes+' Entregadas: '+ventregadas;
				$('<div class="info_panel">'+this.id+
				'<br>'+datos+'</div>')
				.appendTo('body');
				$('<div class="info_panel2">'+
				'<br>Coordinador/a:'+
				'<br>Centro Logistico:'+
				'<br>Recogidas:'+
				'<br>Proveedores:'+
				'<br>Materiales:'+
				'</div>')
				.appendTo('body');
			}
		}

    })
    .mouseleave(function () {
        $('.info_panel').remove();
		$('.info_panel2').remove();
    })
    .mousemove(function(e) {
        var mouseX = e.pageX, //X coordinates of mouse
            mouseY = e.pageY; //Y coordinates of mouse

        $('.info_panel').css({
            top: mouseY-50,
            left: mouseX - ($('.info_panel').width()/4)
        });
        $('.info_panel2').css({
            top: mouseY-50,
            left: mouseX + ($('.info_panel').width()*3/4) + 15
        });
    })
	.click(function(e) {
		$('#comarca').html('<b>'+this.id+'</b>');
		$('#pendientes').html(vpendientes);
		$('#entregadas').html(ventregadas);
		modal.style.display = "block";
	});

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

});

function pendientes(comarca) {
	var parametros = {
		"comarca":comarca
	};
	$.ajax({
		data: parametros,
		url: 'php/busca_pendientes.php',
		type: 'POST',
		success: handleResponse
	});
	function handleResponse(data) {
		regions.map(function(dato){
			if(dato.regio_nom==comarca) {
				dato.pendientes=data;
			}
		});
		$('#p'+comarca).text(data);
	};
}

function entregadas(comarca) {
	var parametros = {
		"comarca":comarca
	};
	$.ajax({
		data: parametros,
		url: 'php/busca_entregadas.php',
		type: 'POST',
		success: handleResponse
	});
	function handleResponse(data) {
		regions.map(function(dato){
			if(dato.regio_nom==comarca) {
				dato.entregadas=data;
			}
		});
		$('#e'+comarca).text(data);
	};
}

