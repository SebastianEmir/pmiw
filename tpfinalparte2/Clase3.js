class TorpedoRojo {   
  constructor(img) {
    this.img = img;
    this.posX = random(width, width + 400); 
    this.tama = random(25, 45);
    this.posY = random(this.tama, height - this.tama); 
    this.vel = random(3, 5); 
  }

  dibujarTorpedoRojo() {
    if (this.img) {
      imageMode(CENTER);
      image(this.img, this.posX, this.posY, this.tama * 2, this.tama);
    }
  }
  moverTorpedoRojo() {
    if (this.posX < -this.tama * 2) {
      this.posX = random(width + 50, width + 400); 
      this.tama = random(25, 45);
      this.posY = random(this.tama, height - this.tama);
    }
    this.posX -= this.vel;
  }
  colisionTorpedo(torpedoAmarillo) {
    let ancho = this.tama * 2;
    let alto = this.tama;
    return (
      torpedoAmarillo.xB > this.posX - ancho / 2 &&
      torpedoAmarillo.xB < this.posX + ancho / 2 &&
      torpedoAmarillo.yB > this.posY - alto / 2 &&
      torpedoAmarillo.yB < this.posY + alto / 2
    );
  }

  colisionYacare(yacare) {
    let ancho = this.tama * 2;
    let alto = this.tama;

    return (
      yacare.xA > this.posX - ancho / 2 &&
      yacare.xA < this.posX + ancho / 2 &&
      yacare.yA > this.posY - alto / 2 &&
      yacare.yA < this.posY + alto / 2
    );
  }
  reiniciarTorpedoRojo() {
    this.posX = random(width + 50, width + 400);
    this.tama = random(25, 45);
    this.posY = random(this.tama, height - this.tama);
  }
}
