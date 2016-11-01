import { observable } from 'mobx';
import { connect } from 'mobx-preact-alt';
import Component from '../../components/Component';
import { onChange } from '../../utils';
import * as classnames from 'classnames';

export interface Data {

}

interface IInputProps {
  form: {
    number: string;
    month: string;
    year: string;
    cvv: string;
  };
  field: 'number' | 'year' | 'month' | 'cvv';
  format?: (val: string) => string;
  placeholder: string;
}

@connect
class Input extends Component<IInputProps, {}> {

  render() {
    return (
      <input
        class={classnames(styles.input, styles[this.props.field])}
        placeholder={this.props.placeholder}
        value={this.props.form[this.props.field]}
        {...onChange(val => this.props.form[this.props.field] = val, this.props.format, () => this.forceUpdate()) }
      />
    );
  }

}

function cardNumber(val: string) {
  return val
    .replace(/[^\d]/g, '')
    .replace(/(\d{4}(?=\d))/g, p => `${p} `)
    .substring(0, 19);
}

function digits(length: number) {
  return function (val: string) {
    return val.replace(/[^\d]/g, '').substring(0, length);
  }
}

export default class Foo extends Component<Data, {}> {

  @observable
  protected form = {
    number: '',
    month: '',
    year: '',
    cvv: ''
  };

  render() {
    return (
      <div>
        form example
        <div class={styles.form}>
          <div class={styles.row}>
            <Input placeholder="CARD NUMBER" form={this.form} field="number" format={cardNumber}/>
          </div>
          <div class={styles.row}>
            <Input placeholder="MM" form={this.form} field="month" format={digits(2)}/>
            <Input placeholder="YY" form={this.form} field="year" format={digits(2)}/>
            <Input placeholder="CVV" form={this.form} field="cvv" format={digits(3)}/>
          </div>
        </div>
      </div>
    );
  }
}

export function fetchData(resolve: (data: Data) => void) {
  resolve({});
}
