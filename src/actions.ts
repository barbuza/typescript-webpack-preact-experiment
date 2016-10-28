import Store from './stores';

export abstract class Action<T> {

    abstract react(store: Store): T;

}

export class LoginAction extends Action<void> {

    protected name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    react(store: Store) {
        store.auth.user = { name: this.name };
    }

}

export class LogoutAction extends Action<void> {

    react(store: Store) {
        store.auth.user = null;
    }

}

export class RoutingAction extends Action<void> {

    protected path: string;

    constructor(path: string) {
        super();
        this.path = path;
    }

    react(store: Store) {
        store.routing.path = this.path;
    }

}
