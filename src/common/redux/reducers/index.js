import com from 'src/common/js/com';
import config from 'src/common/js/config';

const initState = {
    com,
    config,
    pagesLoaded: {},
    pagesLocked: {}
};

export default (state = initState, param) => {
    switch (param.type) {
        case 'set':
        case 'setStatic':
			const key = param.key;
			if(!key) {
				return;
			}
			const keyArr = key.toString().split('.');
			let setParam = state;
			for(var i in keyArr) {
				if (i < keyArr.length - 1) {
					setParam = setParam[keyArr[i]];
				}
			}
			setParam[keyArr[keyArr.length - 1]] = param.data;
            if (param.type == 'set') {
                return Object.assign({}, state);
            }
            return state;
        case 'refresh':
            return Object.assign({}, state);
        default:
            return state;
    }
};
