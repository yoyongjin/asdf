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

  connect(ziboxip: string) {
    this.zibox.connect(ziboxip);
    this.zibox.initializeAudioContext();
    this.zibox.monIP('127.0.0.1');
    this.zibox.monOn();
  }

  disconnect() {
    this.zibox.disconnect();
  }

  monStart() {
    this.zibox.monStart();
  }

  monStop() {
    return this.zibox.monStop();
  }
}

export default Zibox;
