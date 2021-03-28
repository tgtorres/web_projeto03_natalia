export function phoneFormat(number) {

	let x;

	if (number.length == 10 ) {
		x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/)
	} else if (number.length == 11 ) {
		x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
	}
								
	return '(' + x[1] + ') ' + x[2] + '-' + x[3];
}