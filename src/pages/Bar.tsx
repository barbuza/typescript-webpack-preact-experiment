import Component from '../lib/Component';

export default class Bar extends Component<{ id: string }, {}> {
  render() {
    return <div>bar, id = {this.props.id}</div>;
  }
}
