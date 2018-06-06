import './index.less';

import React, {Component} from 'react';
import Animation from 'fcbox/utils/animation';

class Router extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            goType: '',
            open: false
        };
        const { state } = this.props;
        state.router = this;
        this.routeChildren = this.props.children;
    }

    componentDidMount() {
        this.parseRoute();
        window.addEventListener("orientationchange", (e) => {
            setTimeout(() => {
                this.pageInit();
            }, 100);
        }, false);
        window.onhashchange = (e) => {
            this.hashChange();
        };
    }

    shouldComponentUpdate() {
        if(!this.state.loadLocked) {
            this.state.loadLocked = true;
            return true;
        }
        return false;
    }

    hashChange(e) {
        if(window.fc.routerHashLock) {
            return false;
        }
        let hash = '';
        const hashArr = location.hash.split('/');
        if (hashArr && hashArr[2]) {
            hash = hashArr[2];
        }
        const page = hash || (this.props.defaultPage || 'index');
        const goPage = this.checkPage(page);
        this.keyArr[goPage] = Math.random();
        if (goPage == this.showPage) {
            this.pageInit();
            return;
        }
        const animate = this.props.animate == undefined ? true : this.props.animate;
        if (!animate || !this.state.goType) {
            this.showPage = goPage;
            this.pageInit();
            return;
        }
        this.goPage = goPage;
        this.setAnimatePage();
        this.state.goType = '';
    }

    setAnimatePage() {
        const { state } = this.props;
        const width = state.com.width;
        const isBack = this.state.goType != 'push';
        for (var i = 0; i < this.routeChildren.length; i++) {
            var ref = this.routeChildren[i].props['page'] || 'page' + (i + 1);
            this.refs[ref].style.zIndex = 0;
            this.refs[ref].style.left = 0;
            this.refs[ref].style.position = 'absolute';
            if (ref == this.showPage) {
                this.setTransform(this.refs[ref], '100%');
                continue;
            }
            if (ref == this.goPage) {
                this.refs[ref].style.zIndex = 1;
                const translate = isBack ? 0 : '200%';
                this.setTransform(this.refs[ref], translate);
                continue;
            }
            this.setTransform(this.refs[ref], '-100%');
        }
        this.animateAction(isBack, width);
    }

    animateAction(isBack, width) {
        this.animating = true;
        const that = this;
        new Animation().play({
            aStart: that.refs.wrapper.scrollLeft,
            aEnd: isBack ? 0 : width * 2,
            tEnd: 20,
            handle (num) {
                that.refs.wrapper.scrollLeft = num;
            },
            finish () {
                that.animating = false;
                that.showPage = that.goPage;
                that.pageInit();
            }
        });
    }

    go(path) {
        if (!this.routeChildren || !this.routeChildren.length) {
            return;
        }
        this.state.goType = '';
        location.href = '#/' + path;
    }

    push(path) {
        if (!this.routeChildren || !this.routeChildren.length) {
            return;
        }
        this.state.goType = 'push';
        location.href = '#/' + path;
    }

    back() {
        if (!this.routeChildren || !this.routeChildren.length) {
            return;
        }
        this.state.goType = 'back';
        history.go(-1);
    }

    checkPage(page) {
        var pageFirst, pageIn = 0;
        this.routeChildren.map((item, key) => {
            if (key == 0) {
                pageFirst = item.props['page'];
            }
            if (page == item.props['page']) {
                pageIn = 1;
            }
        });
        return pageIn ? page : pageFirst;
    }

    parseRoute() {
        if (!this.routeChildren || !this.routeChildren.length) {
            return;
        }
        let hash = '';
        const hashArr = location.hash.split('/');
        if (hashArr && hashArr[2]) {
            hash = hashArr[2];
        }
        var page = hash || (this.props.defaultPage || 'index');
        this.showPage = this.checkPage(page);
        this.pageInit();
    }

    pageInit() {
        if (!this.routeChildren || !this.routeChildren.length) {
            return;
        }
        this.setState({});
        const { state } = this.props;
        const width = state.com.width;
        this.refs.wrapper.scrollLeft = width;
        for (var i = 0; i < this.routeChildren.length; i++) {
            var ref = this.routeChildren[i].props['page'] || 'page' + (i + 1);
            this.refs[ref].style.left = 0;
            this.refs[ref].style.position = 'absolute';
            if (ref == this.showPage) {
                this.refs[ref].style.position = 'relative';
                this.setTransform(this.refs[ref], '100%');
                continue;
            }
            this.setTransform(this.refs[ref], '-100%');
        }
    }

    setTransform(ref, translate) {
        if(translate == 'none') {
            ref.style.transform = translate;
            ref.style.webkitTransform = translate;
        } else {
            ref.style.transform = 'translate3d(' + translate + ', 0 , 0)';
            ref.style.webkitTransform = 'translate3d(' + translate + ', 0 , 0)';
        }
    }

    showChildren() {
        if (!this.routeChildren) {
            return (
                <div className="wrapper">no page set</div>
            );
        }
        if (!this.routeChildren.length) {
            this.showPage = this.routeChildren.props['page'] || 'index';
            return (
                <div className="wrapper-page">
                    {this.routeChildren}
                </div>
            );
        }
        this.keyArr = this.keyArr || {};
        return this.routeChildren.map((item, key) => {
            const ref = item.props['page'] || 'page' + (key + 1);
            this.keyArr[ref] = this.keyArr[ref] || Math.random();
            return (
                <div ref={ref} key={this.keyArr[ref]} className="wrapper-page">
                    {item}
                </div>
            );
        });
    }

    render() {
        return (
            <div ref="wrapper" className="wrapper">
                <div className="wrapper-content">
                    {this.showChildren()}
                </div>
            </div>
        );
    }

}

export default Router;
