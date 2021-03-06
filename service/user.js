import Request from '../utils/request'

export default class User {
    constructor() {
        this._baseUrl = 'https://www.weplann.cn/user/';
        this._request = new Request();
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(err) {
        console.log(err);
    }

    create(data) {
        return this._request.postRequest(this._baseUrl, data).then(res => res.data);
    }

    get(openId) {
        return this._request.getRequest(this._baseUrl + openId).then(res => res.data);
    }
}