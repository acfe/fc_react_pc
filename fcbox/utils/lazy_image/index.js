
class LazyImage {

    constructor(param = {}) {
        this.param = {
            el: document,
            q: 90,
            showType: 'normal',
            data: []
        };
        Object.assign(this.param, param);
        this.load();
    }

    add(data = [], el) {
        const param = this.param;
        param.data = param.data.concat(data);
        if(el) {
            param.el = el;
            this.setDom();
        }
        this.loadImage();
    }

    load() {
        this.setDom();
        this.loadImage();
    }

    setDom() {
        const param = this.param;
        const imagesDom = param.el.querySelectorAll('.lazy-image');
        const imagesDomObj = {};
        if(imagesDom && imagesDom.length) {
            for(var i = 0; i < imagesDom.length; i++) {
                const key = imagesDom[i].getAttribute('data-source');
                if(key) {
                    imagesDomObj[key] = imagesDom[i];
                }
            }
        }
        param.imagesDomObj = imagesDomObj;
    }

    loadImage() {
        const param = this.param;
        if(!param.data.length) {
            return;
        }
        const source = param.data.shift();
        if(!param.imagesDomObj[source.key] || !source.url) {
            this.loadImage();
            return;
        }
        const imageWidth = param.imagesDomObj[source.key].clientWidth;
        const image = new Image();
        image.onload = (e) => {
            let height = parseInt(imageWidth/image.width * image.height);
            image.width = imageWidth;
            image.height = height;
            this.showImage({
                image,
                source
            });
            this.loadImage();
        };
        image.onerror = (e) => {
            if(source.retry) {
                return;
            }
            source.retry = true;
            param.data.push(source);
            this.loadImage();
        };
        //image.src = source.url.split('?')[0] + '?imageView2/2/w/' + imageWidth + '/q/' + param.q;
        image.src = source.url.split('?')[0];
    }

    showImage(imageParam) {
        const param = this.param;
        switch(param.showType) {
            default:
                this.showNormalImage(imageParam);
                break;
        }
    }

    showNormalImage(imageParam) {
        const param = this.param;
        if(!imageParam.source.lockHeight) {
            param.imagesDomObj[imageParam.source.key].style.height = parseInt(imageParam.image.height) + 'px';
        } else {
            if(param.imagesDomObj[imageParam.source.key].clientHeight > imageParam.image.height) {
                let height = param.imagesDomObj[imageParam.source.key].clientHeight;
                let width = height/imageParam.image.height * param.imagesDomObj[imageParam.source.key].clientWidth;
                imageParam.image.height = height;
                imageParam.image.width = width;
            }
        }
        param.imagesDomObj[imageParam.source.key].style.backgroundImage = 'none';
        param.imagesDomObj[imageParam.source.key].appendChild(imageParam.image);
    }

}

export default LazyImage;