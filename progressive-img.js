

(function() {
    const domReady = function (callback) {
        document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback)
    }

    domReady(() => {
        if (typeof IntersectionObserver !== 'undefined') {
        	// lazy load images in img tags when scrolled into view
            const ioImgs = new IntersectionObserver(
                entries => {
                    console.log(entries)

                    Object.keys(entries).forEach(k => {
                        if (!entries[k].isIntersecting) {
                            return;
                        }
                        const el = entries[k].target
                        el.src = el.getAttribute('data-src')
                        ioImgs.unobserve(el)
                    })
                },
                {
                    /* Using default options. */
                }
            )

            // bind image elements to observer
            const imgs = document.querySelectorAll('img[data-src]')
            Object.keys(imgs).forEach(k => {
                const el = imgs[k]
                ioImgs.observe(el)
            })


            // lazy load background images when scrolled into view
            const ioBgImgs = new IntersectionObserver(
                entries => {
                    console.log(entries)

                    Object.keys(entries).forEach(k => {
                        if (!entries[k].isIntersecting) {
                            return;
                        }
                        const el = entries[k].target
                        el.setAttribute('style', `background-image: url('${el.getAttribute('data-bg-src')}');`)
                        ioBgImgs.unobserve(el)
                    })
                },
                {
                    /* Using default options. */
                }
            )

            // bind elements with background images to observer
            const bgImgs = document.querySelectorAll('[data-bg-src]')
            Object.keys(bgImgs).forEach(k => {
                const el = bgImgs[k]
                ioBgImgs.observe(el)
            })
        } else {
        	// if IntersectionObserver isn't supported, then just load all of the images
            const imgs = document.querySelectorAll('img[data-src]')
            Object.keys(imgs).forEach(k => {
                const el = imgs[k]
                el.src = el.getAttribute('data-src')
            })

            const bgImgs = document.querySelectorAll('[data-bg-src]')
            Object.keys(bgImgs).forEach(k => {
                const el = bgImgs[k]
                el.setAttribute('style', `background-image: url('${el.getAttribute('data-src')}');`)
            })
        }
    })
})();