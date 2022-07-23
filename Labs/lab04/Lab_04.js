var string = '';
var num='';
var ops='';

function show(input) {
    if (input === '=') {
        string = eval(string);
    }
    
    string = string + input;
    console.log(string);

    document.getElementById('screen').value = string;
}

function eva(input) {
    try {
        string = eval(string);
    } catch {
        string = 'error';
    }

    console.log(string);

    document.getElementById('screen').value = string;
}

function clearall(input) {
    string=0;
    document.getElementById('screen').value = string;
    string='';
}