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

    put(data) {
        return this._request.putRequest(this._baseUrl, data).then(res => res.data);
    }
}