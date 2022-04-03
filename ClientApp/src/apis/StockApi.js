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

	createStock = (record) => {
		
		return new Promise(function (resolve, reject) {

			api.post({
				url: '/StockItems/Create',
				data: record
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
}

export default new StockApi();