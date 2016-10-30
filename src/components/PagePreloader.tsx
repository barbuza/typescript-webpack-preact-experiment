import * as classnames from 'classnames';

export default () => (
  <div className={styles.cssloadLoader}>
    <div className={classnames(styles.cssloadInner, styles.cssloadOne)}></div>
    <div className={classnames(styles.cssloadInner, styles.cssloadTwo)}></div>
    <div className={classnames(styles.cssloadInner, styles.cssloadThree)}></div>
  </div>
);
