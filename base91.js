(function( w ) {
  'use strict';

  var set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';

  function E (data) {
    if (!data) return (false);

    var len = data.length,
        ret = '';

    var n = 0, b = 0;

    for (var i = 0; i < len; ++i) {
      b |= data.charCodeAt (i) << n;
      n += 8;

      if (n > 13) {
        let v = b & 8191;
        if (v > 88) {
          b >>= 13;
          n -= 13;
        } else {
          v = b & 16383;
          b >>= 14;
          n -= 14;
        }

        ret += set[ v % 91 ] + set[ v / 91 | 0 ];
      }
    }

    if (n) {
      ret += set[ b % 91 ];
      if (n > 7 || b > 90) ret += set[ b / 91 | 0 ];
    }

    return (ret);
  };

  function D (data) {
    if (!data) return (false);

    var len = data.length,
        ret = '';

    var b = 0, n = 0, v = -1;

    for (var i = 0; i < len; ++i) {
      var p = set.indexOf (data[i]);

      if (p === -1) continue;

      if (v < 0) v = p;
      else
      {
        v += p * 91;
        b |= v << n;
        n += (v & 8191) > 88 ? 13 : 14;
        do {
          ret += String.fromCharCode (b & 0xff);
          b >>= 8;
          n -= 8;
        } while (n > 7);
        v = -1;
      }
    }
    
    return (ret);
  };

  w.base91 = {
    encode: E,
    decode: D
  };

  if (Object.freeze) Object.freeze (w.base91);

})( window ); // <-- your object here
