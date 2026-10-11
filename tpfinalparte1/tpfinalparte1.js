//Sebastian Gualtieri y Evelyn Gualtieri
//tp final parte 1
//comision 1 
// https://youtu.be/xX4hLQmHUC8
//no pudimos hacerlo mas corto al video asi que se pasa por 1min y 11 seg.


let imagenes = []; //declaracion de variables
let textos = [];
let imgTitulo;
let imgComenzar;
let imgComenzar2;

let flecha, tronco, tronco2, flechaVolver;
let miFuente;
let audioNatural; 
let yTextoCreditos = 450;

var pantalla = 0;
var transicion = false;
var opacidad = 0;
var siguientePantalla = 0;  //variables globales


var mostrarOpciones = false;   // Pantalla 2
var mostrarOpcionesP4 = false; // Pantalla 4
var mostrarOpcionesP6 = false; // Pantalla 6
var mostrarOpcionesP7 = false; // Pantalla 7
var mostrarOpcionesP9 = false; // Pantalla 9
 

function preload(){ // funciones de precarga
  
   audioNatural = loadSound("data/audio-naturaleza.mp3", function() {
    audioNatural.setLoop(true);
  });
  
   miFuente = loadFont("data/GalaferaMediumItalic.ttf");

  let archivos = [
   
    "data/inicio.jpg",             // [0]
    "data/imagen-1.jpg",           // [1]
    "data/imagen-2.jpg",           // [2]
    "data/Arrow.png",              // [3]
    "data/backarrow.png",          // [4]
    "data/arbol-2.png",            // [5]
    "data/arbol2-2.png",           // [6]
    "data/imgAlternativa-1.jpg",   // [7] -> Camino Atacar (Paso 1)
    "data/imgAlternativa-2.jpg",   // [8] -> Camino Atacar (Paso 2)
    "data/imgAlternativa-3.jpg",   // [9] -> Camino Dique (Paso 1)
    "data/imgAlternativa-4.jpg",   // [10] -> Camino Dique (Paso 2)
    "data/yacares-al-ataque.jpg",  // [11] -> FINAL AL ATAQUE (PANTALLA 16)
    "data/yacares-vs-buque.jpg",   // [12] -> PANTALLA 15
    "data/yacares-y-surubi.jpg",   // [13] -> IMAGEN DEL SURUBÍ
    "data/final-original.jpg",     // [14] -> FINAL ORIGINAL
    "data/hundimiento-de-buque.jpg", // [15] -> PANTALLA 14
    "data/dique-roto.jpg",         // [16] -> DIQUE ROTO
    "data/plan-contra-barco.jpg",  // [17] -> PLAN CONTRA BARCO
    "data/negociacion-de-paz.jpg", // [18] -> NEGOCIACIÓN DE PAZ
    "data/propuesta.jpg",          // [19] -> PROPUESTA
    "data/final-pacifico.jpg",      // [20] -> FINAL PACÍFICO
    "data/mandibula.jpeg"  //imagen para los creditos
  ];

  for (let i = 0; i < archivos.length; i++){ //crea un buble que repite varias veces
    imagenes[i] = loadImage(archivos[i]);
  }

  imgTitulo = loadImage("data/titulo.png");  //elementos de interfaz
  imgComenzar = loadImage("data/comenzar.png");
  imgComenzar2 = loadImage("data/comenzar2.png");
  flecha = loadImage("data/Arrow.png");
  flechaVolver = loadImage("data/backarrow.png");
  tronco = loadImage("data/arbol-2.png");
  tronco2 = loadImage("data/arbol2-2.png");

  // Textos organizados en un arreglo
  textos[0] = "";
  textos[1] = "En un rio muy grande, en un pais desierto donde nunca habia estado el hombre,\nvivian muchos yacares muy tranquilos, hasta que uno oye a lo lejos un ruido muy fuerte";
  textos[2] = "Pronto los yacares tambien lo escucharon. Todos corrian de un lado a otro,al ver\n a lo lejos una nube acercarse, notaron que era un buque el cual a\n su paso espantaba la comida de los yacares. Y pensaron.";
  textos[3] = "En seguida se pusieron a hacer un dique. Fueron todos al bosque y \n echaron abajo muchos arboles. Los llevaron al agua. Cansados se fueron a dormir.";
  textos[4] = "Al otro dia dormian todavia cuando oyeron el ruido del vapor. Los hombres\n al ver algo tapar su camino deciden ir barquitos hasta el dique y exigir \nque lo saquen pero se niegan. Los hombres se retiran con su \nbuque y los yacares vuelven a dormir.";
  textos[5] = "Los yacares atacan el buque provocando severos daños y haciendo que se\n retiren, pero tienen un mal presentimiento sobre esto.";
  textos[6] = "Los yacares se dan cuenta de que con fuerza no les van a ganar, asi\n que piensan una solucion.";
  textos[7] = "Los yacares estaban seguros de que su nuevo dique iba a poder contra \nlas personas. Pero otra vez no quedo nada del dique. El viejo yacare propuso ir a ver al \nsurubi, pero recordando lo que paso antes.";
  textos[8] = "Al llegar con el surubi y reconocer al viejo yacare el le pidie el torpedo\n que este tenia. El se los da e ira con ellos ya que solo el sabe como reventarlo y \nles dice como construir el dique. Asi que van a la costa";
  textos[9] = "A la mañana siguiente, bien temprano, vuelven a contruir el nuevo dique con los consejos del \nsurubi. Apenas terminaron el buque volvio y esta vez las personas amenazaron con destruir todo, hasta\n que el viejo yacare penso en otra solucion.";
  textos[10] = "Final B (Original)\nEl buque de guerra hizo el primer ataque, comenzando asi el enfrentamiento. \nLos yacares junto al Surubi sueltan el torpedo y el buque es destruido. Ganan la batalla, el surubi vuelve \na su gruta y los yacares vuelven a descansar tranquilos.";
  textos[11] = "los yacares toman la decision de ir a negociar la paz con lo hombres del buque\n hablan para ver si pueden ver como pueden llegar a un acuerdo que\n veneficie a ambas partes";
  textos[12] = "los hombres del proponen usar barcos de motor electrico ya que no hacen ruido\n y no molestan a los yacares ni espantar los peces";
  textos[13] = "(final C)\n pasan los barcos de motor electrico y los yacares pueden vivir tranquilos, asi comparten el rio";
  textos[14] = "Los yacares atacan con firmeza el buque hasta provocar su hundimiento en el rio.";
  textos[15] = "Victoria Yacaré\nTras el combate contra el buque, los yacares logran defender con éxito su territorio y recuperar la tranquilidad del río.";
  textos[16] = "Final A\n el buque es demasiado fuerte, los yacares deciden derribar los arboles mas grandes\n de la orilla, trepandose al buque y eliminar a los humanos de el.";
}

