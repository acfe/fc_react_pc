import { connect } from 'react-redux';
// components
import Router from './router';

const mapStateToProps = (state) => {
	return {
		state: state
	}
};

export default connect(mapStateToProps)(Router);
