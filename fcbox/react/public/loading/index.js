import './index.less';

import React, {Component} from 'react';

class Loading extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            timeOut: 20000
        };
    }

    componentDidMount() {
        window.fc = window.fc || {};
        window.fc.Loading = this;
    }

    hide() {
        const state = this.state;
        if (state.to) {
            clearTimeout(state.to);
        }
        this.setState({
            show: false
        });
    }

    show(param = {}) {
        const state = this.state;
        Object.assign(state, param);
        this.setState({
            show: true
        });
        if (state.to) {
            clearTimeout(state.to);
        }
        state.to = setTimeout(() => {
            this.setState({
                show: false
            });
        }, state.timeOut);
    }

    render() {
        if(!this.state.show) {
            return false;
        }
        return (
            <div ref="loading" className="fc-loading-component">
                <div className="fc-loading-mask"></div>
                <div className="fc-loading"></div>
            </div>
        );
    }

}

export default Loading;
