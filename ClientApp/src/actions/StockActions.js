import StockConstants from "../constants/StockConstants";
import api from "../apis/StockApi";
import Dispatcher from "../dispatchers/actionDispatcher";

class StockActions {
	
	fetchStock(request) {
		api.fetchStock(request).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.VIEW_STOCK,
				records: response.Records,
				pageCount: response.PageCount,
				currentPage: response.CurrentPage,
				searchText: response.SearchText,
			});
		});
	}

	createStock() {

		api.createStock().then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.CREATE_STOCK
			});
		});
	}

	viewStock(id) {

		api.viewStock(id).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.VIEW_STOCK,
				record: response.Record
			});
		});
	}

	updateStock(record) {

		api.updateStock(record).then((response) => {

			Dispatcher.dispatch({
				actionType: StockConstants._.UPDATE_STOCK,
				hasSucceeded: response.HasSucceeded,
				saveMessage: response.Message
			});
		});
	}
}

export default new StockActions();
