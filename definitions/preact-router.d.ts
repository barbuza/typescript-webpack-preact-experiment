declare module 'preact-router' {

  import { Component } from 'preact';  

  export class Router extends Component<{}, {}> {

    render(): JSX.Element;

  }

  export class Link extends Component<JSX.HTMLAttributes, {}> {

    render(): JSX.Element;

  }

}