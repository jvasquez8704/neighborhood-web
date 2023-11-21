// https://app-u67kdhsycq-uc.a.run.app

// https://www.youtube.com/watch?v=G2FoSpsq3Rw
const SYSTEM_STR = 'system';
const PRINTER_STR = 'printer';
let hanlder = PRINTER_STR;
const defaultName = 'Escriba el nombre del vecino';
const defaultDescription = 'Pago por servicios de seguridad correspondiente al mes de [mes] de [año]';
const defaultNamePrint = '_________________________________';
const defaultCorrelativePrint = '_____';
const defaultDatePrint = '_____________';
const defaultCorrelativeSystem = '#####';
const defaultPricePatterSystem = '900.00';
const defaultPriceInLettersPatterSystem = 'Novecientos lempiras exactos';
const corretivePatter = `0${ 'printer' === hanlder ? '2': '1'}-0000-0000-`;
loadValues = () => {
	document.getElementById('dateEmit').value = '';
	document.getElementById('customer-name').value = defaultNamePrint;
	document.getElementById('customer-recipt-prefix').innerHTML = corretivePatter;
	document.getElementById('customer-recipt').value = defaultCorrelativePrint;
	document.getElementById('input-concept-desc').value = '';
	document.getElementById('unitPrice').value = 'L. ' + '      ';
	document.getElementById('totalPrice').value = 'Total: L. ' + '      ';
	document.getElementById('totalPriceText').value = '';
	document.getElementById("dateEmit").type = "text";
	document.getElementById("dateEmit").value = defaultDatePrint;
}

function getWordsFromNumber(number) {
    const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
    const decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
    const especiales = {
        10: "diez",
        11: "once",
        12: "doce",
        13: "trece",
        14: "catorce",
        15: "quince",
        20: "veinte"
    };

    if (especiales.hasOwnProperty(number)) {
        return especiales[number];
    }

    if (number < 10) {
        return unidades[number];
    }

    if (number < 100) {
        if (number % 10 === 0) {
            return decenas[Math.floor(number / 10)];
        } else {
            return decenas[Math.floor(number / 10)] + " y " + unidades[number % 10];
        }
    }

    if (number < 1000) {
        if (number % 100 === 0) {
            return unidades[Math.floor(number / 100)] + " cientos";
        } else {
            return unidades[Math.floor(number / 100)] + " cientos " + getWordsFromNumber(number % 100);
        }
    }
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
	 * @conceptDescription
	 * logica de validacion de la descricion
	*/
	var conceptDescription = document.getElementById('input-concept-desc').value;

	const isWrongDesc = hanlder === SYSTEM_STR && !conceptDescription
	if(isWrongDesc ) {
		alert(`Debe ingresar una descripción`)
	}

	const isWrongMonth = hanlder === SYSTEM_STR && conceptDescription.includes('[mes]')
	if(isWrongMonth ) {
		alert(`Debe ingresar el mes en la descripción`)
	}

	const isWrongYear = hanlder === SYSTEM_STR && conceptDescription.includes('[año]')
	if(isWrongYear ) {
		alert(`Debe ingresar el año en la descripción`)
	}
    /**
	 * @html2pdf
	 * set de propiedades para la creacion del archivo
	*/
	if(!isWrongCorrelative && !isWrongName && !isWrongDesc && !isWrongMonth && !isWrongYear) {
		clientName = clientName ? clientName.toUpperCase().replace('.','').replace('SR','').replace('SRA','') : '';
		var fileName = hanlder === PRINTER_STR ? PRINTER_STR.toUpperCase() :`RECIBO ${clientName} COPACABANA`;
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
	hanlder = e.value || SYSTEM_STR;
	let patter = `0${ PRINTER_STR === hanlder ? '2': '1'}-0000-0000-`;
	let patterCorrelative = `${ PRINTER_STR === hanlder ? defaultCorrelativePrint: defaultCorrelativeSystem}`;
	let patterName = `${ PRINTER_STR === hanlder ? defaultNamePrint : defaultName }`;
	let patterDesc = `${ PRINTER_STR === hanlder ? '' : defaultDescription }`;
	let patterPrice = `${ PRINTER_STR === hanlder ? 'L. ' + '      ' : 'L. ' + defaultPricePatterSystem }`;
	let patterTotal = `${ PRINTER_STR === hanlder ? 'Total: L. ' + '      ' : 'Total: L. ' + defaultPricePatterSystem}`;
	let patterDate = `${ PRINTER_STR === hanlder ? defaultDatePrint : new Date().toISOString().split('T')[0]}`;
	let patterPriceLetters = `${ PRINTER_STR === hanlder ? '' : defaultPriceInLettersPatterSystem }`;
	let patterTypeDate = `${ PRINTER_STR === hanlder ? 'text' : 'date' }`;
	document.getElementById('input-concept-desc').value = patterDesc;
	document.getElementById('customer-recipt-prefix').innerHTML = patter
	document.getElementById('customer-recipt').value = patterCorrelative;
	document.getElementById('dateEmit').value = '';
	document.getElementById('customer-name').value = patterName;
	document.getElementById('unitPrice').value = patterPrice;
	document.getElementById('totalPrice').value = patterTotal;
	document.getElementById("dateEmit").type = patterTypeDate;
	document.getElementById('dateEmit').value = patterDate;
	document.getElementById('totalPriceText').value = patterPriceLetters;
};

document.getElementById('unitPrice').onblur = function () {
	let unitPriceDirty = document.getElementById('unitPrice').value 
	console.log('before: ', unitPriceDirty);
	unitPriceDirty = unitPriceDirty.replace('L.', '').trim();
	console.log('after: ', unitPriceDirty);
	if(!isNaN(unitPriceDirty)) {
		document.getElementById('totalPrice').value = 'Total: L. ' + unitPriceDirty;
	}
}

// document.getElementById('generateCanvas').onclick = function () {
// 	var element = document.getElementById('element-to-print');
// 	html2canvas(element).then(function (canvas) {
//   	document.body.appendChild(canvas);
//   });
// };