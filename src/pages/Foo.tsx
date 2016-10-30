import Component from '../components/Component';

export interface Data {

}

export default class Foo extends Component<Data, {}> {
  render() {
    return <div>foo</div>;
  }
}

export function fetchData(resolve: (data: Data) => void) {
  resolve({});
}
