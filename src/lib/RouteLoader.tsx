import { Component, ComponentConstructor } from 'preact';
import { omit, devDelay } from './utils';
import PagePreloader from '../PagePreloader';

type Page = ComponentConstructor<{}, {}>;

interface IRouteLoaderProps {
  path: string;
  getClass: (resolve: (page: Page) => void) => void;
}

export default class RouteLoader extends Component<IRouteLoaderProps, {}> {

  protected unmount = false;

  static pageCache: { [path: string]: Page } = {};
  static pagePromises: { [path: string]: Promise<Page> } = {};

  protected loadPageClass() {
    const path = this.props.path;
    const getClass = this.props.getClass;

    if (RouteLoader.pageCache[path]) {
      return;
    }

    if (!RouteLoader.pagePromises[path]) {
      const promise: Promise<Page> = new Promise(resolve => getClass(resolve));
      RouteLoader.pagePromises[path] = devDelay().then(() => promise).then(cls => {
        RouteLoader.pageCache[path] = cls;
        return cls;
      });
    }

    RouteLoader.pagePromises[path].then(() => {
      if (path === this.props.path && !this.unmount) {
        this.setState({});
      }
    });
  }

  componentDidMount() {
    this.loadPageClass();
  }

  componentDidUpdate() {
    this.loadPageClass();
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  renderContent() {
    const cls = RouteLoader.pageCache[this.props.path];
    if (cls) {
      return preact.h(cls, omit(this.props, 'path', 'getClass'));
    }
    return <PagePreloader />;
  }

  render() {
    return (
      <section>
        {this.renderContent()}
      </section>
    );
  }

}
