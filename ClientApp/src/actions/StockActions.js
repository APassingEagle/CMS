import StockConstants from "../constants/StockConstants";
import api from "../apis/StockApi";
import Dispatcher from "../dispatchers/actionDispatcher";
import ImageConstants from "../constants/ImageConstants";
import AccessoryConstants from "../constants/AccessoryConstants";

class StockActions {
	
	fetchStock(request) {
		api.fetchStock(request).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.LOAD_STOCK,
				records: response.items,
				pageCount: response.pageCount,
				currentPage: response.currentPage,
				searchText: response.searchText,
			});
		});
	}
	createStock(stockItem) {

		api.createStock(stockItem).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.CREATE_STOCK,
				hasSucceeded: response.hasSucceeded,
				saveMessage: response.message
			});
		});
	}
	viewStock(id) {

		api.viewStock(id).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.VIEW_STOCK,
				record: response
			});
		});
	}
	updateStock(record) {

		api.updateStock(record).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.UPDATE_STOCK,
				hasSucceeded: response.hasSucceeded,
				saveMessage: response.message
			});
		});
	}
	deleteStock(id) {

		api.deleteStock(id).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.DELETE_STOCK,
				hasSucceeded: response.hasSucceeded,
				saveMessage: response.message
			});
		});
	}

	createImage(record) {

		api.createImage(record).then((response) => {

			Dispatcher.dispatch({
				actionType: ImageConstants._.CREATE_IMAGE,
				hasSucceeded: response.HasSucceeded,
				saveMessage: response.Message
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

export default new StockActions();
