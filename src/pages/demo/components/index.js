import React, {Component} from 'react';
import "src/pages/index/less/index.less";

class Index extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { state, page } = this.props;
        if(!state.pagesLoaded[page]) {
            state.pagesLoaded[page] = true;
            setTimeout(() => {
                if(state.router.showPage == page) {
                    this.refresh();
                }
            });
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

    refresh() {
        const { state, setData } = this.props;
        setData({
            key: 'refresh'
        });
    }

    go() {
        const { state, page } = this.props;
        this.refresh();
        state.router.push('index/p2');
    }

    render() {
        const { state, page } = this.props;
        if (!state.pagesLoaded[page]) {
            return (
                <div className="Index">
                    loading...
                </div>
            );
        }
        const dom = (
            <div>
                <div>1</div>
            </div>
        );
        const arr = [1, 2, 3];
        return (
            <div className="Index" onClick={() => this.go()}>
                Demo
            </div>
        );
    }

}

export default Index;
