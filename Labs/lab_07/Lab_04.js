var firstInput = true;
function calculate(str){

    var result = document.getElementById("screen");
    
    if(str == 'C'){
        result.value='0';
        firstInput = true;
    }
    else if(str == '='){
        try{
            result.value = eval(result.value);	
            firstInput = true;
        }
        catch(e){
            result.value = 'error'
            firstInput = true;
        }
    }
    else{
        if(firstInput && str != '.')
            result.value = str; 
        else if(firstInput && str == '.')
            result.value = "0.";
        else
            result.value += str;
        firstInput = false;
    }
}