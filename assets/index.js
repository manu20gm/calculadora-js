let acumulador = "0"; //Almacén temporal de numeros de uno o varios dígitos
let display = document.querySelector(".csres span");


let acumuladorRes = []; // Variable local acumuladora interna
let teclas = document.querySelectorAll(".push"); //Obtenermos los números del teclado y simbolos
let result = 0; //Resultado de las operaciones
let operaciones = []; //Array a almacenar operaciones

teclas.forEach(tecla => {
    
    if(parseInt(tecla.innerText) || parseInt(tecla.innerText) === 0){ //Si se puede convertir en numero o es cero
        console.log("Entro sin ser numero loool");
        
        let numero = parseInt(tecla.innerText);
        /*console.log("Es numero " + tecla.innerText);*/

        tecla.addEventListener("click", function(ev){ //Añadimos evento listener al numero o símbolo
            ev.preventDefault();

            //Añadir o aumentar el acumulador, si es inicial susituir por el primer numero marcado
            if(acumulador === "0"){
                acumulador = numero;
            }else{
                acumulador = acumulador + "" + numero;

            }
            actualizarDisplay(acumulador); // Actualizamos el valor del display con el valor acumulado
        });

    }else{
        let operador = tecla.innerText;
        tecla.addEventListener("click", function(ev){ //Añadimos evento listener al símbolo
            ev.preventDefault();

            actualizarDisplay();
            
            if(operador == "X"){ //Multiplicar
                acumularNumeros(acumulador);
                acumularOperador(operador);
                purgarAcumulador()
                actualizarDisplay(operador);
                console.log("X");
            }

            if(operador == "-"){ //Restar
                acumularNumeros(acumulador);
                acumularOperador(operador);
                purgarAcumulador()
                actualizarDisplay(operador);
                console.log("-");
            }

            if(operador == "+"){ //Sumar
                acumularNumeros(acumulador);
                acumularOperador(operador);
                purgarAcumulador()
                actualizarDisplay(operador);
                console.log("+");
            }

            if(operador == "="){ //Igualar

                acumularNumeros(acumulador);
                calculaResultado(operaciones);
            }
            
            if(operador == "C"){
                purgarAcumulador();
                purgaOperaciones();
                console.log(acumulador)
                actualizarDisplay(operador);
            }

            if(operador == ","){
                actualizarDisplay("Work in progress");

            }
                            
        });
    }
});

function acumularNumeros(acumulador){
    let valorNumerico = parseInt(acumulador); // Convertimos el string en numero
    operaciones.push(valorNumerico);
}
function acumularOperador(operador){
    operaciones.push(operador);
}

// Funcion que representa al igual para procesar el array de operaciones almacenadas
// recibe array de operaciones
function calculaResultado(operaciones){

    
    let resultado = 0;
    let arr = operaciones.length;
    console.log(operaciones);

    operaciones.forEach(function (elemento) {
        
        // Loop recorre arreglo y cada 3 vueltas genera la operación
        // Como el array de operaciones lleva (1)num + (2)simbol + (3)num, 
        // la operación debe hacerse cada 3 vueltas
        let vueltas = 0; 
        
        let op1; // Aqui guardamos la primera pos del array operaciones (numero)
        let oper; // Aqui guardamos la segunda pos del array operaciones (operador)
        let op2; // Aqui guardamos la tercera pos del array operaciones (numero)

        for(let i = 0; i <= arr; i++){

            if(vueltas === 3){
                vueltas = 0;
            } else if(vueltas === 0){
                op1 = operaciones[i];
            } else if(vueltas === 1){
                oper = operaciones[i];
            } else{
                op2 = operaciones[i];
            }

            vueltas++;
        }
        console.log(op1 + " " + oper + " " + op2);
        // Hacer operación
        if(oper === "X"){ //Multiplicar
            resultado = op1 * op2;
        }

        if(oper === "-"){ //Restar
            resultado = op1 - op2;
        }

        if(oper === "+"){ //Sumar
            resultado = op1 + op2;
        }
        if(oper == "="){
            return null;
        }
        
    });
    console.log(resultado + " < Resultado operacion");
    acumuladorRes.push(resultado); // Añadimos el calculo al array acumulador de calculos para futuras operaciones
    purgarAcumulador(); // Purgamos el acumulador global
    purgaOperaciones(); // Purgamos el array de operaciones ya que el valor se ha guardado en acumuladorRes
    console.log(acumuladorRes);
    actualizarDisplay(acumuladorRes[acumuladorRes.length-1]);
}

function purgarAcumulador(){
    acumulador  = [];//Purga lo que haya en el array acumulador global
}
function purgaOperaciones(){
    operaciones = [];
}

function actualizarDisplay(valor){
    display.innerHTML = valor;
}

