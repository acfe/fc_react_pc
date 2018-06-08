import './index.less';

import React, {Component} from 'react';

class Button extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    componentDidMount() {
        this.refs.button.addEventListener('mousedown', (e) => {
            this.tap(e);
        });
    }

    tap(e) {
        console.log(e.layerX);
    }

    render() {
        const { param } = this.props;
        let className = "fc-button";
        param.style = param.style || 'content';
        switch(param.style) {
            case 'border':
                className += ' fc-button-border-style';
                break;
            case 'content':
                className += ' fc-button-content-style';
                break;
        }
        return (
            <div className={className}>
                <div ref="button" className="fc-button-tap"></div>
                {param.text}
            </div>
        );
    }

}

export default Button;