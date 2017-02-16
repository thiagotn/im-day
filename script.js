var startCount = new Date(2017,1,15);
var nextDaysToShow = 12;
var weekendImg = '<img src="img/beer.png" alt="Smiley face" height="32" width="32">';

$(document).ready(function(){
	var users = ["Maicon", "Cezar", "Veiga", "Glauber", "Caio", "Gustavo", "Eduardo", "Thiago"];
	var count = 0;
	var actualUser = 0;
	var style = 'warning';
	var keepUser = false;
	var keepUserCount = -1;
	
	jQuery("#nextDays").append('Próximos ' + nextDaysToShow + ' dias');

	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	//console.log(yesterday);
	var yesterdayFound = false;

	do {

		if (isSameDay(yesterday, startCount)) {
			yesterdayFound = true;
		}

		if (isWeekend(startCount)) {
			keepUser = true;
			keepUserCount = actualUser;
			style = 'success'
			newRowContent = '<tr class="' + style +'"><td>' + formatDateString(startCount) + '</td><td>' + weekendImg + '</td></tr>';
		} else {
			if (count == 1) {
				style = 'danger'
			} else {
				style = 'warning'
			}
			newRowContent = '<tr class="' + style +'" ><td>' + formatDateString(startCount) + '</td><td>' + users[actualUser] + '</td></tr>';
		}

		if (yesterdayFound) {
			jQuery("#table tbody").append(newRowContent);
		}

		if (keepUser) {
			actualUser = keepUserCount;
			keepUser = false;
			style = 'warning';
		} else if (actualUser < users.length -1) {
			actualUser++;
		} else {
			actualUser = 0;
		}			


		startCount.setDate(startCount.getDate() + 1);
		count++;

	} while (count < nextDaysToShow);
	
});

function formatDateString(dateToBeFormated) {
	var today = new Date();

	if (dateToBeFormated.getUTCDate() == (today.getUTCDate() - 1) 
		&& dateToBeFormated.getUTCMonth() == today.getUTCMonth() 
		&& dateToBeFormated.getUTCFullYear() == today.getUTCFullYear()) {
		return 'Ontem (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	}

	if (dateToBeFormated.getUTCDate() == today.getUTCDate() 
		&& dateToBeFormated.getUTCMonth() == today.getUTCMonth() 
		&& dateToBeFormated.getUTCFullYear() == today.getUTCFullYear()) {
		return 'Hoje (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	}

	if (dateToBeFormated.getUTCDate() == (today.getUTCDate() + 1) 
		&& dateToBeFormated.getUTCMonth() == today.getUTCMonth() 
		&& dateToBeFormated.getUTCFullYear() == today.getUTCFullYear()) {
		return 'Amanhã (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	}

	var stringDate = dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1) + '/' + dateToBeFormated.getUTCFullYear();
	switch(dateToBeFormated.getDay()) {
	    case 0:
	        stringDate = 'Domingo (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	        break;
	    case 1:
	        stringDate = 'Segunda (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	        break;
	    case 2:
	        stringDate = 'Terça (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	        break;
	    case 3:
	        stringDate = 'Quarta (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	        break;
	    case 4:
	        stringDate = 'Quinta (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	        break;        
	    case 5:
	        stringDate = 'Sexta (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	        break;
	    case 6:
	        stringDate = 'Sábado (' + (dateToBeFormated.getUTCDate() + '/' + (dateToBeFormated.getUTCMonth()+1)) + ')';
	        break;
	}
    return stringDate;
}

function isWeekend(dateToCheck) {
	return (dateToCheck.getDay() == 6 || dateToCheck.getDay() == 0);
}

function walkUntilYesterday(dateStart) {
	var today = new Date();
	var yesterday = today.setDate(today.getDate() - 1);
	return isSameDay(yesterday, dateStart);
}

function isSameDay(date1, date2) {
	return (date1.getUTCDate() == date2.getUTCDate()
		&& date1.getUTCMonth() == date2.getUTCMonth()
		&& date1.getUTCFullYear() == date2.getUTCFullYear());
}
