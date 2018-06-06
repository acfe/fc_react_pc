import "src/common/less/common.less";

class Com {

	constructor() {
		this.init();
	}

	init() {
        const docEl = document.documentElement;
        var width = docEl.getBoundingClientRect().width;
        var height = docEl.getBoundingClientRect().height;
        width = document.getElementById('app').clientWidth || width;
        height = document.getElementById('app').clientHeight || height;
        this.width = width;
        this.height = height;
	}

}
export default new Com();