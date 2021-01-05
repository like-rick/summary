const Jsonp = function (url, params) {
    return new Promise((resolve, reject) => {
        const callback = `callback${new Date().getDate()}`
        const script = document.createElement('script');
        url += `?${paraseParams(params)}`;
        script.src = url;
        script.async = true;
        document.body.appendChild(script);
        
        window[callback] = function (res) {
            delete window[callback];
            document.body.removeChild(script);
            resolve(res);
        }
    })
}
function paraseParams(params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}
export default Jsonp;