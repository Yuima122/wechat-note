import Request from "../utils/request";

export default class plan {
    constructor() {
        this._baseUrl = '';
        this._defaultHeader = {
            'content-type': 'application/json'
        };
        this._request = new Request(this._defaultHeader);
        this._request.setErrorHandler(this.errorHander);
    }

    errorHander(res) {
        console.log(res);
    }

    create() {
        return this._request.postRequest(this._baseUrl, null).then(res => res.data);
    }
}