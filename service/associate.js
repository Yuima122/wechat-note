import Request from '../utils/request'
import environment from '../utils/environment'


export default class Associate {
    constructor() {
        this._baseUrl = environment.test + '/associate/';
        this._request = new Request();
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(err) {
        console.log(err);
    }

    create(data) {
        return this._request.postRequest(this._baseUrl, data).then(res => res.data);
    }

    put(data) {
        return this._request.putRequest(this._baseUrl, data).then(res => res.data);
    }
}