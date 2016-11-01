import { observable, IObservableObject } from 'mobx';
import { connect } from 'mobx-preact-alt';
import { Component } from '../../components/Component';
import { onChange } from '../../utils';

export interface IData {

}

interface IInputProps {
  form: {
    num: string;
    month: string;
    year: string;
    cvv: string;
  } & IObservableObject;
  field: 'num' | 'year' | 'month' | 'cvv';
  format?: (val: string) => string;
  placeholder: string;
}

@connect
class Field extends Component<IInputProps, {}> {

  public render() {
    return (
      <div class={styles.field}>
        <input
          class={styles.input}
          placeholder={this.props.placeholder}
          value={this.props.form[this.props.field]}
          {...onChange(val => this.props.form[this.props.field] = val, this.props.format, () => this.forceUpdate()) }
          />
      </div>
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
  return (val: string) => {
    return val.replace(/[^\d]/g, '').substring(0, length);
  };
}

export class Page extends Component<IData, {}> {

  protected form = observable({
    num: '',
    month: '',
    year: '',
    cvv: '',
  });

  public render() {
    return (
      <div class={styles.root}>
        form example
        <div class={styles.form}>
          <div class={styles.row}>
            <Field placeholder="CARD NUMBER" form={this.form} field="num" format={cardNumber} />
          </div>
          <div class={styles.row}>
            <Field placeholder="MM" form={this.form} field="month" format={digits(2)} />
            <Field placeholder="YY" form={this.form} field="year" format={digits(2)} />
            <Field placeholder="CVV" form={this.form} field="cvv" format={digits(3)} />
          </div>
        </div>
      </div>
    );
  }
}

export function fetchData(resolve: (data: IData) => void) {
  resolve({});
}
