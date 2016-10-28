declare module 'mobx-preact' {

    import { Component } from 'preact';

    export class Provider extends Component<any, {}> {

        render(): JSX.Element;

    }

    export function connect<T>(cls: T): T;

}
