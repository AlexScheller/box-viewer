import { useSelector, useDispatch } from "./state/utils";
import * as nameSelectors from "./state/name/selectors";
import * as nameActions from "./state/name/action_creators";
import * as countSelectors from "./state/count/selectors";
import * as countActions from "./state/count/action_creators";
import Title from "./Title";

type TExternalProps = Readonly<{
  title: string;
}>;

type TStateProps = Readonly<{
  name: string;
  count: number;
}>;

type TDispatchProps = Readonly<{
  appendName: () => void;
  incrementCount: () => void;
  decrementCount: () => void;
}>;

type TInternalProps = TStateProps & TDispatchProps;

type TComponentProps = TInternalProps & TExternalProps & TDispatchProps;

function StateDisplayer({
  title,
  name,
  count,
  appendName,
  incrementCount,
  decrementCount,
}: TComponentProps) {
  return (
    <div>
      <Title title={title} />
      <p>Name: {name}</p>
      <button onClick={(e) => appendName()}>Append to name</button>
      <p>Count: {count}</p>
      <button onClick={(e) => decrementCount()}>Decrease count</button>
      <button onClick={(e) => incrementCount()}>Increase count</button>
    </div>
  );
}

function ConnectedStateDisplayer(props: TExternalProps) {
  // Dude what is this type inference magic...
  const stateProps: TStateProps = {
    name: useSelector(nameSelectors.getName),
    count: useSelector(countSelectors.getCount),
  };
  const dispatch = useDispatch();
  // TODO Action creators
  const dispatchProps: TDispatchProps = {
    appendName: () => dispatch(nameActions.append()),
    incrementCount: () => dispatch(countActions.increment()),
    decrementCount: () => dispatch(countActions.decrement()),
  };

  return <StateDisplayer {...props} {...stateProps} {...dispatchProps} />;
}

export default ConnectedStateDisplayer;
