import Request from '../utils/request'

export default class Star {
    constructor() {
        this._baseUrl = 'https://www.weplann.cn/star/';
        this._request = new Request();
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(err) {
        console.log(err);
    }

    create(data) {
        return this._request.postRequest(this._baseUrl, data).then(res => res.data);
    }

    delete(msgId, openId) {
        return this._request.deleteRequest(this._baseUrl + '?msgId=' + msgId + '&openId=' + openId).then(res => res.data);
    }
}