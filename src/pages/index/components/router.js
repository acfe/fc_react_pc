import React, {Component} from 'react';

class Router extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            a: false
        }
    }

    componentDidMount() {
        //console.log(this.props.children[0]);
        window.onhashchange = () => {
            this.key1 = Math.random();
            this.setState({a: true});
            setTimeout(() => {
                //this.setState({a: false});
            }, 1000)
        }
    }

    render() {
        return (
            <div className="Index">
                <div ref="p1" key={this.key0}>{this.props.children[0]}</div>
                <div ref="p2" key={this.key1}>{this.props.children[1]}</div>
            </div>
        );
    }

}

export default Router;
