import Request from '../utils/request'

export default class Login {
    constructor() {
        this._baseUrl = 'https://www.weplann.cn/api/code2Session';
        this._defaultHeader = {
            'content-type': 'application/json'
        };
        this._request = new Request(this._defaultHeader);
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(err) {
        console.log(err);
    }

    userLogin(data) {
        return this._request.postRequest(this._baseUrl, data).then(res => res.data);
    }
}