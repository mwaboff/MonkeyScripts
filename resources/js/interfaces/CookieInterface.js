import Cookie from 'universal-cookie';

const COOKIE_HANDLER = new Cookie("MonkeyScripts");


class CookieInterface {

  static get(key) {
    return COOKIE_HANDLER.get(key);
  }

  static set(key, value, options={path:"/", sameSite:"strict"}) {
    COOKIE_HANDLER.set(key, value, options);
  }

  static remove(key, options={path:"/", sameSite:"strict"}) {
    COOKIE_HANDLER.remove(key, options);
  }
}

export default CookieInterface;