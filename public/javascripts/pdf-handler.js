// https://app-u67kdhsycq-uc.a.run.app

// https://www.youtube.com/watch?v=G2FoSpsq3Rw

var hanlder = 'printer';
var defaultName = 'Escriba el nombre del vecino';
const corretivePatter = `0${ 'printer' === hanlder ? '2': '1'}-0000-0000-`;
loadValues = () => {
	document.getElementById('dateEmit').value = new Date().toISOString().split('T')[0];
	document.getElementById('customer-name').value = defaultName;
	document.getElementById('customer-recipt-prefix').innerHTML = corretivePatter;
	document.getElementById('customer-recipt').value = "#_#_#";
}


document.getElementById('generate').onclick = function () {
	/** 
	 * @correlative 
	 * validando logica del correlativo
	*/
	var correlative = document.getElementById('customer-recipt').value
	const isWrongCorrelative = '_____' !== correlative && (isNaN(correlative) || isNaN(parseInt(correlative)) || parseInt(correlative) <= 0)
	if(isWrongCorrelative) {
		alert(`El campo Recibo #: ${correlative} debe ser un numera valido mayor que 0`)
	}
	/**
	 * @clientName
	 * logica de validacion del nombre de recibo
	*/
	var clientName = document.getElementById('customer-name').value;
	const isWrongName = defaultName === clientName
	if(isWrongName ) {
		alert(`Debe ingresar un nombre de la persona a quien se esta extendiendo el recibo en proceso`)
	}
    /**
	 * @html2pdf
	 * set de propiedades para la creacion del archivo
	*/
	if(!isWrongCorrelative && !isWrongName) {
		clientName = clientName ? clientName.toUpperCase().replace('.','').replace('SR','').replace('SRA','') : '';
		var fileName = `RECIBO ${clientName} COPACABANA`;
		var element = document.getElementById('element-to-print');
		var opt = {
			filename:fileName,
			jsPDF: { format: 'letter', orientation: 'landscape' }
		  };
		html2pdf(element, opt);
	}
};

document.getElementById('mode').onchange = function () {
	const e = document.getElementById("mode");
    const value = e.value;
	hanlder = value;
	let patter = `0${ 'printer' === hanlder ? '2': '1'}-0000-0000-`;
	document.getElementById('customer-recipt-prefix').innerHTML = patter
};

// document.getElementById('generateCanvas').onclick = function () {
// 	var element = document.getElementById('element-to-print');
// 	html2canvas(element).then(function (canvas) {
//   	document.body.appendChild(canvas);
//   });
// };