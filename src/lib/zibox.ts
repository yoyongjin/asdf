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

  async connect(ziboxip: string, ziboxmic: number, ziboxspk: number) {
    try {
      await this.zibox.connect(ziboxip);
      // this.zibox.ftpIP('118.131.74.196' + ',zibox,irlink');
      // this.zibox.ftpOn();
      this.zibox.ftpOff();
      // this.zibox.initializeAudioContext();
      // this.zibox.atsVolume(5);
      // this.zibox.leftVolume(10);
      // this.zibox.rightVolume(8);
      if (ziboxmic && ziboxspk) {
        this.zibox.micVolume(ziboxmic);
        this.zibox.spkVolume(ziboxspk);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.zibox.monIP('127.0.0.1');
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.zibox.monOn();

      this.zibox.disitalVolumeInfo();

      return true;
    } catch (error) {
      console.error(error);
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

  monVolume(type: number, gauge: number) {
    if (type === 0) {
      // 왼쪽 볼륨
      this.zibox.leftMonVolume(gauge);
    } else if (type === 1) {
      // 오른쪽 볼륨
      this.zibox.rightMonVolume(gauge);
    }
  }

  setVolume(type: number, gauge: number) {
    if (type === 0) {
      // 마이크 볼륨
      this.zibox.micVolume(gauge);
    } else if (type === 1) {
      // 스피커 볼륨
      this.zibox.spkVolume(gauge);
    }
  }

  setEventListener(callback: (type: string, date: any) => void) {
    this.zibox.onCommandEventListener = function (type: string, data: any) {
      console.log('onCommandEventListener => ', ' ', type, ' ', data);
      callback(type, data);
    };
  }
}

export default Zibox;
