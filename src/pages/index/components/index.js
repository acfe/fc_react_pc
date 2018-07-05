import React, {Component} from 'react';
import "src/pages/index/less/index.less";
import Button from 'fcbox/react/public/button';

class Index extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { state, page } = this.props;
        if(!state.pagesLoaded[page]) {
            this.init();
        } else {
            this.refresh();
        }
    }

    shouldComponentUpdate() {
        const { state, page } = this.props;
        if(!state.pagesLocked[page]) {
            state.pagesLocked[page] = true;
            return true;
        }
        return false;
    }

    init() {
        const { state, page } = this.props;
        state.pagesLoaded[page] = true;
        setTimeout(() => {
            if(state.router.showPage == page) {
                this.refresh();
            }
        });
    }

    refresh() {
        const { state, setData } = this.props;
        setData({
            key: 'refresh'
        });
    }

    render() {
        const { state, page } = this.props;
        if (!state.pagesLoaded[page]) {
            return (
                <div className="fc-loading"></div>
            );
        }
        let themes = [
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
        let template = (data) => {
            return <div>{data.text}</div>;
        };
        return (
            <div className="index">
                {/*<div onClick={() => {fc.Toast.show({text: 'i am a toast'})}}>toast</div>*/}
                <div>
                    <div className="button-bk">
                        <Button
                            param={
                                {
                                    text: '文本',
                                    type: 'text',
                                    callback: () => {
                                        console.log('callback')
                                    }
                                }
                            }
                        />
                    </div>
                    <div className="button-bk">
                        <Button
                            param={
                                {
                                    text: '边框',
                                    type: 'border',
                                    style: {
                                        padding: '10px'
                                    },
                                    textStyle: {
                                        fontSize: '16px',
                                        color: '#ff0000'
                                    },
                                    tapStyle: {
                                        border: '1px solid rgba(255, 224, 178, 0.3)'
                                    }
                                }
                            }
                        />
                    </div>
                    <div className="button-bk">
                        <Button param={{text: '默认', template: template}}></Button>
                    </div>
                </div>
                <div>
                    <div className="button-bk">
                        <Button param={{text: 'disabled', type: 'text', disabled: true}}/>
                    </div>
                    <div className="button-bk">
                        <Button param={{text: 'disabled', type: 'border', disabled: true}}/>
                    </div>
                    <div className="button-bk">
                        <Button param={{text: 'disabled', disabled: true}}/>
                    </div>
                </div>
                <div>
                    <div className="button-bk">
                        <Button param={{text: 'blue', type: 'text', theme: 'blue'}}/>
                    </div>
                    <div className="button-bk">
                        <Button param={{text: 'blue', type: 'border', theme: 'blue'}}/>
                    </div>
                    <div className="button-bk">
                        <Button param={{text: 'blue', theme: 'blue'}}/>
                    </div>
                </div>
                {
                    themes.map((item, key) => {
                        return (<div key={key}>
                            <div className="button-bk">
                                <Button param={{text: item, type: 'text', theme: item}}/>
                            </div>
                            <div className="button-bk">
                                <Button param={{text: item, type: 'border', theme: item}}/>
                            </div>
                            <div className="button-bk">
                                <Button param={{text: item, theme: item}}/>
                            </div>
                        </div>);
                    })
                }
            </div>
        );
    }

}

export default Index;
