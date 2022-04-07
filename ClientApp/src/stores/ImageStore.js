import { EventEmitter } from "events";
import ActionDispatcher from "../dispatchers/actionDispatcher";
import ImageConstants from "../constants/ImageConstants";

let _saveMessage = "";
let _isSaveSuccessful = false;

let _record = null;

class ImageStore extends EventEmitter {

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
			case ImageConstants._.CREATE_IMAGE:
				_isSaveSuccessful = payload.hasSucceeded;
				_saveMessage = payload.saveMessage;

				this.emit("createImage")
				break;
			case ImageConstants._.DELETE_IMAGE:
				this.emit("deleteImage")
		}
	}
}

export default new ImageStore();
