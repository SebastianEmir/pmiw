class Yacare {  
  constructor(tama, imgYacares, imgTorpedoAmarillo) {
    this.tam = tama;
    this.xA = width / 2 - width / 3 - this.tam;
    this.yA = height / 2;
    this.torpedo = new TorpedoAmarillo(this.tam / 2, imgTorpedoAmarillo);

    this.animacionYacares = imgYacares; 
    this.frameActual = 0;
    this.contadorFrames = 0;
  }
  
  dibujarYacare() {
    push();
    imageMode(CENTER);
    if (this.animacionYacares && this.animacionYacares.length > 0) {
      let imgActual = this.animacionYacares[Math.floor(this.frameActual)];
      image(imgActual, this.xA, this.yA, this.tam * 2.5, this.tam);
      
      this.contadorFrames++;
      if (this.contadorFrames % 6 === 0) {
        this.frameActual = (this.frameActual + 1) % this.animacionYacares.length;
      }
    }
    pop();
    
    this.torpedo.dibujarTorpedoAmarillo();
    this.torpedo.moverTorpedo(this.xA, this.yA);
  }

  moverArriba() {
    if (this.yA > this.tam / 2) {
      this.yA -= 5;
    }
  }

  moverAbajo() {
    if (this.yA < height - this.tam / 2) {
      this.yA += 5;
    }
  }

  disparar() {
    this.torpedo.dispararTorpedoAmarillo();
  }
}

class TorpedoAmarillo {
  constructor(tamTorpedoAmarillo, imgTorpedoAmarillo) {
    this.tam = tamTorpedoAmarillo;
    this.xB = 0;
    this.yB = 0;
    this.disparada = false;
    this.img = imgTorpedoAmarillo;
  }
  dibujarTorpedoAmarillo() {
    if (this.img) {
      push();
      imageMode(CENTER);
      image(this.img, this.xB, this.yB, this.tam * 3, 15);
      pop();
    }
  }

  moverTorpedo(posX, posY) {
    if (!this.disparada) {
      this.xB = posX;
      this.yB = posY;
    } else {
      this.xB += 10;
    }
    if (this.xB > width + this.tam) {
      this.disparada = false;
    }
  }

  dispararTorpedoAmarillo() {
    if (!this.disparada) {
      this.disparada = true;
    }
  }
}
