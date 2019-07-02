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
    var watch = function watch(nodeList, observer) {
      Object.keys(nodeList).forEach(function (k) {
        var el = nodeList[k];
        observer.observe(el);
      });
    };

    if (typeof IntersectionObserver !== 'undefined') {
      // regular images observer
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
      }); // background images observer

      var ioBgImgs = new IntersectionObserver(function (entries) {
        // console.log(entries)
        Object.keys(entries).forEach(function (k) {
          if (!entries[k].isIntersecting) {
            return;
          }

          var el = entries[k].target;
          var src = el.getAttribute('data-src');
          el.setAttribute('style', "background-image: url('".concat(src, "');"));
          el.removeAttribute('data-src');
          ioBgImgs.unobserve(el);
        });
      }, {
        /* Using default options. */
      });
      var imgs = document.querySelectorAll('.progressive-img img[data-src]');
      watch(imgs, ioImgs);
      var bgImgs = document.querySelectorAll('.progressive-img div[data-src]');
      watch(bgImgs, ioBgImgs); // create callback for use with MutationObserver

      var callback = function callback(mutationsList, observer) {
        // console.log('mutationsList', mutationsList)
        for (var i = 0; i < mutationsList.length; i++) {
          if (mutationsList[i].addedNodes && mutationsList[i].addedNodes.length > 0) {
            (function () {
              var nodes = mutationsList[i].addedNodes;
              Object.keys(nodes).forEach(function (k) {
                var node = nodes[k];

                if (node.nodeType === Node.ELEMENT_NODE) {
                  var addedImgs = node.querySelectorAll('.progressive-img img[data-src]');
                  watch(addedImgs, ioImgs);
                  var addedBgImgs = node.querySelectorAll('.progressive-img div[data-src]');
                  watch(addedBgImgs, ioBgImgs);
                }
              });
            })();
          }
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
      }
    } else {
      // if IntersectionObserver is not supported, just replace all images
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
  });
}