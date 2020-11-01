import Cookie from 'universal-cookie';

const COOKIE_HANDLER = new Cookie();


class CookieInterface {

  get(key) {
    return COOKIE_HANDLER.get(key);
  }

  set(key, value, options={}) {
    COOKIE_HANDLER.set(key, value, options);
  }

  remove(key) {
    COOKIE_HANDLER.remove(key);
  }
}

export default CookieInterface;