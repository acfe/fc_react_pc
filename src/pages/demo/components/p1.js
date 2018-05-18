import React, {Component} from 'react';

class P1 extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.a = this.props['a'];
        console.log(this.a);
    }

    render() {
        return (
            <div className="Index">
                P1{Math.random()}
            </div>
        );
    }

}

export default P1;
