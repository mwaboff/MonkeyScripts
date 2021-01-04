import Cookie from 'universal-cookie';

const COOKIE_HANDLER = new Cookie("MonkeyScripts");


class CookieInterface {

  /**
   * Retrieve a cookie stored value associated with provided key
   * @param {string} key 
   * @return {string}
   */
  static get(key) {
    return COOKIE_HANDLER.get(key);
  }

  /**
   * Set cookie values, including any options about what level the cookie is set for (default: /) and if we are strictly following sameSite (default: strict)
   * @param {string} key 
   * @param {string} value 
   * @param {Object} options 
   */
  static set(key, value, options={path:"/", sameSite:"strict"}) {
    COOKIE_HANDLER.set(key, value, options);
  }

  /**
   * Remove a key value. Requires knowing the exact options used during the initial cookie value creation.
   * @param {string} key 
   * @param {Object} options 
   */
  static remove(key, options={path:"/", sameSite:"strict"}) {
    COOKIE_HANDLER.remove(key, options);
  }
}

export default CookieInterface;