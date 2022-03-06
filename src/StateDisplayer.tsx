import * as selectors from "./selectors";
import { useSelector, useDispatch } from "./state/utils";
import Title from "./Title";

type TExternalProps = {
  title: string;
};

type TStateProps = {
  name: string;
  count: number;
};

type TDispatchProps = {
  incrementCount: () => void;
  decrementCount: () => void;
};

type TInternalProps = TStateProps & TDispatchProps;

type TComponentProps = TInternalProps & TExternalProps & TDispatchProps;

function StateDisplayer({
  title,
  name,
  count,
  incrementCount,
  decrementCount,
}: TComponentProps) {
  return (
    <div>
      <Title title={title} />
      <p>Name: {name}</p>
      <p>Count: {count}</p>
      <button onClick={(e) => decrementCount()}>decrease count</button>
      <button onClick={(e) => incrementCount()}>increase count</button>
    </div>
  );
}

function ConnectedStateDisplayer(props: TExternalProps) {
  const stateProps: TStateProps = {
    name: useSelector(selectors.getName),
    count: useSelector(selectors.getCount),
  };
  const dispatch = useDispatch();
  const dispatchProps: TDispatchProps = {
    incrementCount: () => dispatch({ kind: "count/increment" }),
    decrementCount: () => dispatch({ kind: "count/decrement" }),
  };

  return <StateDisplayer {...props} {...stateProps} {...dispatchProps} />;
}

export default ConnectedStateDisplayer;
