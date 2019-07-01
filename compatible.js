"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init;

function init() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var domReady = function domReady(callback) {
        document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback);
    };

    domReady(function () {
        var watch = function watch() {
            if (typeof IntersectionObserver !== 'undefined') {
                var ioImgs = new IntersectionObserver(function (entries) {
                    // console.log(entries)
                    Object.keys(entries).forEach(function (k) {
                        if (!entries[k].isIntersecting) {
                            return;
                        }

                        var el = entries[k].target;
                        var src = el.getAttribute('data-src');
                        el.src = src;
                        el.removeAttribute('data-src');
                        ioImgs.unobserve(el);
                    });
                }, {
                    /* Using default options. */
                });
                var imgs = document.querySelectorAll('.progressive-img img[data-src]');
                Object.keys(imgs).forEach(function (k) {
                    var el = imgs[k];
                    ioImgs.observe(el);
                });
                var ioBgImgs = new IntersectionObserver(function (entries) {
                    // console.log(entries)
                    Object.keys(entries).forEach(function (k) {
                        if (!entries[k].isIntersecting) {
                            return;
                        }

                        var el = entries[k].target;
                        var src = el.getAttribute('data-src');
                        el.removeAttribute('data-src');
                        el.setAttribute('style', "background-image: url('".concat(src, "');"));
                        ioBgImgs.unobserve(el);
                    });
                }, {
                    /* Using default options. */
                });
                var bgImgs = document.querySelectorAll('.progressive-img div[data-src]');
                Object.keys(bgImgs).forEach(function (k) {
                    var el = bgImgs[k];
                    ioBgImgs.observe(el);
                });
            } else {
                var _imgs = document.querySelectorAll('.progressive-img img[data-src]');

                Object.keys(_imgs).forEach(function (k) {
                    var el = _imgs[k];
                    var src = el.getAttribute('data-src');
                    el.src = src;
                });

                var _bgImgs = document.querySelectorAll('.progressive-img div[data-src]');

                Object.keys(_bgImgs).forEach(function (k) {
                    var el = _bgImgs[k];
                    var src = el.getAttribute('data-src');
                    el.setAttribute('style', "background-image: url('".concat(src, "');"));
                });
            }
        }; // create callback for use with MutationObserver


        var callback = function callback(mutationsList, observer) {
            var elementsWereAdded = function elementsWereAdded(list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].addedNodes && list[i].addedNodes.length > 0) {
                        return true;
                    }
                }

                return false;
            };

            if (elementsWereAdded(mutationsList)) {
                watch();
            }
        }; // if supported, add a mutation observer for all body DOM nodes


        if (typeof MutationObserver !== 'undefined') {
            var obs = new MutationObserver(callback);
            var root = document.getElementsByTagName('body')[0];
            var config = {
                childList: true,
                subtree: true
            };
            obs.observe(root, config);
        } // initial watch event


        watch();
    });
}