import StockConstants from "../constants/StockConstants";
import api from "../apis/StockApi";
import Dispatcher from "../dispatchers/actionDispatcher";

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
				actionType: StockConstants._.CREATE_STOCK
			});
		});
	}
	viewStock(id) {

		api.viewStock(id).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.VIEW_STOCK,
				record: response.item
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
}

export default new StockActions();
