import Request from '../utils/request'
import environment from '../utils/environment'

export default class Star {
    constructor() {
        this._baseUrl = environment.test + '/star/';
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