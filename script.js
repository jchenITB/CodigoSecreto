const code = [];
var maxTry = 8;
var currentTry
var size = 5


document.addEventListener('DOMContentLoaded', function () {
    setup()
}, false);

document.getElementById('numero').addEventListener('keypress', (event) =>{
    if(event.key.replace(/[^0-9.]/g, '') == ''){
        event.preventDefault()
    }
    if(event.key == 'Enter'){
        Comprobar()
    }
})

let setup = () =>{
    currentTry = 0
    codigoSecreto();
    let resultField = $('Result')
    appendResultRowTo(resultField)
    let numberInput = $('numero')
    numberInput.value = ""
    numberInput.attributes['maxlength'].value = size
    $('restart').classList.add('hide')
    $('check').classList.remove('hide')
    $('infoBox').classList.remove('win','lose')
    $('infoBox').classList.add('hide')
    $('numero').removeAttribute('disabled')
    let codeCels = $('codigo').getElementsByClassName("cel")
    for (let i = 0; i < size ; i++) {
        codeCels[i].innerText = "?"
    }
}


let Comprobar = () => {
    let guess = document.getElementById('numero')
    
    if(guess.value.length != size){
        showInfo('Por favor, escribe '+size+' digitos')
        return false
    }

    let guessList = guess.value.split('').map(str => Number(str))
    if(currentTry < maxTry){
        for(let i = 0; i < guessList.length ; i++){
            drawResult(guessList[i],i)
        }
        currentTry++

    }
    guess.value = ''
    guess.focus()
    checkGameOver(guessList)
    
}

let end = (className, message) => {
    $('infoBox').classList.add(className)
    $('info').innerText = message
    $('infoBox').classList.remove('hide')
    $('restart').classList.remove('hide')
    $('check').classList.add('hide')
    $('numero').setAttribute("disabled", "")
}


let drawResult = (guessNumber, position) =>{
    let resultField = document.getElementsByClassName('rowResult')[currentTry].getElementsByClassName('celResult')[position]
    resultField.innerText = guessNumber
    let resultClass = checkNumber(guessNumber, position)
    if(resultClass != "") resultField.classList.add(resultClass)
}

let checkNumber = (guessNumber, position) =>{
    if(code[position] == guessNumber){
        return 'correct'
    }else{
        if(code.includes(guessNumber)){
            return 'exists'
        }
    }
    return ""
}

let checkGameOver = (guessList) =>{
    if(currentTry < maxTry && JSON.stringify(guessList)==JSON.stringify(code)){
        end('win','CONGRATULATION! YOU WON!')
        let codeCels = $('codigo').getElementsByClassName("cel")
        for (let i = 0; i < size ; i++) {
            codeCels[i].innerText = guessList[i]
        }
    }else if(currentTry == maxTry){
        end('lose','YOU LOST!')
    }
}


let showInfo = (info) =>{
    $('numero').focus()
    let infoBox = $('infoBox')
    let infoBody = $('info')
    if(infoBox.classList.contains('hide')){
        infoBody.innerText = info
        infoBox.classList.remove('hide')
        setTimeout(() => {
            infoBox.classList.add('hide')
        }, 2000);
    }    
}


let codigoSecreto = () => {
    for (let i = 0; i < size; i++) {
        code[i] = Math.floor((Math.random() * 10));
    }
    log(code)
}


let appendResultRowTo  = (container) => {   
    container.innerHTML = null 
    for (let i = 0; i < maxTry ; i++) {
        let row = createResultRow()
        for(let j = 0; j < size ; j++){
            row.append(createResultField())
        }
        container.append(row)
    }
}

let createResultRow = () => {
    let row = document.createElement('div')
    row.className = 'rowResult w100 flex wrap'
    return row
}

let createResultField = () => {
    let fieldBox = document.createElement('div')
    fieldBox.className = 'w20'
    let field = document.createElement('div')
    field.className = 'celResult flex'
    fieldBox.append(field)
    return fieldBox
}

let setting = () =>{
    let newMaxTry = prompt('Quants intents vols?')
    if(newMaxTry != null){
        maxTry = newMaxTry
        let resultField = $('Result')
        appendResultRowTo(resultField)
        setup()
    }
}

let log = (x) =>{
    console.log(x)
}

let $ = (id) =>{
    return document.getElementById(id)
}