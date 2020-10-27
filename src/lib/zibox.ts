class Zibox {
  private static instance: Zibox;
  private zibox: any;

  constructor() {
    if (Zibox.instance) return Zibox.instance;
    else Zibox.instance = this;
  }

  static getInstance(): Zibox {
    if (!Zibox.instance) {
      Zibox.instance = new Zibox();
    }

    return Zibox.instance;
  }

  createZibox() {
    this.zibox = new (window as any).Zibox();
  }

  async connect(ziboxip: string) {
    try {
      await this.zibox.connect(ziboxip);
      // this.zibox.ftpIP('118.131.74.196' + ',zibox,irlink');
      // this.zibox.ftpOn();
      this.zibox.ftpOff();
      // this.zibox.initializeAudioContext();
      this.zibox.atsVolume(5);
      this.zibox.leftVolume(10);
      this.zibox.rightVolume(8);
      this.zibox.micVolume(40);
      this.zibox.spkVolume(60);

      await new Promise(resolve => setTimeout(resolve, 1000))
      this.zibox.monOn();
      this.zibox.monIP('127.0.0.1');

      return true;
    } catch (error) {
      console.error(error)
      // this.disconnect();
      return false;
    }
  }

  disconnect() {
    this.zibox.disconnect();
  }

  monStart() {
    this.zibox.recStart();
    this.zibox.monStart();
  }

  async monStop() {
    await this.zibox.monStop();
    return this.zibox.recStop();
  }
}

export default Zibox;
