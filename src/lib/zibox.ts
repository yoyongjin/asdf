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
    await this.zibox.connect(ziboxip);
    // this.zibox.ftpIP('118.131.74.196' + ',zibox,irlink');
    // this.zibox.ftpOn();
    this.zibox.ftpOff();
    this.zibox.initializeAudioContext();
    this.zibox.monIP('127.0.0.1');
    setTimeout(() => {
      this.zibox.monOn();
    }, 1000);
  }

  disconnect() {
    this.zibox.disconnect();
  }

  monStart() {
    this.zibox.recStart();
    this.zibox.monStart();
  }

  monStop() {
    this.zibox.recStop();
    return this.zibox.monStop();
  }
}

export default Zibox;
