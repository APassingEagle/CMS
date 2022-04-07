import ImageConstants from "../constants/ImageConstants";
import api from "../apis/StockApi";
import Dispatcher from "../dispatchers/actionDispatcher";

class ImageActions {
	
	createImage(record) {

		api.createImage(record).then((response) => {

			Dispatcher.dispatch({
				actionType: ImageConstants._.CREATE_IMAGE
			});
		});
	}
	deleteImage(id) {

		api.deleteImage(id).then((response) => {

			Dispatcher.dispatch({
				actionType: ImageConstants._.DELETE_IMAGE,
				hasSucceeded: response.HasSucceeded,
				saveMessage: response.Message
			});
		});
	}
}

export default new ImageActions();
