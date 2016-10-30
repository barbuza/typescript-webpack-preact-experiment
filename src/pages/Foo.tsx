import Component from '../components/Component';

export interface Args {

}

export interface Data {

}

export default class Foo extends Component<Args & Data, {}> {
  render() {
    return <div>foo</div>;
  }
}

export function fetchData(_: Args, resolve: (data: Data) => void) {
  resolve({});
}
