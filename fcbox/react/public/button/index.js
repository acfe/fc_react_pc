import './index.less';

import React, {Component} from 'react';

class Button extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    componentDidMount() {
        if(this.refs.button) {
            this.refs.button.addEventListener('mousedown', (e) => {
                this.tap(e);
            });
        }
    }

    tap(e) {
        console.log(e.layerX);
    }

    render() {
        const { param } = this.props;
        let className = "fc-button";
        let tapClassName = 'fc-button-tap';
        param.style = param.style || 'default';
        switch(param.style) {
            case 'default':
                className += ' fc-button-default-style';
                break;
            case 'border':
                className += ' fc-button-border-style';
                break;
        }
        /*themeInit*/
        let themeClassNames = {
            blue: {
                text: {
                    className: 'fc-button-text-blue',
                    tapClassName: 'fc-button-tap-text-blue'
                },
                border: {
                    className: 'fc-button-border-blue',
                    tapClassName: 'fc-button-tap-border-blue'
                },
                default: {
                    className: 'fc-button-default-blue',
                    tapClassName: 'fc-button-tap-default-blue'
                }
            },
            green: {
                text: {
                    className: 'fc-button-text-green',
                    tapClassName: 'fc-button-tap-text-green'
                },
                border: {
                    className: 'fc-button-border-green',
                    tapClassName: 'fc-button-tap-border-green'
                },
                default: {
                    className: 'fc-button-default-green',
                    tapClassName: 'fc-button-tap-default-green'
                }
            }
        };
        if(themeClassNames[param.theme] && themeClassNames[param.theme][param.style]) {
            let themeClass = themeClassNames[param.theme][param.style];
            if(themeClass.className) {
                className += ' ' + themeClass.className;
            }
            if(themeClass.tapClassName) {
                tapClassName += ' ' + themeClass.tapClassName;
            }
        }
        /*tapInit*/
        let buttonTap;
        if(!param.disabled) {
            buttonTap = <div ref="button" className={tapClassName}></div>;
        } else {
            className += ' fc-button-disabled';
        }
        return (
            <div className={className}>
                {buttonTap}
                <div className="fc-button-text">{param.text}</div>
            </div>
        );
    }

}

export default Button;