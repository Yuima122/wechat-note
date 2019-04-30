import Request from '../utils/request'
import environment from '../utils/environment'

export default class Recommend {
    constructor() {
        this._baseUrl = environment.test + '/recommend/activity/';
        this._request = new Request();
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(err) {
        console.log(err);
    }

    get() {
        return this._request.getRequest(this._baseUrl).then(res => res.data);
    }
}