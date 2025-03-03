window.onload = function () {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

          
    outputElement = document.getElementById("result")

    
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    resultButton = document.getElementById("btn_op_equal")

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                outputElement.innerHTML = b
            }
        }
    }

                                  
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

                                              
    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function () {
        if (a === '') return
        selectedOperation = '%'
    }
    document.getElementById("btn_op_sign").onclick = function () {
        if (a === '') return
        selectedOperation = '+/-'
    }
    document.getElementById("btn_op_sin").onclick = function () {
        if (a === '') return
        selectedOperation = 'sin'
    }

    //                
    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    function setColorBasedOnResult(result) {
    
        const hue = 174; 
        const saturation = 50; 
        const originalLightness = 60; 

        const newLightness = originalLightness * (1 - result);
        resultButton.style.background = `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
         
    }
                          
    resultButton.onclick = function () {
        if (a === '' || (selectedOperation !== 'sin' && selectedOperation !== '+/-' && selectedOperation !== '%' && b === '') || !selectedOperation) {
            return;
        }
    
        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
            case '+/-':
                expressionResult = (-a);
                break;
            case '%':
                expressionResult = (+a) * 0.01;
                break;
            case 'sin':
                expressionResult = Math.abs(Math.sin(+a));
        }
    
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
    
        outputElement.innerHTML = a;
        setColorBasedOnResult(expressionResult);
    }
};
