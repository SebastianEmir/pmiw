let imagenes = [];
let textos = [];

let flecha, tronco, tronco2, flechaVolver;
let miFuente;
let audioNatural;

var pantalla = 0;
var transicion = false;
var opacidad = 0;
var siguientePantalla = 0;

// Variables para controlar la visualización de troncos en cada pantalla de decisión
var mostrarOpciones = false;   // Pantalla 2
var mostrarOpcionesP4 = false; // Pantalla 4
var mostrarOpcionesP6 = false; // Pantalla 6
var mostrarOpcionesP7 = false; // Pantalla 7
var mostrarOpcionesP9 = false; // Pantalla 9

let eleccion = ""; 

function preload(){ 
  audioNatural = loadSound("data/audio-naturaleza.mp3", function() {
    audioNatural.setLoop(true);
  });
  
  miFuente = loadFont("data/Branda.ttf");
  
  let archivos = [
    "data/inicio.jpeg",             // [0]
    "data/imagen-1.jpeg",           // [1]
    "data/imagen-2.jpeg",           // [2]
    "data/Arrow.png",              // [3]
    "data/backarrow.png",          // [4]
    "data/arbol-2.png",            // [5]
    "data/arbol2-2.png",           // [6]
    "data/imgAlternativa-1.jpeg",   // [7] -> Camino Atacar (Paso 1)
    "data/imgAlternativa-2.jpeg",   // [8] -> Camino Atacar (Paso 2)
    "data/imgAlternativa-3.jpeg",   // [9] -> Camino Dique (Paso 1)
    "data/imgAlternativa-4.jpeg",   // [10] -> Camino Dique (Paso 2)
    "data/yacares-al-ataque.jpeg",  // [11] -> FINAL AL ATAQUE (PANTALLA 16)
    "data/yacares-vs-buque.jpeg",   // [12] -> PANTALLA 15
    "data/yacares-y-surubi.jpeg",  // [13] -> IMAGEN DEL SURUBÍ
    "data/final-original.jpeg",    // [14] -> FINAL ORIGINAL
    "data/hundimiento-de-buque.jpeg", // [15] -> PANTALLA 14
    "data/dique-roto.jpeg",         // [16] -> DIQUE ROTO
    "data/plan-contra-barco.jpeg",  // [17] -> PLAN CONTRA BARCO
    "data/negociacion-de-paz.jpeg", // [18] -> NEGOCIACIÓN DE PAZ
    "data/propuesta.jpeg",          // [19] -> PROPUESTA
    "data/final-pacifico.jpeg"     // [20] -> FINAL PACÍFICO
  ];

  for (let i = 0; i < archivos.length; i++){
    imagenes[i] = loadImage(archivos[i]);
  }

  flecha = loadImage("data/Arrow.png");
  flechaVolver = loadImage("data/backarrow.png");
  tronco = loadImage("data/arbol-2.png");
  tronco2 = loadImage("data/arbol2-2.png");

  // Textos
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
  
  // PANTALLA 0: INICIO
  if (pantalla === 0) {
    image(imagenes[0], 0, 0, width, height);

    fill(0, 100); 
    rect(0, 60, width, 100);
    
    fill(112, 185, 106);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("La guerra de los yacares", width/2, 100);
    
    fill(84, 162, 207);
    textSize(20);
    textAlign(RIGHT, CENTER);
    text("Autor: Horacio Quiroga", 400, 140);

    if (mouseZona(250, 550, 300, 350)) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    textSize(25);
    text("COMENZAR", width/2, 325);
  } 
  
  // PANTALLA 1
  else if (pantalla === 1) {
    image(imagenes[1], 0, 0, width, height);
    mostrarBloqueTexto(textos[1]);
  } 
  
  // PANTALLA 2 (PRIMERA ELECCIÓN)
  else if (pantalla === 2) {
    image(imagenes[2], 0, 0, width, height);

    if (!mostrarOpciones) {
      mostrarBloqueTexto(textos[2]);
    } else {
      dibujarTroncosOpciones("Hacer un\n dique", "Atacar el buque\n com los dientes");
    }
  } 
  
  // PANTALLA 3 Y 5 (PRIMER PASO DE CADA CAMINO)
  else if (pantalla === 3 || pantalla === 5) {
    let imgActual = (eleccion === "dique") ? imagenes[9] : imagenes[7];
    image(imgActual, 0, 0, width, height);
    mostrarBloqueTexto(textos[pantalla]);
  } 
  
  // PANTALLA 4 (OPCIONES DIQUE)
  else if (pantalla === 4) {
    image(imagenes[10], 0, 0, width, height);

    if (!mostrarOpcionesP4) {
      mostrarBloqueTexto(textos[4]);
    } else {
      dibujarTroncosOpciones("No sacar el dique\n y ver que pasa", "Buscar otra\n estrategia");
    }
  }

  // PANTALLA 6
  else if (pantalla === 6) {
    image(imagenes[8], 0, 0, width, height);

    if (!mostrarOpcionesP6) {
      mostrarBloqueTexto(textos[6]);
    } else {
      dibujarTroncosOpciones("Construir un dique para\n detener el buque", "Planear como atacar\n al buque");
    }
  }

  // PANTALLA 7: DIQUE ROTO
  else if (pantalla === 7) {
    image(imagenes[16], 0, 0, width, height);

    if (!mostrarOpcionesP7) {
      mostrarBloqueTexto(textos[7]);
    } else {
      dibujarTroncosOpciones("Ir a ver\n al surubi", "Idear una forma\n de pelear");
    }
  }

  // PANTALLA 8: YACARÉS Y EL SURUBÍ
  else if (pantalla === 8) {
    image(imagenes[13], 0, 0, width, height);
    mostrarBloqueTexto(textos[8]);
  }

  // PANTALLA 9: PLAN CONTRA BARCO
  else if (pantalla === 9) {
    image(imagenes[17], 0, 0, width, height);

    if (!mostrarOpcionesP9) {
      dibujarFondoTexto();
      confiTexto();
      text(textos[9], 10, 370, 680, 80);
      image(flecha, 700, 390, 50, 50);
    } else {
      dibujarTroncosOpciones("Amenazar con\n comer al oficial", "Negociar un acuerdo\n de paz");
    }
  }

  // PANTALLA 10: FINAL ORIGINAL
  else if (pantalla === 10) {
    image(imagenes[14], 0, 0, width, height);
    mostrarBloqueTextoFinal(textos[10]);
  }

  // PANTALLA 11: NEGOCIACIÓN DE PAZ
  else if (pantalla === 11) {
    image(imagenes[18], 0, 0, width, height);
    mostrarBloqueTexto(textos[11]);
  }

  // PANTALLA 12: PROPUESTA
  else if (pantalla === 12) {
    image(imagenes[19], 0, 0, width, height);
    mostrarBloqueTexto(textos[12]);
  }

  // PANTALLA 13: FINAL PACÍFICO
  else if (pantalla === 13) {
    image(imagenes[20], 0, 0, width, height);
    mostrarBloqueTextoFinal(textos[13]);
  }

  // PANTALLA 14: ANTEÚLTIMA
  else if (pantalla === 14) {
    image(imagenes[15], 0, 0, width, height);
    mostrarBloqueTexto(textos[14]);
  }

  // PANTALLA 15: FINAL ATAQUE
  else if (pantalla === 15) {
    image(imagenes[12], 0, 0, width, height);
    mostrarBloqueTextoFinal(textos[15]);
  }

  // PANTALLA 16: FINAL YACARÉS AL ATAQUE
  else if (pantalla === 16) {
    image(imagenes[11], 0, 0, width, height);
    mostrarBloqueTextoFinal(textos[16]);
  }

  // TRANSICIÓN
  if (transicion) {
    fill(0, opacidad);
    rect(0, 0, width, height);
    opacidad += 20;
    
    if (opacidad >= 255) {
      pantalla = siguientePantalla;
      transicion = false;
      opacidad = 0;
    }
  }
}

