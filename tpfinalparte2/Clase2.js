class Principal {
  constructor(cantNaves, tamArma, imgTorpedoRojo, imgYacares, imgTorpedoAmarillo, imgCortezaV, imgCortezaH, audioObj, imgBuque) {
    this.cant = cantNaves;
    this.torpedosRojos = [];
    this.yacare = new Yacare(tamArma, imgYacares, imgTorpedoAmarillo);
    for (let i = 0; i < this.cant; i++) {
      this.torpedosRojos[i] = new TorpedoRojo(imgTorpedoRojo);
    }

    this.cortezaVertical = imgCortezaV;
    this.cortezaHorizontal = imgCortezaH;
    this.audio = audioObj;
    this.buqueImg = imgBuque;
    
    this.vidaMaxBuque = 15;     
    this.vidaBuque = 15;         
    this.tiempoParpadeo = 0;     
    this.tiempoUltimoDisparo = 0;
    
    this.estado = "INICIO";  
  }

  dibujar() {

    if (this.estado === "INICIO") {
      // Detenemos la música si volvemos al inicio
      if (this.audio) {
        this.audio.detenerMusica();
      }

      push();
      imageMode(CENTER);
      if (this.cortezaVertical) {
        image(this.cortezaVertical, width / 2, height / 2, 420, 220);
      } else {
        fill(0, 180);
        rect(width / 2, height / 2, width, height);
      }
      
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(22);
      text("¡Prepárate para la batalla!", width / 2, height / 2 - 50);
      textSize(14);
      text("Recorre el río, esquiva los torpedos y", 320, 232);
      text("\nderrota al buque enemigo para ganar.\nPresiona ENTER para continuar", width / 2, height / 2 + 10);
      pop();
    } 

    else if (this.estado === "INSTRUCCIONES") {
      push();
      imageMode(CENTER);
      if (this.cortezaVertical) {
        image(this.cortezaVertical, width / 2, height / 2, 420, 220);
      } else {
        fill(0, 180);
        rect(width / 2, height / 2, width, height);
      }
      
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(22);
      text("Instrucciones de Jugabilidad", width / 2, height / 2 - 60);
      textSize(14);
      text("Usa las FLECHAS ARRIBA y ABAJO para moverte", 310, 220);
      text("Haz CLICK para disparar los torpedos", 310, 240);
      text("Destruye al buque para ganar", 310, 260);
      text("Destruye al buque para ganar\n\nPresiona ENTER para comenzar", 310, 280);
      pop();
    } 
      
    else if (this.estado === "JUGANDO") {
      // Iniciamos la música de fondo en bucle al estar jugando
      if (this.audio) {
        this.audio.iniciarMusica();
      }

      for (let i = 0; i < this.cant; i++) {
        this.torpedosRojos[i].dibujarTorpedoRojo();
        this.torpedosRojos[i].moverTorpedoRojo();
      }
      
      this.yacare.dibujarYacare();

      if (this.buqueImg) {
        push();
        imageMode(CENTER);
        let posXBuque = 550; 
        let posYBuque = 50;  
        let anchoBuque = 400;
        let altoBuque = 260;  

        if (this.tiempoParpadeo > 0) {
          this.tiempoParpadeo--;
          if (Math.floor(this.tiempoParpadeo / 4) % 2 === 0) {
            tint(255, 0, 0);
          }
        }

        image(this.buqueImg, posXBuque, posYBuque, anchoBuque, altoBuque);
        noTint();
        pop();

        let anchoBarra = 150;
        let altoBarra = 14;
        let xBarra = width - 170;
        let yBarra = 20;  

        fill(255);
        noStroke();
        textSize(12);
        textAlign(LEFT, CENTER);

        fill(50, 50, 50, 200);
        rectMode(CORNER);
        rect(xBarra, yBarra, anchoBarra, altoBarra, 4);

        let anchoActual = (anchoBarra * this.vidaBuque) / this.vidaMaxBuque;
        fill(220, 30, 30);
        rect(xBarra, yBarra, anchoActual, altoBarra, 4);

        noFill();
        stroke(255);
        strokeWeight(1);
        rect(xBarra, yBarra, anchoBarra, altoBarra, 4);
        rectMode(CENTER);
      }
    } 

    else if (this.estado === "GAMEOVER") {
      // Detenemos la música al perder
      if (this.audio) {
        this.audio.detenerMusica();
      }

      push();
      imageMode(CENTER);
      if (this.cortezaHorizontal) {
        image(this.cortezaHorizontal, width / 2, height / 2, 480, 440);
      } else {
        fill(0, 200);
        rect(width / 2, height / 2, width, height);
      }
      
      fill(255, 100, 100);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(26);
      text("¡DERROTA!", width / 2, height / 2 - 70);
      
      textSize(15);
      fill(255);
      text("Fuiste alcanzado por un torpedo enemigo", width / 2, height / 2 - 25);
      
      let anchoBoton = 140;
      let altoBoton = 40;
      let yBotones = height / 2 + 45;

      fill(70, 130, 180);
      rect(width / 2 - 80, yBotones, anchoBoton, altoBoton, 8);
      fill(255);
      textSize(14);
      text("CONTINUAR", width / 2 - 80, yBotones);

      fill(180, 70, 70);
      rect(width / 2 + 80, yBotones, anchoBoton, altoBoton, 8);
      fill(255);
      text("REINICIAR", width / 2 + 80, yBotones);
      
      pop();
    }

    else if (this.estado === "VICTORIA") {
      // Detenemos la música al ganar
      if (this.audio) {
        this.audio.detenerMusica();
      }

      push();
      imageMode(CENTER);
      if (this.cortezaHorizontal) {
        image(this.cortezaHorizontal, width / 2, height / 2, 480, 440);
      } else {
        fill(0, 200);
        rect(width / 2, height / 2, width, height);
      }
      
      fill(100, 255, 100);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(26);
      text("¡VICTORIA!", width / 2, height / 2 - 70);
      
      textSize(15);
      fill(255);
      text("¡El buque fue destruido con exito", 320, 215);
      text("Ahora los yacares podran estar traquilos!", 320, 240);
      let anchoBoton = 140;
      let altoBoton = 40;
      let yBotones = height / 2 + 45;

      fill(70, 130, 180);
      rect(width / 2, yBotones, anchoBoton, altoBoton, 8);
      fill(255);
      textSize(14);
      text("CONTINUAR", width / 2, yBotones);
      
      pop();
    }
  }

  moverYacare() {
    if (this.estado === "JUGANDO") {
      if (keyIsDown(UP_ARROW)) {
        this.yacare.moverArriba();
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.yacare.moverAbajo();
      }
    }
  }

  disparar() {
    if (this.estado === "JUGANDO") {
      if (!this.yacare.torpedo.disparada && millis() - this.tiempoUltimoDisparo > 2000) {
        this.yacare.disparar();
        this.tiempoUltimoDisparo = millis();
        if (this.audio) {
          this.audio.reproducirTorpedo();
        }
      }
    }
  }

  detectarColision() {
    if (this.estado === "JUGANDO") {
      let torpedoAmarillo = this.yacare.torpedo;
      for (let i = 0; i < this.cant; i++) {
        if (torpedoAmarillo.disparada && this.torpedosRojos[i].colisionTorpedo(torpedoAmarillo)) {
          this.torpedosRojos[i].reiniciarTorpedoRojo();
          torpedoAmarillo.disparada = false;
          if (this.audio) {
            this.audio.reproducirColision();
          }
        }
        
        if (this.torpedosRojos[i].colisionYacare(this.yacare)) {
          this.estado = "GAMEOVER";
        }
      }

      if (torpedoAmarillo.disparada) {
        let posXBuque = 550; 
        let posYBuque = 50;  
        let anchoBuque = 400; 
        let altoBuque = 260;  

        if (
          torpedoAmarillo.xB > posXBuque - anchoBuque / 2 &&
          torpedoAmarillo.xB < posXBuque + anchoBuque / 2 &&
          torpedoAmarillo.yB > posYBuque - altoBuque / 2 &&
          torpedoAmarillo.yB < posYBuque + altoBuque / 2
        ) {
          torpedoAmarillo.disparada = false;
          this.vidaBuque--;
          this.tiempoParpadeo = 20;

          if (this.audio) {
            this.audio.reproducirColision();
          }

          if (this.vidaBuque <= 0) {
            this.estado = "VICTORIA";
          }
        }
      }
    }
  }

  reiniciarJuego() {
    this.yacare.yA = height / 2;
    this.yacare.torpedo.disparada = false;
    this.vidaBuque = 15; 
    for (let i = 0; i < this.cant; i++) {
      this.torpedosRojos[i].reiniciarTorpedoRojo();
    }
  }

  verificarPresionMouse() {
    if (this.estado === "GAMEOVER") {
      let anchoBoton = 140;
      let altoBoton = 40;
      let yBotones = height / 2 + 45; 
      let xBotonContinuar = width / 2 - 80;
      let xBotonReiniciar = width / 2 + 80;

      if (
        mouseX > xBotonContinuar - anchoBoton / 2 &&
        mouseX < xBotonContinuar + anchoBoton / 2 &&
        mouseY > yBotones - altoBoton / 2 &&
        mouseY < yBotones + altoBoton / 2
      ) {
        if (this.audio) {
          this.audio.reproducirBoton();
        }
        this.reiniciarJuego();
        this.estado = "INICIO";
      }

      if (
        mouseX > xBotonReiniciar - anchoBoton / 2 &&
        mouseX < xBotonReiniciar + anchoBoton / 2 &&
        mouseY > yBotones - altoBoton / 2 &&
        mouseY < yBotones + altoBoton / 2
      ) {
        if (this.audio) {
          this.audio.reproducirBoton();
        }
        this.reiniciarJuego();
        this.estado = "INICIO";
      }
    } 
    else if (this.estado === "VICTORIA") {
      let anchoBoton = 140;
      let altoBoton = 40;
      let yBotones = height / 2 + 45; 
      let xBoton = width / 2;

      if (
        mouseX > xBoton - anchoBoton / 2 &&
        mouseX < xBoton + anchoBoton / 2 &&
        mouseY > yBotones - altoBoton / 2 &&
        mouseY < yBotones + altoBoton / 2
      ) {
        if (this.audio) {
          this.audio.reproducirBoton();
        }
        this.reiniciarJuego();
        this.estado = "INICIO";
      }
    }
  }
}
