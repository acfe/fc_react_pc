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
        //console.log(e.layerX);
        const { param } = this.props;
        param.callback && param.callback();
    }

    render() {
        const { param } = this.props;
        let className = "fc-button";
        let tapClassName = 'fc-button-tap';
        param.type = param.type || 'default';
        switch(param.type) {
            case 'default':
                className += ' fc-button-default-style';
                break;
            case 'border':
                className += ' fc-button-border-style';
                break;
        }
        /*themeInit*/
        let themes = [
            'blue',
            'lightBlue',
            'cyan',
            'teal',
            'green',
            'lightGreen',
            'lime',
            'red',
            'pink',
            'purple',
            'deepPurple',
            'indigo',
            'yellow',
            'amber',
            'orange',
            'deepOrange',
            'brown',
            'grey',
            'blueGrey'
        ];
        let themeClassNames = {};
        themes.map((item) => {
            themeClassNames[item] = {
                text: {
                    className: 'fc-button-text-' + item,
                    tapClassName: 'fc-button-tap-text-' + item
                },
                border: {
                    className: 'fc-button-border-' + item,
                    tapClassName: 'fc-button-tap-border-' + item
                },
                default: {
                    className: 'fc-button-default-' + item,
                    tapClassName: 'fc-button-tap-default-' + item
                }
            };
        });
        if(themeClassNames[param.theme] && themeClassNames[param.theme][param.type]) {
            let themeClass = themeClassNames[param.theme][param.type];
            if(themeClass.className) {
                className += ' ' + themeClass.className;
            }
            if(themeClass.tapClassName) {
                tapClassName += ' ' + themeClass.tapClassName;
            }
        }
        let style = param.style || {};
        let textStyle = param.textStyle || {};
        let tapStyle = param.tapStyle || {};
        /*tapInit*/
        let buttonTap;
        if(!param.disabled) {
            buttonTap = <div ref="button" className={tapClassName} style={tapStyle}></div>;
        } else {
            className += ' fc-button-disabled';
        }
        return (
            <div className={className} style={style}>
                {buttonTap}
                <div className="fc-button-text" style={textStyle}>{param.text}</div>
            </div>
        );
    }

}

export default Button;