import Component from '../components/Component';

export default class Foo extends Component<{}, {}> {
  render() {
    return <div>foo</div>;
  }
}

export function fetchData(_: any, callback: (data: {}) => void) {
  setTimeout(() => {
    callback({});
  }, 1000);
}
