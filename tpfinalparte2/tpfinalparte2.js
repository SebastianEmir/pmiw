let juego;
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
let miFondo;
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
  createCanvas(640, 480);
  gestorAudio = new GestorAudio(sonidoTorpedo, sonidoColision, sonidoBoton, musicaRecorrido);
  
  miFondo = new Fondo(imgLecho, imgLecho2);
  
  juego = new Principal(cantidad, 60, imgTorpedoRojo, yacares, imgTorpedoAmarillo, imgCortezaVertical, imgCortezaHorizontal, gestorAudio,imgBuque);
}

function draw() {
  background(73,145,212);
  miFondo.mover();
  miFondo.dibujar();
  
  juego.dibujar();
  juego.moverYacare();
  juego.detectarColision();
}

function mousePressed() {
  if (juego) {
    if (juego.estado === "JUGANDO") {
      juego.disparar();
    }
    else if (juego.estado === "GAMEOVER" || juego.estado === "VICTORIA") {
      juego.verificarPresionMouse();
    }
  }
}
function keyPressed() {
  if (keyCode === ENTER && juego) {
    if (juego.estado === "INICIO") {
      juego.estado = "INSTRUCCIONES";
    } else if (juego.estado === "INSTRUCCIONES") {
      juego.estado = "JUGANDO";
    }
  }
}
