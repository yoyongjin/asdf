import Zibox from 'lib/zibox';
import constants from 'utils/constants';
import Logger from 'utils/log';

class Communicator {
  private static type = constants.ZIBOX_MODE;
  static async create() {
    Logger.log('Create Zibox');
    await Zibox.getInstance().create();
  }
}

export default Communicator;
