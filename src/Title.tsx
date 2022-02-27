// Just an example of an unconnected component
type TComponentProps = {
  title: string;
};

function Title({ title }: TComponentProps) {
  return <h1>{title}</h1>;
}

export default Title;