// FUNCIONES AUXILIARES PARA REDUCIR REPETICIONES
function mostrarBloqueTexto(txt) {
  dibujarFondoTexto();
  confiTexto();
  text(txt, 100, 370, 600, 80);
  image(flecha, 700, 390, 50, 50);
}

function mostrarBloqueTextoFinal(txt) {
  dibujarFondoTexto();
  confiTexto();
  text(txt, 100, 370, 600, 80);
  image(flechaVolver, 20, 20, 50, 50);
}

function dibujarTroncosOpciones(texto1, texto2) {
  image(tronco, 200, 300, 150, 100);
  image(tronco2, 500, 300, 150, 100);
  confiTexto();
  text(texto1, 190, 290, 150, 120);
  text(texto2, 500, 290, 150, 120);
}

function mouseZona(x1, x2, y1, y2) {
  return mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2;
}

function confiTexto() {
  fill(255);
  textSize(15);
  textAlign(CENTER, CENTER);
}

function dibujarFondoTexto() {
  fill(0, 150);
  rect(20, 350, width - 40, 95, 10);
}

function mousePressed() {
  // Solución al bug de audio duplicado:
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
  else if (pantalla === 10 || pantalla === 13 || pantalla === 15 || pantalla === 16) {
    if (mouseZona(20, 70, 20, 70)) {
      mostrarOpciones = false;
      mostrarOpcionesP4 = false;
      mostrarOpcionesP6 = false;
      mostrarOpcionesP7 = false;
      mostrarOpcionesP9 = false;
      
      siguientePantalla = 0;
      transicion = true;
    }
  }
}
