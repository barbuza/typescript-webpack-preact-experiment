import * as Routes from '!routes!./routes.json';
import Header from './Header';

export default function Root() {
  return (
    <main>
      <Header />
      <Routes />
    </main>
  );
}
