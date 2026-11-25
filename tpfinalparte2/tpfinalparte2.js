//Sebastian Gualtieri y Evelyn Gualtieri
// tp final parte 2 
//comision 1
//libro horacio quiroga hecho en la parte de la novela visual donde pelean contra el buque de guerra empieza el minijuego
//https://youtu.be/uQTP6hEfr-o
//no pudimos hacer mas corto el video 

//variables
let juego;   ////sketch
let cantidad = 6;
let imgTorpedoRojo;
let imgTorpedoAmarillo;
let imgLecho;
let imgLecho2;
let imgCortezaVertical;
let imgCortezaHorizontal;
let imgBuque;
let sonidoTorpedo;
let sonidoColision;
let sonidoBoton;
let musicaRecorrido;
let gestorAudio;

let yacares = [];

function preload() {
  imgTorpedoRojo = loadImage("data/torpedoRojo.png");
  imgTorpedoAmarillo = loadImage("data/torpedoAmarillo.png");
  imgLecho = loadImage("data/lecho.jpg");
  imgLecho2 = loadImage("data/lecho2.jpg");
  imgCortezaVertical = loadImage("data/cortezaVertical.png");
  imgCortezaHorizontal = loadImage("data/cortezaHorizontal.jpg");
  imgBuque = loadImage("data/buque.png");

  sonidoTorpedo = loadSound("data/sonidoTorpedo.mp3");
  sonidoColision = loadSound("data/colisionTorpedo.mp3");
  sonidoBoton = loadSound("data/botonEfecto.mp3");
  musicaRecorrido = loadSound("data/musicaRecorrido.mp3");

  for (let i = 1; i <= 8; i++) {
    yacares[i - 1] = loadImage("data/yacare" + i + ".png");
  }
}

function setup() {
  rectMode(CENTER);
  createCanvas(800, 400);
  
  gestorAudio = new GestorAudio(sonidoTorpedo, sonidoColision, sonidoBoton, musicaRecorrido);

  juego = new Principal(cantidad, 60, imgTorpedoRojo, yacares, imgTorpedoAmarillo, imgCortezaVertical, imgCortezaHorizontal, gestorAudio, imgBuque, imgLecho, imgLecho2);
}

function draw() {
  juego.dibujar();
  juego.moverYacare();
  juego.detectarColision();
}

function mousePressed() {
  if (juego) {
    juego.manejarClic();
  }
}

function keyPressed() {
  if (juego) {
  juego.manejarTecla(keyCode);
  }
}
