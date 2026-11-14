class Fondo {
  constructor(imgFondo1, imgFondo2) {
    this.img1 = imgFondo1;
    this.img2 = imgFondo2;
    
    this.anchoFondo = 1584; 
    
    this.x1 = 0;
    this.x2 = this.anchoFondo;
    this.vel = 2;    
  }

  mover() {
    this.x1 -= this.vel;
    this.x2 -= this.vel;

    if (this.x1 <= -this.anchoFondo) {
      this.x1 = this.x2 + this.anchoFondo;
    }

    if (this.x2 <= -this.anchoFondo) {
      this.x2 = this.x1 + this.anchoFondo;
    }
  }

  dibujar() {
    imageMode(CORNER);
    image(this.img1, this.x1, 0, this.anchoFondo, height);
    image(this.img2, this.x2, 0, this.anchoFondo, height);
  }
}
