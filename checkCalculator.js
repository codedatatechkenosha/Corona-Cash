let userInfo = {
	maritalStatus: false,
	income: 0,
	children: 0
}

let formElements = {}

formElements.form = document.getElementById("checkForm");
formElements.maritalStatus = document.getElementsByName("maritalStatus");
formElements.income = document.getElementById("income");
formElements.children = document.getElementById("children");
formElements.submitBtn = document.getElementById("submitBtn");

var checkResultDiv = document.getElementById("checkTotal");

//updates form values
function updateValues(){
	if(formElements.maritalStatus[0].checked){
		userInfo.maritalStatus = true;
	} else{
		userInfo.maritalStatus = false;
	}

	userInfo.income = formElements.income.value;
	userInfo.children = formElements.children.value;
}

formElements.form.onchange = updateValues;


//displays a number to the web page
function displayCheck(total){
	checkResultDiv.innerHTML = "Your estimated check total is $" + total;
}


//calculates check
function calculate(maritalStatus, income, children){
	//bool as a number in javascript is 0 or 1
	maritalStatus = maritalStatus+1;
	let check = 1200 * (maritalStatus);
	let cap = 75000 * (maritalStatus);


	if(income > cap){
		check = check - ((income-cap) / 100 * 5);
	}

	if(income == 0){
		check = 600 * maritalStatus;
	}

	check = check + children * 500;

	return check;
}

var submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = function(){
	displayCheck(calculate(userInfo.maritalStatus, userInfo.income, userInfo.children));
}