var Storage = (function (db) {

    /**
     * _serialize - returns a stringfied json
     * @param obj
     * @private
     */
    var _serialize = function (obj) {
        return JSON.stringify(obj);
    };

    /**
     * _parse - returns a parsed string - JSON
     * @param str
     * @private
     */
    var _parse = function (str) {
        return str;
    };

    /**
     * save 
     * @param obj
     */
    var save = function (key, value) {
        db.setItem(key, _serialize(value));
    };

    /**
     * get - This will get the saved value from a dbKey
     * @param dbKey
     */
    var get = function (key, defaultVal) {
        var value = db.getItem(key);
        if (value == null)
        {
            return defaultVal;
        }
        var info =  _parse(value);
        return info;
    };

    /**
     * clear - This will clear the data on localStorage
     * @returns {boolean}
     */
    var clear = function (key) {
        db.removeItem(key);
    };

    return {
        clear: clear,
        save : save,
        get : get
    };

})(localStorage);

