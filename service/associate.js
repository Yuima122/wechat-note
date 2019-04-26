import Request from '../utils/request'

export default class Associate {
    constructor() {
        this._baseUrl = 'https://www.weplann.cn/associate/';
        this._request = new Request();
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(err) {
        console.log(err);
    }

    put(data) {
        return this._request.putRequest(this._baseUrl, data).then(res => res.data);
    }
}