function setup() {
  createCanvas(800, 450);
   textFont(miFuente);
}

function draw() {
  background(220);
  
  // pantalla 0
  if (pantalla === 0) {
    image(imagenes[0], 0, 0, width, height);

    fill(0, 100); rect(0, 60, width, 150);
    fill(112, 185, 106);
  
  image(imgTitulo,width/2 - 265,20,510,230);
    
    fill(84, 162, 207);
    textSize(20);
    textAlign(CENTER);
    text("Autor: Horacio Quiroga", 660, 430);

    if (mouseZona(250, 550, 320, 380)) {
      image(imgComenzar2,width/2 - 150,210,300,220);
    } else {
      image(imgComenzar,width/2 - 150,210,300,220);
  } 
  }
  
  // pantalla 1
  else if (pantalla === 1) {
    image(imagenes[1], 0, 0, width, height);
    dibujarFondoTexto();
    confiTexto();
    text(textos[1], 100, 370, 600, 80);
    image(flecha, 700, 390, 50, 50);
  } 
  
  // pantalla 2 (deciciones
  else if (pantalla === 2) {
    image(imagenes[2], 0, 0, width, height);

    if (!mostrarOpciones) { //se muestran las opciones a decicion
      dibujarFondoTexto();
      confiTexto();
      text(textos[2], 100, 370, 600, 80);
      image(flecha, 700, 390, 50, 50);
    } else {
      image(tronco, 200, 300, 150, 100);
      image(tronco2, 500, 300, 150, 100);

      confiTexto(); //deciciones
      text("Hacer un\n dique", 220, 290, 80, 120);
      text("Atacar el buque\n con los dientes", 500, 290, 130, 120);
    }
  } 
  
  // pantalla 3 y 5 (caminos segun decicion tomada
  else if (pantalla === 3 || pantalla === 5) {
    if (eleccion === "dique") {
      image(imagenes[9], 0, 0, width, height);
    } else {
      image(imagenes[7], 0, 0, width, height);
    }
    dibujarFondoTexto();
    confiTexto();
    text(textos[pantalla], 100, 370, 600, 80);
    image(flecha, 700, 390, 50, 50);
  } 
  
  // pantalla 4
  else if (pantalla === 4) {
    image(imagenes[10], 0, 0, width, height);

    if (!mostrarOpcionesP4) {
      dibujarFondoTexto();
      confiTexto();
      text(textos[4], 100, 370, 600, 80);
      image(flecha, 700, 390, 50, 50);
    } else {
      image(tronco, 200, 300, 150, 100);
      image(tronco2, 500, 300, 150, 100);

      confiTexto();
      text("No sacar el dique\n y ver que pasa", 190, 290, 150, 120);
      text("Buscar otra\n estrategia", 500, 290, 130, 120);
    }
  }

  // pantalla 6
  else if (pantalla === 6) {
    image(imagenes[8], 0, 0, width, height);

    if (!mostrarOpcionesP6) {
      dibujarFondoTexto();
      confiTexto();
      text(textos[6], 100, 370, 600, 80);
      image(flecha, 700, 390, 50, 50);
    } else {
      image(tronco, 200, 300, 150, 100);
      image(tronco2, 500, 300, 150, 100);

      confiTexto();
      text("Construir un dique para\n detener el buque", 190, 290, 150, 120);
      text("Planear como atacar\n al buque", 500, 290, 150, 120);
    }
  }

  // pantalla 7
  else if (pantalla === 7) {
    image(imagenes[16], 0, 0, width, height);

    if (!mostrarOpcionesP7) {
      dibujarFondoTexto();
      confiTexto();
      text(textos[7], 100, 370, 600, 80);
      image(flecha, 700, 390, 50, 50);
    } else {
      image(tronco, 200, 300, 150, 100);
      image(tronco2, 500, 300, 150, 100);

      confiTexto();
      text("Ir a ver\n al surubi", 220, 290, 80, 120);
      text("Idear una forma\n de pelear", 500, 290, 130, 120);
    }
  }

  // pantalla 8
  else if (pantalla === 8) {
    image(imagenes[13], 0, 0, width, height);
    dibujarFondoTexto();
    confiTexto();
    text(textos[8], 100, 370, 600, 80);
    image(flecha, 700, 390, 50, 50);
  }

  // pantalla 9
  else if (pantalla === 9) {
    image(imagenes[17], 0, 0, width, height);

    if (!mostrarOpcionesP9) {
      dibujarFondoTexto();
      confiTexto();
      text(textos[9], 10, 370, 680, 80);
      image(flecha, 700, 390, 50, 50);
    } else {
      image(tronco, 200, 300, 150, 100);
      image(tronco2, 500, 300, 150, 100);

      confiTexto();
      text("Amenazar con\n comer al oficial", 190, 290, 150, 120);
      text("Negociar un acuerdo\n de paz", 500, 290, 150, 120);
    }
  }
  
  
  
  
  
  // pantallas de finales ////////

 
  else if (pantalla === 10 || pantalla === 13 || pantalla === 15 || pantalla === 16) {
    if (pantalla === 10) image(imagenes[14], 0, 0, width, height);
    else if (pantalla === 13) image(imagenes[20], 0, 0, width, height);
else if (pantalla === 15) image(imagenes[12], 0, 0, width, height);
else if (pantalla === 16) image(imagenes[11], 0, 0, width, height);
dibujarFondoTexto();
confiTexto();
text(textos[pantalla], 100, 370, 600, 80);

 
// Boton para avanzar a creditos
 
if (mouseZona(20, 120, 20, 60)) fill(255, 200, 0); else fill(255);
rect(20, 20, 100, 40, 5);
fill(0);
textSize(14);
text("Creditos", 70, 40);
}

 
 //pantallas finales con el boton creditos
else if (pantalla === 11 || pantalla === 12 || pantalla === 14) {
if (pantalla === 11) image(imagenes[18], 0, 0, width, height);
else if (pantalla === 12) image(imagenes[19], 0, 0, width, height);
else if (pantalla === 14) image(imagenes[15], 0, 0, width, height);
dibujarFondoTexto();
confiTexto();
text(textos[pantalla], 100, 370, 600, 80);
image(flecha, 700, 390, 50, 50);
}

 
//parte de creditos

else if (pantalla === 17) {
  
 if (imagenes[21]) {
    image(imagenes[21], 0, 0, width, height);
  } else {
    background(20, 30, 20); 
  }

if(yTextoCreditos > 0){
  yTextoCreditos -= 3;
}

fill(255, 235, 116);
textSize(36);
textAlign(CENTER, CENTER);
text("CRÉDITOS", width/2, 60 + yTextoCreditos);
 fill(0, 100); rect(150, 85, 530, 108);
    fill(112, 185, 106);
fill(255);
textSize(18);
text("Desarrollado por: Evelyn Gualtieri y Sebastian Gualtieri", width/2, 120 + yTextoCreditos);
text("Obra Basada: 'La guerra de los yacarés' de Horacio Quiroga", width/2, 150 + yTextoCreditos);

/////

 
// Boton de volver al inicio 
image(flechaVolver, 20, 20, 50, 50);
textSize(14);
text("VOLVER AL INICIO", 140, 45);
}
 
 
// transicion
if (transicion) {
fill(0, opacidad);
rect(0, 0, width, height);
opacidad += 8; // fluido el paso entre pantallas
if (opacidad >= 255) {
pantalla = siguientePantalla;
transicion = false;
opacidad = 0;
}
}
}

