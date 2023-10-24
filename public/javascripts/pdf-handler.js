// https://app-u67kdhsycq-uc.a.run.app

// https://www.youtube.com/watch?v=G2FoSpsq3Rw
loadValues = () => {
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = dd + '/' + mm + '/' + yyyy;


	document.getElementById('dateEmit').innerHTML = formattedToday;
	document.getElementById('customer-name').value = 'Escriba el nombre del vecino';
}


document.getElementById('generate').onclick = function () {
	var clientName = document.getElementById('customer-name').value;
	clientName = clientName ? clientName.toUpperCase().replace('.','').replace('SR','').replace('SRA','') : '';
	var fileName = `RECIBO ${clientName} COPACABANA`;
	var element = document.getElementById('element-to-print');
	var opt = {
		filename:fileName
	  };
	html2pdf(element, opt);
};

// document.getElementById('generateCanvas').onclick = function () {
// 	var element = document.getElementById('element-to-print');
// 	html2canvas(element).then(function (canvas) {
//   	document.body.appendChild(canvas);
//   });
// };