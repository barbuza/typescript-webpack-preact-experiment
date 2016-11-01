import * as classnames from 'classnames';

export default () => (
  <div class={styles.cssloadLoader}>
    <div class={classnames(styles.cssloadInner, styles.cssloadOne)}></div>
    <div class={classnames(styles.cssloadInner, styles.cssloadTwo)}></div>
    <div class={classnames(styles.cssloadInner, styles.cssloadThree)}></div>
  </div>
);
