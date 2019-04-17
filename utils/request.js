export default class Request {
    constructor(header = {}) {
        this._header = header;
    }

    //设置统一的错误处理
    setErrorHandler(handler) {
        this._errorHandler = handler;
    }

    //GET请求
    getRequest(url, data = null, header = this._header) {
        return this.requestAll(url, data, header, 'GET');
    }

    //DELETE请求
    deleteRequest(url, data = null, header = this._header) {
        return this.requestAll(url, data, header, 'DELETE');
    }

    //PUT请求
    putRequest(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'PUT');
    }

    //POST请求
    postRequest(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'POST');
    }


    //封装的网络请求
    requestAll(url, data, header, method) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: data,
                header: header,
                method: method,
                success: (res => {
                    if (res.statusCode === 200) {
                        resolve(res);
                    } else {
                        if (this._errorHandler !== null) {
                            this._errorHandler(res);
                        }
                        reject(res);
                    }
                }),
                fail: (res => {
                    if (this._errorHandler !== null) {
                        this._errorHandler(res);
                    }
                    reject(res);
                })
            })
        })
    }
}