/* VARIABLES
==================================================================================================== */

var Memory;
var Current;
var Operation;
var MAXLENGTH;

/* BOOT FUNCTION
==================================================================================================== */

function postLoad(){
	Memory  = "0";
	Current = "0";
	Operation = 0;
	MAXLENGTH = 30;
}

/* CALCULATOR
==================================================================================================== */

/* Add digit to calculator */
function addDigit(dig){
	if (Current.length > MAXLENGTH){
		Current = "Too long";
	}else{
		if ((eval(Current) == 0) && (Current.indexOf(".") == -1)){
			Current = dig;
		}else{
			Current = Current + dig;
		};
	};
	renderDisplay();
	console.log('Digit added');
}

/* Create an exponent function */
function doExponent(){
	if (Current.indexOf("e") == -1){
		Current = Current + "e0";
		renderDisplay();
	};
	console.log('Converted to exponent');
}

function addDot(){
	if (Current.length == 0){
		Current = "0.";
	}else{
		if (Current.indexOf(".") == -1){
			Current = Current + ".";
		};
	};
	renderDisplay();
	console.log('Dot added');
}

/* Swap positive to negative */
function PlusMinus(){
	if (Current.indexOf("e") != -1){
		var epos = Current.indexOf("e-");
		if (epos != -1){
			Current = Current.substring(0,1+epos) + Current.substring(2+epos);
		}else{
			epos = Current.indexOf("e");
			Current = Current.substring(0,1+epos) + "-" + Current.substring(1+epos);
		};
	}else{
		if (Current.indexOf("-") == 0){
			Current = Current.substring(1);
		}else{
			Current = "-" + Current;
		};
	};
	renderDisplay();
	console.log('Swapped between plus and minus');
}

/* Add arithmetic function */
function Operate(op){
	if (op.indexOf("*") > -1) { Operation = 1; };
	if (op.indexOf("/") > -1) { Operation = 2; };
	if (op.indexOf("+") > -1) { Operation = 3; };
	if (op.indexOf("-") > -1) { Operation = 4; };

	Memory = Current;
	Current = "";
	renderDisplay();
	console.log('Arithmetic function added');
}

/* Calculate input */
function Calculate(){ 
	if (Operation == 1) { Current = eval(Memory) * eval(Current); };
	if (Operation == 2) { Current = eval(Memory) / eval(Current); };
	if (Operation == 3) { Current = eval(Memory) + eval(Current); };
	if (Operation == 4) { Current = eval(Memory) - eval(Current); };
	
	Operation = 0;
	Memory    = "0";
	renderDisplay();
	console.log('Calculated');
}

/* Clear screen */
function Clear(){
	Current = "0";
	renderDisplay();
	console.log('Screen cleared');
}

/* Clear screen and memory */
function AllClear(){
	Current = "0";
	Operation = 0;
	Memory = "0";
	renderDisplay();
	console.log('Screen and memory cleared');
}

/* Show input on screen */
function renderDisplay(){
	$("#view").html(Current);
	console.log('Display rendered');
}

/* INPUT ACTIONS
==================================================================================================== */

/* Button functions */
$$('.number').tap(function() {
	console.log('Tap number >\nAction is add digit');
	var dig = $(this).attr('id');dig.replace('#', '');
	addDigit(dig);
});

$$('#dot').tap(function() {
	console.log('Tap on dot >\nAction is add dot');
	addDot();
});

$$('#clear').tap(function() {
	console.log('Tap on clear >\nAction is clear');
	Clear();
});

$$('#clear').hold(function() {
	console.log('Hold on clear >\nAction is full clear');
	AllClear();
});

/* Display functions */
$$('#display').swipeRight(function() {
	showSwipe("5");
	console.log('Swipe right on display >\nAction is calculate');
	Calculate();
});

$$('#display').doubleTap(function() {
	showSwipe("5");
	console.log('Double tap on display >\nAction is calculate');
	Calculate();
});

$$('#display').swipeUp(function() {
	console.log('Swipe up on display >\nAction is show advanced');
});

$$('#display').swipeDown(function() {
	console.log('Swipe down on display >\nAction is hide advanced');
});

/* Keypad functions */
$$('#keypad').swipeUp(function() {
	showSwipe("3");
	console.log('Swipe up on keypad >\nAction is +');
	Operate("+");
});

$$('#keypad').swipeDown(function() {
	showSwipe("4");
	console.log('Swipe down on keypad >\nAction is -');
	Operate("-");
});

$$('#keypad').swipeLeft(function() {
	showSwipe("2");
	console.log('Swipe left on keypad >\nAction is /');
	Operate("/");
});

$$('#keypad').swipeRight(function() {
	showSwipe("1");
	console.log('Swipe right on keypad >\nAction is *');
	Operate("*");
});

function showSwipe(kind){
	console.log('Swipe on keypad >\nAction is show Swipe');
	$("#tapBG").css({'background-image':'url(http://app.jasperberghoef.com/kalk/img/' + kind + '.png)'});
	$("#tapBG").fadeIn(100);
	$("#tapBG").delay(150).fadeOut(250);
	console.log('Tap rendered');
}