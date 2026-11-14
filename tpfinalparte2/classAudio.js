class GestorAudio {
  constructor(archivoSonido, archivoColision, archivoBoton, archivoMusica) {
    this.sonidoTorpedo = archivoSonido;
    this.sonidoColision = archivoColision;
    this.sonidoBoton = archivoBoton;
    this.musicaFondo = archivoMusica;
  }

  reproducirTorpedo() {
    if (this.sonidoTorpedo) {
      this.sonidoTorpedo.play();
    }
  }

  reproducirColision() {
    if (this.sonidoColision) {
      this.sonidoColision.play();
    }
  }

  reproducirBoton() {
    if (this.sonidoBoton) {
      this.sonidoBoton.play();
    }
  }
  iniciarMusica() {
    if (this.musicaFondo && !this.musicaFondo.isPlaying()) {
      this.musicaFondo.loop();
    }
  }
  detenerMusica() {
    if (this.musicaFondo && this.musicaFondo.isPlaying()) {
      this.musicaFondo.stop();
    }
  }
}