function mouseZona(x1, x2, y1, y2) { //region especifica en la pantalla
return mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2;
}
function confiTexto() {
fill(255);
textSize(15);
textAlign(CENTER, CENTER);
}
function dibujarFondoTexto() {
fill(0, 160); 
rect(20, 350, width - 40, 95, 10);
}

function mousePressed() { 

  
if (!audioNatural.isPlaying()) {
    audioNatural.play();
}
if (pantalla === 0 && mouseZona(250, 550, 300, 350)) {
siguientePantalla = 1;
transicion = true;
}
else if (pantalla === 1 && mouseZona(700, 750, 390, 440)) {
siguientePantalla = 2;
transicion = true;
}
else if (pantalla === 2) {
if (!mostrarOpciones && mouseZona(700, 750, 390, 440)) {
mostrarOpciones = true;
} else if (mostrarOpciones) {
if (mouseZona(180, 370, 280, 400)) {
eleccion = "dique";
siguientePantalla = 3;
transicion = true;
}
else if (mouseZona(480, 670, 280, 400)) {
eleccion = "atacar";
siguientePantalla = 5;
transicion = true;
}
}
}
else if (pantalla === 3 && mouseZona(700, 750, 390, 440)) {
siguientePantalla = 4;
transicion = true;
}
else if (pantalla === 4) {
if (!mostrarOpcionesP4 && mouseZona(700, 750, 390, 440)) {
mostrarOpcionesP4 = true;
} else if (mostrarOpcionesP4) {
if (mouseZona(180, 370, 280, 400)) {
siguientePantalla = 7;
transicion = true;
}
else if (mouseZona(480, 670, 280, 400)) {
siguientePantalla = 6;
transicion = true;
}
}
}
else if (pantalla === 5 && mouseZona(700, 750, 390, 440)) {
siguientePantalla = 6;
transicion = true;
}
else if (pantalla === 6) {
if (!mostrarOpcionesP6 && mouseZona(700, 750, 390, 440)) {
mostrarOpcionesP6 = true;
} else if (mostrarOpcionesP6) {
if (mouseZona(180, 370, 280, 400)) {
siguientePantalla = 7;
transicion = true;
}
else if (mouseZona(480, 670, 280, 400)) {
siguientePantalla = 14;
transicion = true;
}
}
}
else if (pantalla === 7) {
if (!mostrarOpcionesP7 && mouseZona(700, 750, 390, 440)) {
mostrarOpcionesP7 = true;
} else if (mostrarOpcionesP7) {
if (mouseZona(180, 370, 280, 400)) {
siguientePantalla = 8;
transicion = true;
}
else if (mouseZona(480, 670, 280, 400)) {
siguientePantalla = 16;
transicion = true;
}
}
}
else if (pantalla === 8 && mouseZona(700, 750, 390, 440)) {
siguientePantalla = 9;
transicion = true;
}
else if (pantalla === 9) {
if (!mostrarOpcionesP9 && mouseZona(700, 750, 390, 440)) {
mostrarOpcionesP9 = true;
} else if (mostrarOpcionesP9) {
if (mouseZona(180, 370, 280, 400)) {
siguientePantalla = 10;
transicion = true;
}
else if (mouseZona(480, 670, 280, 400)) {
siguientePantalla = 11;
transicion = true;
}
}
}
else if (pantalla === 11 && mouseZona(700, 750, 390, 440)) {
siguientePantalla = 12;
transicion = true;
}
else if (pantalla === 12 && mouseZona(700, 750, 390, 440)) {
siguientePantalla = 13;
transicion = true;
}
else if (pantalla === 14 && mouseZona(700, 750, 390, 440)) {
siguientePantalla = 15;
transicion = true;
}
 
 
// Clic en el botón "CRÉDITOS" desde cualquier Pantalla Final
else if (pantalla === 10 || pantalla === 13 || pantalla === 15 || pantalla === 16) {
if (mouseZona(20, 120, 20, 60)) {
siguientePantalla = 17;
transicion = true;
}
}

// Clic en "VOLVER AL INICIO" desde los Créditos 
else if (pantalla === 17 && mouseZona(20, 70, 20, 70)) {
mostrarOpciones = false;
mostrarOpcionesP4 = false;
mostrarOpcionesP6 = false;
mostrarOpcionesP7 = false;
mostrarOpcionesP9 = false;
 yTextoCreditos = 450; 
siguientePantalla = 0;
transicion = true;
}
}
