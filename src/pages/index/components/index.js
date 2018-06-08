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
        return (
            <div className="index">
                {/*<div onClick={() => {fc.Toast.show({text: 'i am a toast'})}}>toast</div>*/}
                <div className="button-bk">
                    <Button param={{text: '文本', style: 'text'}}/>
                </div>
                <div className="button-bk">
                    <Button param={{text: '边框', style: 'border'}}/>
                </div>
                <div className="button-bk">
                    <Button param={{text: '默认'}}/>
                </div>
            </div>
        );
    }

}

export default Index;
