import { EventEmitter } from "events";
import ActionDispatcher from "../dispatchers/actionDispatcher";
import StockConstants from "../constants/StockConstants";

let _pageCount = 1;
let _currentPage = 1;
let _searchText = "";
let _records = [];
let _saveMessage = "";
let _isSaveSuccessful = false;

let _record = null;

class StockStore extends EventEmitter {

	constructor() {
		super();

		ActionDispatcher.register(this.dispatcherCallBack.bind(this));
	}

	addChangeListener = (callback) => this.addListener("change", callback);

	removeChangeListener = (callback) => this.removeListener("change", callback);

	removeEventListener = (event, callback) => this.removeListener(event, callback);

	addEventListener = (event, callback) => {

		if (this.listeners(event).length === 0) {
			this.addListener(event, callback);
		}
	};

	emitChange = () => this.emit("change");

	getCurrentPage = () => _currentPage;
	getPageCount = () => _pageCount;
	getSearchText = () => _searchText;
	getRecords = () => _records;
	getRecord = () => _record;
	getSaveMessage = () => _saveMessage;
	isSaveSuccessful = () => _isSaveSuccessful;

	dispatcherCallBack(payload) {

		switch (payload.actionType) {

			case StockConstants._.LOAD_STOCK:
				_records = payload.records;
				_pageCount = payload.pageCount;
				_currentPage = payload.currentPage;
				_searchText = payload.searchText;

				this.emitChange();
				break;

			case StockConstants._.VIEW_STOCK:
				_record = payload.record;

				this.emit("viewStock");
				break;

			case StockConstants._.CREATE_STOCK:
				_isSaveSuccessful = payload.hasSucceeded;
				_saveMessage = payload.saveMessage;

				this.emit("createStock")
				break;

			case StockConstants._.UPDATE_STOCK:
				_isSaveSuccessful = payload.hasSucceeded;
				_saveMessage = payload.saveMessage;

				this.emit("updateStock");
				break;
				
			case StockConstants._.DELETE_STOCK:
				this.emit("deleteStock")
		}
	}
}

export default new StockStore();
