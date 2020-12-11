// (function (window, document) {
    'use strict'

    function isFunction (fn) {
        return fn instanceof Function;
    }

    function _Promise(fn) {

        if (!isFunction(fn)) {
            throw new Error("_Promise constructor must be a function")
        }
   
        var promise = this, value = undefined;
        promise._resolve = [];
        promise._status = "pending"
        promise._reject = [];
        this.then = function (onFullfiled, onRejected) {
            return new _Promise(function (resolve, reject) {
                function handle(value) {
                    var ret = isFunction(onFullfiled) && onFullfiled(value) || value;
                    if (ret && isFunction(ret['then'])) {
                        ret.then(function (value) {
                            resolve(value)
                        })
                    } else {
                        resolve(ret);
                    }
                }

                function errorBack(reason) {
                    reason = isFunction(onRejected) && onRejected(reason) || reason;
                    reject(reason);
                }

                if (promise._status == "pending") {
                    promise._resolve.push(handle);
                    promise._reject.push(errorBack);
                } else if (promise._status == "fulfilled") {
                    handle(value)
                } else {
                    errorBack(value);
                }
                // console.log(promise);
            })
        }

        function resolve(value) {
            setTimeout(function () {
                promise._status = "fulfilled"
                promise._resolve.forEach(callback => {
                    callback(value);
                });
            },0)
        }

        function reject(value) {
            setTimeout(function () {
                promise._status = "rejected";
                promise._reject.forEach(callback => {
                    callback(value)
                })
            }, 0)
        }

        fn(resolve, reject)

    }

    _Promise.all = function (promises) {
        if (!Array.isArray(promises)) {
            throw new TypeError('_Promise.all`s parameter must be array')
        }
        return new _Promise(function (resolve, reject) {
            var result = [], len = promises.length, i = 0, count = len;

            function resolver(idx) {
                return function (value) {
                    result[idx] = value;
                    if (--count == 0) {
                        resolve(result)
                    }
                }
            }

            function rejecter(reason) {
                reject(reason)
            }

            for (; i < len; i++) {
                console.log(promises)
                promises[i].then(resolver(i), rejecter)
            }

        })
    }

    _Promise.race = function (promises) {
        if (!Array.isArray(promises)) {
            throw new TypeError("_Promise.race`s parameter must be array")
        }

        return new _Promise(function (resolve, reject) {

            var len = promises.length, i = 0;

            for (; i < len; i++){
                promises[i].then(function (value) {
                    resolve(value)
                }, function (reason) {
                    reject(reason);
                })
            }
        })

    }

// })(window, document)





