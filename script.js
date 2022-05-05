const codigo = [];
var maxIntento = 8;

/*1. Genera una constante CODIGO_SECRETO de tipo array de 5 número aleatorios entre 0 y 9 usando la libreria Math.random();*/
function codigoSecreto() {
    for (let i = 0; i < 5; i++) {
        codigo[i] = Math.floor((Math.random() * 10));
    }
    console.log(codigo)
}

codigoSecreto();

document.addEventListener('DOMContentLoaded', function () {
    console.log(2)
    let resultField = document.getElementById('Result')
    appendResultRowTo(resultField)
}, false);


let appendResultRowTo  = (container) => {   
    container.innerHTML = null 
    for (let i = 0; i < maxIntento ; i++) {
        let row = createResultRow()
        for(let j = 0; j < 5 ; j++){
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
    maxIntento = prompt('Quants intents vols?')
    let resultField = document.getElementById('Result')
    appendResultRowTo(resultField)
}
