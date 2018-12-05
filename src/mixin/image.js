import {is} from '../utils'

export default {
    props: {
        src: {type: null, required: true},
        placeholder: {type: String},
        blur: {type: Number},
        aspectRatio: {type: Number},
        noRatio: {type: Boolean},
        fallback: {type: String},
        alt: {type: String},
        customClass: {type: String}
    },

    data() {
        return {
            isRendered: false,
            options: {cache: true},
            defaultBlur: 20,
            image: null,
            originalWidth: 0,
            placeholderImage: null,
            aspectRatioDetect: 0.5625,
            isPollingKilled: false,
            isImageCached: false,
            imageError: false,
            parsedSrc: null
        }
    },

    watch: {
        src() {
            this.handleImageLoading()
        }
    },

    computed: {
        shouldPlaceholderRender() {
            return !!this.placeholderImage
        },

        shouldImageRender() {
            return this.isRendered
        },

        cached() {
            return this.options.cache && this.isImageCached
        },

        calculatedRatio() {
            return this.aspectRatio || this.aspectRatioDetect
        },

        wrapperStyle() {
            if (this.noRatio) {
                return {}
            }

            return {
                paddingBottom: `${this.calculatedRatio * 100}%`
            }
        },

        componentStyle() {
            return {
                maxWidth: this.originalWidth === 0 ? '100%' : `${this.originalWidth}px`
            }
        },

        blurStyle() {
            let blur = this.defaultBlur

            if (is(this.blur)) {
                return this.getBlurStyle(this.blur)
            }

            if (is(this.options.blur)) {
                return this.getBlurStyle(this.options.blur)
            }

            return this.getBlurStyle(blur)
        }
    },

    mounted() {
        this.handleImageLoading()
    },

    methods: {
        getBlurStyle(amount) {
            if (amount === 0) {
                return
            }

            return {
                filter: `blur(${amount}px)`
            }
        },

        defineAspectRatio(img) {
            const delay = this.options.timeout || 2500
            const pollInterval = this.options.pollInterval || 10

            const poll = setInterval(() => {
                if (!img.naturalWidth) {
                    return
                }

                clearInterval(poll)

                const {naturalHeight, naturalWidth} = img

                this.aspectRatioDetect = naturalHeight / naturalWidth
                this.originalWidth = naturalWidth
            }, pollInterval)

            setTimeout(() => {
                if (img.naturalWidth) {
                    return
                }

                clearInterval(poll)
                this.isPollingKilled = true
            }, delay)
        },

        isCached(src) {
            const image = new Image()

            image.src = src

            return image.complete
        },

        loadImage(base64src, orientation) {
            const image = new Image()
            const delay = this.options.delay || 0
            const fallbackSrc = this.fallback || this.options.fallback
            const imageSource = this.imageError ? fallbackSrc : base64src

            if (this.options.cache && this.isCached(imageSource)) {
                this.image = imageSource
                this.placeholderImage = null
                this.isImageCached = true
            } else {
                // reset the image holder
                this.image = null
                this.isImageCached = false
                this.isRendered = false
            }

            if (!this.aspectRatio) {
                this.defineAspectRatio(image)
            }

            image.onload = () => {
                if (this.image) {
                    return
                }

                if (this.isPollingKilled && !this.aspectRatio) {
                    this.defineAspectRatio(image)
                }

                // assign the image
                this.image = imageSource
                let width = image.width,
                    height = image.height;

                let ctx
                try {
                    // the drawImage it's a synchronous method, so when it's done
                    // the nextTick will notify the view that we're ready
                    // to fadeIn the main image
                    let canvas = this.$refs.canvas;
                    ctx = canvas.getContext('2d')
                    
                    switch (orientation) {
                        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
                        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
                        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
                        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
                        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                        default: break;
                    }
                    
                    ctx.drawImage(this.$refs.main, 0, 0)
                } catch (e) {
                    // see https://github.com/MatteoGabriele/vue-progressive-image/issues/30
                }

                // next tick to know when the image is rendered
                this.$nextTick(() => {
                    // timeout for a custom delay
                    setTimeout(() => {
                        this.isRendered = true
                        // remove placeholder image
                        this.placeholderImage = null
                    }, delay)
                })

                this.imageError = false

                this.$emit('onLoad', image.src)
            }

            image.onerror = error => {
                this.$emit('onError', error)

                if (process.env.NODE_ENV !== 'production' && !this.fallback) {
                    console.warn('[vue-progressive-image] An error occured during the image loading')
                }

                if (this.fallback || this.options.fallback) {
                    this.imageError = true
                    this.handleImageLoading()
                }
            }

            image.src = imageSource
        },

        loadPlaceholder() {
            if (!this.placeholder && !this.options.placeholder) {
                return
            }

            const image = new Image()
            const src = this.placeholder || this.options.placeholder

            image.src = src

            image.onload = () => {
                this.placeholderImage = src

                // Dispatches an event on placeholder image load
                this.$emit('onLoadPlaceholder', src)
            }

            image.onerror = error => {
                this.$emit('onPlaceholderError', error)

                if (process.env.NODE_ENV !== 'production') {
                    console.warn('[vue-progressive-image] An error occured during the placeholder image loading')
                }
            }
        },

        getOrientation(file, callback) {
            var fileReader = new FileReader();
            fileReader.onloadend = function () {
                var base64img = "data:" + file.type + ";base64," + _arrayBufferToBase64(fileReader.result);
                var scanner = new DataView(fileReader.result);
                var idx = 0;
                var value = 1; // Non-rotated is the default
                if (fileReader.result.length < 2 || scanner.getUint16(idx) != 0xFFD8) {
                    // Not a JPEG
                    if (callback) {
                        callback(base64img, value);
                    }
                    return;
                }
                idx += 2;
                var maxBytes = scanner.byteLength;
                while (idx < maxBytes - 2) {
                    var uint16 = scanner.getUint16(idx);
                    idx += 2;
                    switch (uint16) {
                        case 0xFFE1: // Start of EXIF
                            var exifLength = scanner.getUint16(idx);
                            maxBytes = exifLength - idx;
                            idx += 2;
                            break;
                        case 0x0112: // Orientation tag
                            // Read the value, its 6 bytes further out
                            // See page 102 at the following URL
                            // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
                            value = scanner.getUint16(idx + 6, false);
                            maxBytes = 0; // Stop scanning
                            break;
                    }
                }
                if (callback) {
                    callback(base64img, value);
                }
            }
            fileReader.readAsArrayBuffer(file);
        },

        handleImageLoading() {
            this.loadPlaceholder()
            fetch( this.src )
                .then( (response) => {
                    this.getOrientation( response.blob(), (base64img, orientationValue) => {
                        this.loadImage(base64img, orientationValue);
                    } );
                } );
        }
    }
}
