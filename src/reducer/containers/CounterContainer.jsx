import React from 'react';
//import { useSelector, useDispatch, shallowEqual } from 'react-redux'; //connect 안썼을 때
import Counter from '../components/Counter';
import { increase, decrease, setDiff} from '../modules/counter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function CounterContainer({number, diff, increase, decrease, setDiff}){
    // connect 안썼을 때
    // const { number, diff } = useSelector( (state)=> ({
    //     number: state.counter.number,
    //     diff: state.counter.diff,
    // }), shallowEqual);

    // const dispatch = useDispatch();
    // const onIncrease = () => dispatch(increase());
    // const onDecrease = () => dispatch(decrease());
    // const onSetDiff = (diff) => dispatch(setDiff(diff));

    return (
        <Counter number={number} diff={diff}
            onIncrease={increase} onDecrease={decrease} onSetDiff={setDiff} />
    );
}

const mapStateToProps = (state) => ({
    number: state.counter.number,
    diff: state.counter.diff
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        increase,
        decrease,
        setDiff
    },
    dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterContainer);