# progressive-img
A simple javascript tool to enable progressive lazy-loading for images and 
background images. This tool utilizes the `IntersectionObserver` class where
supported to lazy-load source files for `<img>` tags as well as background
images for any matching tag.

## Usage
**Images**: image elements matching the selector `img[data-src]` will be 
lazy-loaded and replace the original image source upon load. 
`<img src="some-image.png">` => `<img data-src="some-image.png">`

**Background Images**: all elements matching the selector `[data-bg-src]` will 
be lazy-loaded and replace the original element inline style attribute with the 
background image url provided in the `data-bg-src` attribute. Example: 
`<div style="background-image: url('some-image.png')">...</div>` => 
`<div data-bg-src="some-image.png"></div>`.

## Placeholders
For both images and background images, original sources will be overwritten but
are still useful for adding low fidelity versions of the same image as a
placeholder.

Example: 
```html
<img src="some-image-lowres.png" data-src="some-image.png">
```

## Disabled Javascript Fallback
It is good to keep a `<noscript>` fallback in the unlikely case of a browser
having Javascript disabled.

Example: 
```html
<noscript>
	<img src="some-image.png">
</noscript>
<img src="some-image-lowres.png" data-src="some-image.png">
```

Also, make sure to hide the progressive version:

```html
<noscript><style>[data-src] { display: none; }</style></noscript>
```

Note: this snippet is only needed once
