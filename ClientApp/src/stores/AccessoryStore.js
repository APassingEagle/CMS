import { EventEmitter } from "events";
import ActionDispatcher from "../dispatchers/actionDispatcher";
import AccessoryConstants from "../constants/AccessoryConstants";

let _saveMessage = "";
let _isSaveSuccessful = false;

let _record = null;

class AccessoryStore extends EventEmitter {

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
	getRecord = () => _record;

	dispatcherCallBack(payload) {

		switch (payload.actionType) {
			case AccessoryConstants._.CREATE_ACCESSORY:
				_isSaveSuccessful = payload.hasSucceeded;
				_saveMessage = payload.saveMessage;

				this.emit("createAccessory")
				break;
			case AccessoryConstants._.DELETE_ACCESSORY:
				this.emit("deleteAccessory")
		}
	}
}

export default new AccessoryStore();
