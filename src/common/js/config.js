import { publicPath } from './env.config.js';

class Config {

	constructor() {
		this.init();
	}

	init() {
        this.setApiUrl();
	}

    setApiUrl() {
        this.api = {
            userInfo: '/user/ccb/userInfo'
        };
        this.homePage = {
            index: publicPath + 'index.html?show=index'
        };
    }

}
export default new Config();