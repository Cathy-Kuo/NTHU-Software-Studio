var Calculator = /** @class */ (function () {
    /// ToDo 2: Set this.DOMObject to function parameter _domObj.(get object of output screen)
    function Calculator(_domObj) {
        /// ToDo 1: Create fields that holds the following things:
        ///         > 1. A DOM object that holds the output screen object (any). 
        ///         > 2(Optional). A flag for checking first input (boolean).
        this.DomObj = null;
        this.firstInput = true;
        this.DomObj = _domObj;
    }
    /// ToDo 3: Complete the 'calculate' function.
    ///         Note that you will use 'this.DOMObject.value = xxx', 
    ///         not 'getElementById' or any jQuery in this function.
    Calculator.prototype.calculate = function (str) {
        if (str == 'C') {
            this.DomObj.value = '0';
            this.firstInput = true;
        }
        else if (str == '=') {
            try {
                this.DomObj.value = eval(this.DomObj.value);
                this.firstInput = true;
            }
            catch (e) {
                this.DomObj.value = 'error';
                this.firstInput = true;
            }
        }
        else {
            if (this.firstInput && str != '.')
                this.DomObj.value = str;
            else if (this.firstInput && str == '.')
                this.DomObj.value = "0.";
            else
                this.DomObj.value += str;
            this.firstInput = false;
        }
    };
    return Calculator;
}());
