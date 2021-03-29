export function phoneFormat(number) {
	
	let v = number.replace(/\D/g,"");       

    v = v.length > 11 ? v.substring(0,11) : v;
    
    v = v.replace(/^(\d{2})(\d)/g,"($1) $2"); 
    v = v.replace(/(\d{1,5})(\d{4})$/,"$1-$2");


	return v;
}

export function dateTimeFormat(value) {

	let [date, time] = value.split(' ');

	let [d1, d2, d3] = date.split('-');

	return `${d3}/${d2}/${d1} ${time}`;

}