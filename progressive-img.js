

export default function init(settings=null) {
    const domReady = function (callback) {
        document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback)
    }

    domReady(() => {
        const watch = () => {
            if (typeof IntersectionObserver !== 'undefined') {
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
                            ioImgs.unobserve(el)
                        })
                    },
                    {
                        /* Using default options. */
                    }
                )

                const imgs = document.querySelectorAll('.progressive-img img[data-src]')
                Object.keys(imgs).forEach(k => {
                    const el = imgs[k]
                    ioImgs.observe(el)
                })


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
                            ioBgImgs.unobserve(el)
                        })
                    },
                    {
                        /* Using default options. */
                    }
                )
                const bgImgs = document.querySelectorAll('.progressive-img div[data-src]')
                Object.keys(bgImgs).forEach(k => {
                    const el = bgImgs[k]
                    ioBgImgs.observe(el)
                })
            } else {
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
        }

        // create callback for use with MutationObserver
        const callback = (mutationsList, observer) => {
            const elementsWereAdded = (list) => {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].addedNodes && list[i].addedNodes.length > 0) {
                        return true
                    }
                }
                return false
            }
            if (elementsWereAdded(mutationsList)) {
                watch()
            }
        }

        // if supported, add a mutation observer for all body DOM nodes
        if (typeof MutationObserver !== 'undefined') {
            const obs = new MutationObserver(callback)
            const root = document.getElementsByTagName('body')[0]
            const config = { childList: true, subtree: true };
            obs.observe(root, config)
        }

        // initial watch event
        watch()
    })
}