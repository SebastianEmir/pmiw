//Sebastian Gualtieri, comicion 1

var robot; //subida de las imagenes
var nombreLogo;

var suburbios;  //fondo de la zona

let robotMovimiento;  //funcion para que el sprite del robot se mueva se mueva
let fpsRobot;
let posicionX = -200;
let zonaFondo = 500;
let esperaRobot = 0;
let robotTermino = false;

let mostrarLogo = false;
let posicionY =-100;
let velocidadLogo = 3;

let posicionCamion = 800;
let movimientoCamion = -2;
let tiempoEspera = 0;
let esperandoCamion = false;
let camionTermino = false;
let camionMovimiento;
let fpsCamion = 0;

let menuSprites = [];
let nombresMenu = [
  "data/sprite-menu-1-1.png",
  "data/sprite-menu-2-1.png",
  "data/sprite-menu-3-1.png",
  "data/sprite-menu-4-1.png"
];
let menuSpritesHover = [];

let nombresMenuHover = [
  "data/sprite-menu-1-2.png",
  "data/sprite-menu-2-2.png",
  "data/sprite-menu-3-2.png",
  "data/sprite-menu-4-2.png"
];
let botonX = 720;
let botonY = 550;
let botonAncho = 70;
let botonAlto = 30;

let seleccion = 0;
//linea para mover al camion

function preload_anim(image_path, cant_frames) {
  let anim = [];

  for (let i = 0; i < cant_frames; i++) {
    anim.push(loadImage(image_path + (i+1) + ".png"));
  }
  return anim;
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  image(suburbios,0,0,3112,600);

  if(!camionTermino) {
    play_animCamion(camionMovimiento,10,posicionCamion,400);
   
   if(!esperandoCamion){  //esto mueve el camion
     posicionCamion += movimientoCamion;
 }
    if(posicionCamion <= 500 && movimientoCamion < 0 && !esperandoCamion){
      posicionCamion = 500;  //llega a su destino
      esperandoCamion = true;
      tiempoEspera = millis ();
  }
    if (esperandoCamion && millis() - tiempoEspera >= 2000) {
      esperandoCamion = false;  //espera de 5 segundos
      movimientoCamion = 2;
  }
    if(posicionCamion >= 800 && movimientoCamion > 0){
      camionTermino = true; //sale de escena
    }
}
  if(!robotTermino){
  play_anim(robotMovimiento, 10, posicionX, 240); //carga las imagenes en forma de animacion
  posicionX +=1;
  }
  if( posicionX >= 500){
    mostrarLogo = true;
  }
  if (mostrarLogo && posicionY < 250) {
  posicionY += velocidadLogo;
  }

  if (mostrarLogo) {
  image(nombreLogo, 325, posicionY, 250, 100);
  }
  
 if(posicionX > 800){
  robotTermino = true;
 }
  if (robotTermino) {
  dibujarMenu();
    dibujarBotonReiniciar();
 }
  
}

function preload() {
  fpsRobot = 0;
  suburbios = loadImage("data/Background_sprite-1-1.png");  //fondo del paisaje
  robot = loadImage("data/sprite-robot-1.png"); //imagen del robot
  
  nombreLogo = loadImage("data/battlefield_logo.png");

  robotMovimiento = preload_anim("data/sprite-robot-", 8); //funcion de la animacion para el robot
  camionMovimiento = preload_anim("data/camion-movi_",4); //imagen del camion
  
  for (let i = 0; i < nombresMenu.length; i++) {
  menuSprites[i] = loadImage(nombresMenu[i]);
  }
  for (let i = 0; i < nombresMenuHover.length; i++) {
  menuSpritesHover[i] = loadImage(nombresMenuHover[i]);
 }
}

function play_anim(anim_name, time, x_pos, y_pos) {
  image(anim_name[fpsRobot], x_pos, y_pos,350,350);  //linea que mueve al robot unicamente

  if (frameCount % time === 0) {
    fpsRobot++;   //lo que limita la velocidad de las imagenes

    if (fpsRobot >= anim_name.length) {
      fpsRobot = 0;
    }
  }
}

function play_animCamion(anim_name, time, x_pos, y_pos) { // creo funcion aparte para la animacion del camion de forma independiente

  image(anim_name[fpsCamion], x_pos, y_pos, 300, 180);

  if (frameCount % time === 0) {
    fpsCamion++;

    if (fpsCamion >= anim_name.length) {
      fpsCamion = 0;
    }
  }
}

function dibujarMenu() {

  for (let i = 0; i < menuSprites.length; i++) {

    let x = 50 + i * 190;
    let y = 370;

    image(menuSprites[i], x, y, 160, 100);

    // Detectar si el mouse está encima
    if (mouseX >= x && mouseX <= x + 160 &&
        mouseY >= y && mouseY <= y + 100) {
      
      image(menuSpritesHover[i],x,y,160,100);
    }else{
      image(menuSprites[i],x,y,160,100);
    }
  }
}

function mousePressed() {

  if (mouseX >= botonX && mouseX <= botonX + botonAncho &&
      mouseY >= botonY && mouseY <= botonY + botonAlto) {

    reiniciar();
  }
  for (let i = 0; i < menuSprites.length; i++) {
    let x = 50 + i * 190;
    let y = 370;
    if (mouseX >= x && mouseX <= x + 160 &&
        mouseY >= y && mouseY <= y + 100) {
      seleccion = i;
    }
  }
}

function dibujarBotonReiniciar () {
  fill(100);
  rect(botonX,botonY,botonAncho,botonAlto);

  fill(255);
  textAlign(CENTER,CENTER);
  textSize(12);
  text("Reiniciar",botonX + botonAncho/2,botonY + botonAlto/2);
  
}

function reiniciar() {

  posicionX = -200;
  robotTermino = false;

  mostrarLogo = false;
  posicionY = -100;

  posicionCamion = 800;
  movimientoCamion = -2;
  esperandoCamion = false;
  camionTermino = false;

  tiempoEspera = 0;

  fpsRobot = 0;
  fpsCamion = 0;
  seleccion = 0;
}
