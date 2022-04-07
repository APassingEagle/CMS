import api from "./AjaxApi";

class StockApi {
	
	fetchStock = (pageData) => {

		return new Promise(function (resolve, reject) {
			api.get({
				url: '/StockItems/FetchStock/',
                data: pageData
			}).then((result) => resolve(result));
		});
	};
	viewStock = (id) => {
		
		return new Promise(function (resolve, reject) {

			api.get({
				url: `/StockItems/View/${id}`
			})
			.then((result) => resolve(result));
		});
	};
	createStock = (stockItem) => {
		
		return new Promise(function (resolve, reject) {

			api.post({
				url: '/StockItems/Create',
				data: stockItem
			})
			.then((result) => resolve(result));
		});
	};
	updateStock = (record) => {
		
		return new Promise(function (resolve, reject) {

			api.put({
				url: '/StockItems/Update',
				data: record
			})
			.then((result) => resolve(result));
		});
	};
	deleteStock = (id) => {
		
		return new Promise(function (resolve, reject) {

			api.put({
				url: `/StockItems/Delete${id}`,
				data: record
			})
			.then((result) => resolve(result));
		});
	};


	createImage = (record) => {
		return new Promise(function (resolve, reject) {

			api.post({
				url: '/StockImages/CreateImage',
				data: record
			})
			.then((result) => resolve(result));
		});
	};
	deleteImage = (id) => {
		return new Promise(function (resolve, reject) {

			api.post({
				url: `/StockImages/DeleteImage/${id}`
			})
			.then((result) => resolve(result));
		});
	};

	createAccessory = (record) => {
		return new Promise(function (resolve, reject) {

			api.post({
				url: '/StockAccessories/CreateAccessory',
				data: record
			})
			.then((result) => resolve(result));
		});
	};
	deleteAccessory = (id) => {
		return new Promise(function (resolve, reject) {

			api.post({
				url: `/StockAccessories/DeleteAccessory/${id}`
			})
			.then((result) => resolve(result));
		});
	};

}

export default new StockApi();