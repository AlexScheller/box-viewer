import { ActionType, connect, TAppState, TDispatch } from "./Store";
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

// TODO: State slices
function mapStateToProps(state: TAppState): TStateProps {
  // TODO: Selectors
  console.log("State has changed!");
  const name = state.name;
  const count = state.count;
  return {
    name,
    count,
  };
}

function mapDispatchToProps(dispatch: TDispatch): TDispatchProps {
  return {
    incrementCount: () => dispatch({ kind: ActionType.increment }),
    decrementCount: () => dispatch({ kind: ActionType.decrement }),
  };
}

// Find a way to make this not so verbose...
const ConnectedStateDisplayer = connect<
  TExternalProps,
  TStateProps,
  TDispatchProps
>(
  mapStateToProps,
  mapDispatchToProps
)(StateDisplayer);

// function ConnectedStateDisplayer({ ...externalProps }: TExternalProps) {
//   // TODO: hide this behind "connect"
//   const { getState, dispatch } = useContext(AppContext);
//   const stateProps = mapStateToProps(getState());
//   const stateUpdateProps = mapDispatchToProps(dispatch);
//   const props: TComponentProps = {
//     ...stateProps,
//     ...stateUpdateProps,
//     ...externalProps,
//   };
//   console.log("rerendering");
//   return <StateDisplayer {...props} />;
// }

export default ConnectedStateDisplayer;
