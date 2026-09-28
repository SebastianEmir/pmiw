var miImage;  //carga de imagenes
var imagen1;
var imagen2;
var flecha;
var tronco;
var tronco2;
var imgA;
var imgA2;
var imgA3;
var imgA3;

var pantalla = 0;

var transicion = false;
var opacidad = 0;
var siguientePantalla = 0;

var mostrarOpciones = false;

function preload(){
miImage = loadImage("data/inicio.PNG");
imagen1 = loadImage("data/imagen-1.png");
imagen2 = loadImage("data/imagen-2.png");
flecha = loadImage("data/Arrow.png");
tronco = loadImage("data/arbol-2.png");
tronco2 = loadImage("data/arbol2-2.png");
imgA = loadImage("data/imgAlternativa-1.png");
imgA2 = loadImage("data/imgAlternativa-2.png");
imgA3 = loadImage("data/imgAlternativa-3.png");
imgA4 = loadImage("data/imgAlternativa-4.png");
  
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(220);
if (pantalla == 0) {
  image(miImage,0,0,width,height);
  fill(112,185,106);
  textSize(40);
  textAlign(CENTER,CENTER);
  text("La guerra de los yacares",width/2,100);
  fill(84,162,207);
  textSize(20);
  textAlign(RIGHT,CENTER);
  text("Autor: Horacio Quiroga",width/2,130);
//////////// aca es donde se escribe el texto/////////////
  if (mouseX > 250 && mouseX < 550 && mouseY > 300 && mouseY < 350) {
    fill(255, 0, 0);
  } else {
    fill(255);
  }
  text("COMENZAR", 450, 325);
///////////funcion para el boton//////////
 } else if (pantalla == 1) {
  image(imagen1,0,0,width,height);
  fill(255);
  textSize(17);
  textAlign(CENTER,CENTER);
  text("En un rio muy grande, en un pais desierto donde nunca habia estado el hombre,\nvivian muchos yacares muy tranquilos, hasta que uno oye a lo lejos un ruido muy fuerte",360,410);
text("En un rio muy grande, en un pais desierto donde nunca habia estado el hombre,",360,400);
  image(flecha,700,390,50,50);
  
  /////////// pantalla 1 //////////////
 } else if (pantalla == 2){
  image(imagen2,0,0,width,height);

  if (mostrarOpciones == false){
  fill(255);
  textSize(17);
  textAlign(CENTER,CENTER);
  text("Pronto los yacares tambien lo escucharon. Todos corrian de un lado a otro,al ver",360,390);
  text("a lo lejos una nube acercarse, notaron que era un buque el cual a\n su paso espantaba la comida de los yacares. Y pensaron.",360,400);

  image(flecha,700,390,50,50);
  } else {
  image(tronco, 200, 300, 150, 100);
  image(tronco2, 500, 300, 150, 100);
  fill(255);
  textSize(17);
  textAlign(CENTER,CENTER);
  text("Hacer un",260,330);
  text("dique",260,360);

  
  fill(255);
  textSize(17);
  textAlign(CENTER,CENTER);
  text("Atacar el buque",560,330);
  text("con los dientes",560,360);

    
  }

  ////////// pantalla 2 ///////////////

   }else if (pantalla == 3){
   image(imgA3,0,0,width,height);
  fill(255);
  textSize(17);
  textAlign(CENTER,CENTER);
  text("En seguida se pusieron a hacer un dique. Fueron todos al bosque y \n echaron abajo muchos arboles. Los llevaron al agua. Cansados se fueron a dormir.",360,400);

  ////////////////pantalla 3 /////////////
}


if (transicion == true) {
 fill(0, opacidad);
 rect(0, 0, width, height);

  opacidad = opacidad + 5;
  
if (opacidad >= 255) {
   pantalla = siguientePantalla;
   transicion = false;
   opacidad = 0;
  }
 }
}
function mousePressed(){
 if(pantalla == 0 && mouseX > 250 && mouseX < 550 && mouseY > 300 && mouseY < 350){
   
   siguientePantalla = 1;
   transicion = true;
 }   ////bototn para iniciar la primera pantalla
if(pantalla == 1 &&
     mouseX > 700 && mouseX < 750 &&
     mouseY > 390 && mouseY < 440){

    siguientePantalla = 2;
    transicion = true;
  }    ///////boton para iniciar la segunda pantalla
   if(pantalla == 2 &&
     mostrarOpciones == false &&
     mouseX > 700 && mouseX < 750 &&
     mouseY > 390 && mouseY < 440){
    
    mostrarOpciones = true;
   }

  if(pantalla == 2 && mostrarOpciones == true && mouseX > 180
     && mouseX < 370 && mouseY > 280 && mouseY < 390){

    siguientePantalla = 3;
    transicion = true;
   }
  }
