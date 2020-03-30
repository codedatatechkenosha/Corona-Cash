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
updateValues();

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

var APIendpoint = "https://yson8uaot4.execute-api.us-east-1.amazonaws.com/default/calculate";

function calculateCheckApi(maritalStatus, income, children){
	$.ajax({
		type: "GET",
		url: APIendpoint+"?marital_status="+(maritalStatus+1)+"&income="+income+"&children="+children,
		success: function(checkTotal){
			console.log(checkTotal);
			displayCheck(checkTotal["checkTotal"]);
		}
	}
	);
}

var errorCase = {
	maritalStatus: "Marital Status",
	income: "Income",
	children: "Children"
}

function infoError(formElements){
	var error = "";
	if(!formElements.maritalStatus[0].checked && !formElements.maritalStatus[1].checked){
		error += errorCase.maritalStatus + ", ";
	}

	if(formElements.income.value.length == 0 || formElements.income.value < 0){
		error += errorCase.income + ", ";
	}

	if(formElements.children.value.length == 0 || formElements.children.value < 0){
		error += errorCase.children;
	}

	return error;
}

var errorDiv = document.getElementById("errDiv");

function displayError(error){
	errorDiv.innerHTML = "Please fill out the following Fields: " + error;
}

function clearError(){
	errorDiv.innerHTML = "";
}

var submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = function(){
	let errorString = infoError(formElements);
	console.log(errorString);
	if(errorString.length > 0){
		displayError(errorString);
	} else{
		clearError();
		//displayCheck(calculate(userInfo.maritalStatus, userInfo.income, userInfo.children));
		calculateCheckApi(userInfo.maritalStatus, userInfo.income, userInfo.children);
	}
}