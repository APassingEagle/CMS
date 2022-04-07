import AccessoryConstants from "../constants/AccessoryConstants";
import api from "../apis/StockApi";
import Dispatcher from "../dispatchers/actionDispatcher";

class AccessoryActions {
	
	createAccessory(record) {

		api.createAccessory(record).then((response) => {

			Dispatcher.dispatch({
				actionType: AccessoryConstants._.CREATE_ACCESSORY
			});
		});
	}
	deleteAccessory(id) {

		api.deleteAccessory(id).then((response) => {

			Dispatcher.dispatch({
				actionType: AccessoryConstants._.DELETE_ACCESSORY,
				hasSucceeded: response.HasSucceeded,
				saveMessage: response.Message
			});
		});
	}
}

export default new AccessoryActions();
