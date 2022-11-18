import { FC } from 'react';

import './loader-style.scss';

const Loader: FC = () => <div className="loader">
  <div className="loader-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>

export default Loader;