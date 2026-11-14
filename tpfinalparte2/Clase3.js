class TorpedoRojo {   
  constructor(img) {
    this.img = img;
    this.posX = random(width, width * 2); 
    this.tama = random(20, 40);
    this.posY = random(this.tama / 2, height - (this.tama * 1.5));
    this.vel = random(2, 4);
  }
  
  dibujarTorpedoRojo() {
    if (this.img) {
      imageMode(CENTER);
      image(this.img, this.posX, this.posY, this.tama * 2, this.tama);
    }
  }
  
  moverTorpedoRojo() {
    if (this.posX < -this.tama * 2) {
      this.posX = random(width + 50, width + 300); 
      this.tama = random(20, 40);
      this.posY = random(this.tama / 2, height - (this.tama * 1.5));
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
    this.posX = random(width + 50, width + 300);
    this.tama = random(20, 40);
    this.posY = random(this.tama / 2, height - (this.tama * 1.5));
  }
}
