const inputs = document.querySelectorAll("input");
const mortgageContainer = document.querySelector(".mortg-container");
const mortgageTypes = document.querySelectorAll(".mortgage-type");
const clearer = document.querySelector("header span");
const form = document.querySelector("form");
const inputSection = document.querySelector("section");
const calculateButton = document.querySelector("button");
const mortgageError = mortgageContainer.querySelector(".input-container");
const emptyResult = document.querySelector(".empty-result");
const loadedResult = document.querySelector(".loaded-result");
const monthlyValue = document.querySelector(".monthly-value");
const totalRepayValue= document.querySelector(".repay-value");
const monthlyInterestValue = document.querySelector(".interest-value");
const interestResult = document.querySelector(".interest-result");
const paymentsResult = document.querySelector(".payments-result");
let selectedMortgage = false;
let readyToCalculate = true;
let optionTypes = ["repayment","interest"];

console.log(inputs);

for(let i=0;i<mortgageTypes.length;i++){
	mortgageTypes[i].optionType = optionTypes[i];
};

inputs.forEach(function(element){
	const parentContainer = element.parentElement.parentElement;
	parentContainer.classList.add("active");
	element.validInput = false;
	element.addEventListener("input",function(){
		if(element.value == ""){
			parentContainer.classList.add("active");
			element.validInput = false;
		}
		else{
			parentContainer.classList.remove("active");
			element.validInput = true;
		}
	});
});

clearer.addEventListener("click",function(){
	form.reset();
	inputSection.classList.remove("active");

	inputs.forEach(function(element){
		const parentContainer = element.parentElement.parentElement;
		if(element.validInput){
			parentContainer.classList.add("active");
			element.validInput = false;
		}
	});

	emptyResult.classList.remove("dn");
	loadedResult.classList.add("dn");
	readyToCalculate = true;
	selectedMortgage.classList.remove("active");
	selectedMortgage = false;
});

calculateButton.addEventListener("click",function(e){
	//e.preventDefault();
	inputSection.classList.add("active");
	inputs.forEach(function(element){
			const parentContainer = element.parentElement.parentElement;
			if(!element.validInput){
				parentContainer.classList.add("active");
				element.validInput = false;
				readyToCalculate = false;
			}
	});

	if(!selectedMortgage){
		mortgageError.classList.add("active");
		readyToCalculate = false;
	}

	if(readyToCalculate){
		inputs[0].value = inputs[0].value.replace(/[,.]/g,"");
		let principalAmount = parseFloat(inputs[0].value);
		let numberOfPayments = parseInt(inputs[1].value) * 12; 
		let monthlyInterestRate = parseFloat(inputs[2].value) / 100 / 12;
		let monthlyRepay = principalAmount * ( ((1+monthlyInterestRate) ** numberOfPayments * monthlyInterestRate) / ((1+monthlyInterestRate)**numberOfPayments -1) );
		console.log("monthly repay: ",monthlyRepay);
		console.log("type of monthlyRepay: ",typeof monthlyRepay);
		console.log(principalAmount,numberOfPayments,monthlyInterestRate);
		console.log("repay.tofixed(): ",monthlyRepay.toFixed(2), " and its type = ",typeof monthlyRepay.toFixed(2));
		emptyResult.classList.add("dn");
		loadedResult.classList.remove("dn");
		monthlyValue.textContent = `$${monthlyRepay.toFixed(2).toLocaleString()}`;
		totalRepayValue.textContent = `$${(monthlyRepay * 12 * parseInt(inputs[1].value)).toFixed(2).toLocaleString()}`;
		monthlyInterestValue.textContent = `${(monthlyRepay - principalAmount / numberOfPayments).toFixed()}`;
	}
});

mortgageTypes.forEach(function(element){
	element.addEventListener("click",function(){
		if(selectedMortgage){
			selectedMortgage.classList.remove("active");
			selectedMortgage = element;
		}
		else{
			selectedMortgage = element;
			mortgageError.classList.remove("active");
		}

		if(selectedMortgage.optionType == "interest"){
			paymentsResult.classList.add("dn");
			interestResult.classList.remove("dn");
		}
		else{
			paymentsResult.classList.remove("dn");
			interestResult.classList.add("dn");
		}

		selectedMortgage.classList.add("active");
	});
});
