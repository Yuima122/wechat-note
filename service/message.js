import Request from '../utils/request'
import environment from '../utils/environment'

export default class Message {
    constructor() {
        this._baseUrl = environment.test + '/message/';
        this._request = new Request();
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(err) {
        console.log(err);
    }

    create(data) {
        return this._request.postRequest(this._baseUrl, data).then(res => res.data);
    }

    get(activityId) {
        return this._request.getRequest(this._baseUrl + '?activityId=' + activityId).then(res => res.data);
    }
}