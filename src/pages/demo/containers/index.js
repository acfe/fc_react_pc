import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// actions
import * as commonActions from 'src/common/redux/actions';
import * as actions from '../actions';
// components
import Index from '../components';

const mapStateToProps = (state) => {
	state.Index = state.Index || {};
	return {
		state
	}
};

const mapDispatchToProps = (dispatch) => {
    return Object.assign(
        bindActionCreators(commonActions, dispatch),
        bindActionCreators(actions, dispatch)
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
