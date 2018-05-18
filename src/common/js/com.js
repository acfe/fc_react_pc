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
        if (this.isPc()) {
            width = 375;
            height = 667;
            document.getElementById('app').style.width = width + 'px';
            document.getElementById('app').style.height = height + 'px';
        }
        docEl.style.fontSize = width + 'px';
        this.width = width;
        this.height = height;
	}

    isPc() {
        const userAgentInfo = navigator.userAgent;
        const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        let flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }

}
export default new Com();