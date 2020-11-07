import Cookie from 'universal-cookie';

const COOKIE_HANDLER = new Cookie();


class CookieInterface {

  static get(key) {
    return COOKIE_HANDLER.get(key);
  }

  static set(key, value, options={}) {
    COOKIE_HANDLER.set(key, value, options);
  }

  static remove(key) {
    COOKIE_HANDLER.remove(key);
  }
}

export default CookieInterface;