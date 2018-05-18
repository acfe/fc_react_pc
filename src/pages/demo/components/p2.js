import React, {Component} from 'react';
import { connect } from 'react-redux';

class P2 extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.a = this.props['a'];
        console.log(this.a);
    }

    back() {
        const { state } = this.props;
        state.router.back();
    }

    render() {
        return (
            <div className="Index" onClick={() => this.back()}>
                P2
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        state: state
    }
};

export default connect(mapStateToProps)(P2);
