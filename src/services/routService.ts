import type App from "../app";

export default class RoutService {


  private mode: string;

  private root: string;

  public current: string;

  private routes: ({ path: string; cb: () => void })[];

  constructor(options: { root: string }, protected app: App) {
    this.mode = 'history';
    this.root = '/';
    this.listen();
    this.current = '/'
    this.routes = [
      {
        path: 'cards', cb: () => {

        }
      },
      {
        path: 'statistic', cb: () => {
          this.app.renderStatisticField();
        }
      },
      {
        path: 'about', cb: () => {
          this.app.renderPage('home');
        }
      },
      {
        path: '', cb: () => {
          this.app.renderPage('home')
        }
      }
    ];
  }

  add = (path: string, cb: () => void): RoutService => {
    this.routes.push({path, cb});
    return this;
  };

  remove = (path: string): RoutService => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = (): RoutService => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path: string): string =>
    path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');

  getFragment = (): string => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = '') :RoutService => {
    if (this.mode === 'history') {

      window.history.pushState(null, '', this.root + this.clearSlashes(path));
    } else {
      this.current = path;
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  };

  listen = ():void => {
    clearInterval(this.interval);
    this.interval = setInterval(this.intervalFn, 50);
  };

  interval = setInterval(() => {},50);

  intervalFn = (): string | boolean | undefined => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();
    this.routes.some(route => {
      const match = <[]> this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}
