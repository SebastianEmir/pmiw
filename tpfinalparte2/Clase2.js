class Principal {
  constructor(cantNaves, tamArma, imgTorpedoRojo, imgYacares, imgTorpedoAmarillo, imgCortezaV, imgCortezaH, audioObj, imgBuque) {
    this.cant = cantNaves;
    this.torpedosRojos = [];
    this.yacare = new Yacare(tamArma, imgYacares, imgTorpedoAmarillo);
    
    //torpedos rojos cantidad
    for (let i = 0; i < this.cant; i++) {
      this.torpedosRojos[i] = new TorpedoRojo(imgTorpedoRojo);
    }

    this.cortezaVertical = imgCortezaV;
    this.cortezaHorizontal = imgCortezaH;
    this.audio = audioObj;
    this.buqueImg = imgBuque;
    
    //salud del buque
    this.vidaMaxBuque = 15;     
    this.vidaBuque = 15;         
    this.tiempoParpadeo = 0;     
    this.tiempoUltimoDisparo = 0;

    this.estado = "INICIO";  
  }

  dibujar() {
    if (this.estado === "INICIO") {
      // Detenemos la musica si volvemos al inicio
      if (this.audio) {
        this.audio.detenerMusica();
      }
      push();
      imageMode(CENTER);
      if (this.cortezaVertical) {
        image(this.cortezaVertical, width / 2, height / 2, 480, 260);
      } else {
        fill(0, 180);
        rect(width / 2, height / 2, width, height);
      }

      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(24);
      text("¡Preparate para la batalla!", width / 2, height / 2 - 50);
      textSize(18);
      text("Recorre el rio, esquiva los torpedos y",385,210);
      text("\nderrota al buque enemigo para ganar.\nPresiona ENTER para continuar", 385,230);
      pop();
    } 
    else if (this.estado === "INSTRUCCIONES") {
      push();
      imageMode(CENTER);
      if (this.cortezaVertical) {
        image(this.cortezaVertical, width / 2, height / 2, 520, 280);
      } else {
        fill(0, 180);
        rect(width / 2, height / 2, width, height);
      }
      
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(28);
      text("Instrucciones de Jugabilidad", width / 2, height / 2 - 70);
      textSize(18);
      text(" Usa las FLECHAS ARRIBA y ABAJO para moverte",385,210);
      text("Haz CLICK para disparar los torpedos", 385,230);
      text("Destruye al buque para ganar", 385,250);
      text("Presiona ENTER para comenzar", 385,270);
      pop();
    } 
      
    else if (this.estado === "JUGANDO") {
      // Iniciamos la musica de fondo en bucle al estar jugando
      if (this.audio) {
        this.audio.iniciarMusica();
      }
      //cantidad
      for (let i = 0; i < this.cant; i++) {
        this.torpedosRojos[i].dibujarTorpedoRojo();
        this.torpedosRojos[i].moverTorpedoRojo();
      }

      this.yacare.dibujarYacare();
      if (this.buqueImg) {
        push();
        imageMode(CENTER);
        let posXBuque = 650; 
        let posYBuque = 35;  
        let anchoBuque = 300;
        let altoBuque = 200;  
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
      // Detenemos la musica al perde
      if (this.audio) {
        this.audio.detenerMusica();
      }
      push();
      imageMode(CENTER);
      if (this.cortezaHorizontal) {
        image(this.cortezaHorizontal, width / 2, height / 2, 500, 320);
      } else {
        fill(0, 200);
        rect(width / 2, height / 2, width, height);
      }

      fill(255, 100, 100);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(30);
      text("¡DERROTA!", width / 2, height / 2 - 80);

      textSize(18);
      fill(255);
      text("Fuiste alcanzado por un torpedo enemigo", width / 2, height / 2 - 35);
      
      let anchoBoton = 140;
      let altoBoton = 40;
      let yBotones = height / 2 + 15;

      fill(70, 130, 180);
      rect(width / 2 - 85, yBotones, anchoBoton, altoBoton, 8);
      fill(255);
      textSize(14);
      text("CONTINUAR", width / 2 - 85, yBotones);

      fill(180, 70, 70);
      rect(width / 2 + 85, yBotones, anchoBoton, altoBoton, 8);
      fill(255);
      text("REINICIAR", width / 2 + 85, yBotones);

      textSize(18);
      fill(255, 255, 255);
      text("Creditos: Sebastian Gualtieri y Evelyn Gualtieri", width / 2, height / 2 + 85);
      pop();
    }

    else if (this.estado === "VICTORIA") {
      // Detenemos la musica al ganar
      if (this.audio) {
        this.audio.detenerMusica();
      }

      push();
      imageMode(CENTER);
      if (this.cortezaHorizontal) {
        image(this.cortezaHorizontal, width / 2, height / 2, 500, 320);
      } else {
        fill(0, 200);
        rect(width / 2, height / 2, width, height);
      }

      fill(100, 255, 100);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(30);
      text("¡VICTORIA!", width / 2, height / 2 - 80);

      textSize(20);
      fill(255);
      text("¡El buque fue destruido con exito!", width / 2, height / 2 - 15);
      text("Ahora los yacares podran estar tranquilos.", width / 2, height / 2 - 35);

      let anchoBoton = 140;
      let altoBoton = 40;
      let yBotones = height / 2 + 15;

     fill(70, 130, 180);
      rect(width / 2, yBotones, anchoBoton, altoBoton, 8);
      fill(255);
      textSize(14);
      text("CONTINUAR", width / 2, yBotones);

      textSize(18);
      fill(255, 255, 255);
      text("Creditos: Sebastian Gualtieri y Evelyn Gualtieri", width / 2, height / 2 + 85);
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
        let posXBuque = 650; 
        let posYBuque = 30;  
        let anchoBuque = 300; 
        let altoBuque = 200;  

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
      let yBotones = height / 2 + 15; 
      let xBotonContinuar = width / 2 - 85;
      let xBotonReiniciar = width / 2 + 85;

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
      let yBotones = height / 2 + 15; 
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
