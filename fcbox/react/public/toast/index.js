import './index.less';

import React, {Component} from 'react';

class Toast extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            timeOut: 2000
        };
    }

    componentDidMount() {
        window.fc = window.fc || {};
        window.fc.Toast = this;
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

    renderContent() {
        if(this.state.theme == 'white') {
            return (
                <div className="fc-toast-white fc-pop-shadow">
                    <span className="fc-toast-text">{this.state.text}</span>
                </div>
            );
        }
        return (
            <div className="fc-toast-black fc-pop-shadow">
                <span className="fc-toast-text">{this.state.text}</span>
            </div>
        );
    }

    render() {
        if(!this.state.show) {
            return false;
        }
        return (
            <div ref="toast" className="fc-pop">
                <div className="fc-pop-mask"></div>
                <div className="fc-pop-table">
                    <div className="fc-pop-table-cell">
                        <div className="fc-pop-content">
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Toast;