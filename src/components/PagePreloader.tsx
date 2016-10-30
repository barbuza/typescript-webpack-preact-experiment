import * as classnames from 'classnames';

export default () => (
  <div className={styles['cssload-loader']}>
    <div className={classnames(styles['cssload-inner'], styles['cssload-one'])}></div>
    <div className={classnames(styles['cssload-inner'], styles['cssload-two'])}></div>
    <div className={classnames(styles['cssload-inner'], styles['cssload-three'])}></div>
  </div>
);
