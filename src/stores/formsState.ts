import { observable, asMap/* , computed, reaction, action, toJS */ } from 'mobx';

export class FormsState {
  @observable public saving = asMap({} as { [key: string]: boolean });
}
