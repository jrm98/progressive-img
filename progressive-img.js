

export default function init(settings=null) {
    const domReady = function (callback) {
        document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback)
    }

    domReady(() => {
        const watch = (nodeList, observer) => {
            Object.keys(nodeList).forEach(k => {
                const el = nodeList[k]
                observer.observe(el)
            })
        }

        if (typeof IntersectionObserver !== 'undefined') {
            // regular images observer
            const ioImgs = new IntersectionObserver(
                entries => {
                    // console.log(entries)

                    Object.keys(entries).forEach(k => {
                        if (!entries[k].isIntersecting) {
                            return;
                        }
                        const el = entries[k].target
                        const src = el.getAttribute('data-src')
                        el.src = src
                        el.removeAttribute('data-src')
                        ioImgs.unobserve(el)
                    })
                },
                {
                    /* Using default options. */
                }
            )

            // background images observer
            const ioBgImgs = new IntersectionObserver(
                entries => {
                    // console.log(entries)

                    Object.keys(entries).forEach(k => {
                        if (!entries[k].isIntersecting) {
                            return;
                        }
                        const el = entries[k].target
                        const src = el.getAttribute('data-src')
                        el.setAttribute('style', `background-image: url('${src}');`)
                        el.removeAttribute('data-src')
                        ioBgImgs.unobserve(el)
                    })
                },
                {
                    /* Using default options. */
                }
            )

            const imgs = document.querySelectorAll('.progressive-img img[data-src]')
            watch(imgs, ioImgs)



            const bgImgs = document.querySelectorAll('.progressive-img div[data-src]')
            watch(bgImgs, ioBgImgs)

            // create callback for use with MutationObserver
            const callback = (mutationsList, observer) => {
                console.log('mutationsList', mutationsList)
                for (let i = 0; i < mutationsList.length; i++) {
                    if (mutationsList[i].addedNodes && mutationsList[i].addedNodes.length > 0) {
                        const nodes = mutationsList[i].addedNodes
                        Object.keys(nodes).forEach(k => {
                            const node = nodes[k]
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                const addedImgs = node.querySelectorAll('.progressive-img img[data-src]')
                                watch(addedImgs, ioImgs)

                                const addedBgImgs = node.querySelectorAll('.progressive-img div[data-src]')
                                watch(addedBgImgs, ioBgImgs)
                            }
                        })
                    }
                }
            }

            // if supported, add a mutation observer for all body DOM nodes
            if (typeof MutationObserver !== 'undefined') {
                const obs = new MutationObserver(callback)
                const root = document.getElementsByTagName('body')[0]
                const config = { childList: true, subtree: true };
                obs.observe(root, config)
            }
        } else {
            // if IntersectionObserver is not supported, just replace all images
            const imgs = document.querySelectorAll('.progressive-img img[data-src]')
            Object.keys(imgs).forEach(k => {
                const el = imgs[k]
                const src = el.getAttribute('data-src')
                el.src = src
            })

            const bgImgs = document.querySelectorAll('.progressive-img div[data-src]')
            Object.keys(bgImgs).forEach(k => {
                const el = bgImgs[k]
                const src = el.getAttribute('data-src')
                el.setAttribute('style', `background-image: url('${src}');`)
            })
        }
    })
}