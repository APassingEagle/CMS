import $ from 'jquery';

class AjaxApi {

    post(options) {

        return new Promise((resolve, reject) => {

            $.ajax({
                url: options.url,
                type: "POST",
                data: options.data,
                success: (result) => resolve(result),
                error: (xhr, error) => {

                    if (xhr.status === 401) {
                        window.location = `/ReturnUrl=${window.location.pathname}`;
                    } else {

                        reject(xhr, error);
                    }
                }
            });
        });
    }

    put(options) {

        return new Promise((resolve, reject) => {

            $.ajax({
                url: options.url,
                type: "PUT",
                data: options.data,
                success: (result) => {

                    resolve(result);
                },
                error: (xhr, error) => {

                    if (xhr.status === 401) {
                        window.location = `/ReturnUrl=${window.location.pathname}`;
                    } else {

                        reject(xhr);
                    }
                }
            });
        });
    }

    patch(options) {

        return new Promise((resolve, reject) => {

            $.ajax({
                url: options.url,
                type: "PATCH",
                data: options.data,
                success: (result) => {

                    resolve(result);
                },
                error: (xhr, error) => {

                    if (xhr.status === 401) {
                        window.location = `/ReturnUrl=${window.location.pathname}`;
                    } else {

                        reject(xhr);
                    }
                }
            });
        });
    }

    get(options) {
        return new Promise((resolve, reject) => {

            $.ajax({
                url: options.url,
                data: options.data || "",
                success: (result) => resolve(result),
                error: (xhr, error) => {

                    if (xhr.status === 401) {
                        window.location = `/?ReturnUrl=${window.location.pathname}`;
                    } else {

                        reject(xhr, error);
                    }
                }
            });
        });
    }

    delete(options) {

        return new Promise((resolve, reject) => {

            $.ajax({
                url: options.url,
                type: "DELETE",
                data: options.data,
                success: (result) => {

                    resolve(result);
                },
                error: (xhr, error) => {

                    if (xhr.status === 401) {
                        window.location = `/ReturnUrl=${window.location.pathname}`;
                    } else {

                        reject(xhr);
                    }
                }
            });
        });
    }
}

export default new AjaxApi();
