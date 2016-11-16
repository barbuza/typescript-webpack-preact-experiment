import * as React from 'react';
import { observable, IObservableObject } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from '../../components/Component';

export interface IData {
  assert: boolean;
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

@observer
class Field extends Component<IInputProps, {}> {

  protected onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value;
    if (this.props.format) {
      value = this.props.format(value);
    }
    this.props.form[this.props.field] = value;
  }

  public render() {
    return (
      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder={this.props.placeholder}
          value={this.props.form[this.props.field]}
          onChange={this.onChange.bind(this)}
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

export class Foo extends Component<IData, {}> {

  protected form = observable({
    num: '',
    month: '',
    year: '',
    cvv: '',
  });

  public render() {
    if (!this.props.assert) {
      throw new Error('assert');
    }
    return (
      <div className={styles.root}>
        form example
        <div className={styles.form}>
          <div className={styles.row}>
            <Field placeholder="CARD NUMBER" form={this.form} field="num" format={cardNumber} />
          </div>
          <div className={styles.row}>
            <Field placeholder="MM" form={this.form} field="month" format={digits(2)} />
            <Field placeholder="YY" form={this.form} field="year" format={digits(2)} />
            <Field placeholder="CVV" form={this.form} field="cvv" format={digits(3)} />
          </div>
        </div>
      </div>
    );
  }
}

export async function fetchData(): Promise<IData> {
  return { assert: true };
}
