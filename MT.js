
export default class MersenneTwister {
    constructor(seed) {
        'use strict';
        if (seed == null) {
            var d = new Date();
            var t = d.getTime();
            seed = t;
        }
        var mt = [seed], mtLen = 624, last32 = 18122433253 & 0xFFFFFFFF, index = 0;
        for (var i = 1; i < mtLen; i++) {
            mt[i] = last32 * ((mt[i - 1] ^ (mt[i - 1] >>> 30)) >>> 0) + 1;
        }
        this.next = function () {
            if (index === 0) {
                twist();
            }
            var y = mt[index];
            y ^= (y >>> 11);
            y ^= (y << 7) & 0x9d2c5680;
            y ^= (y << 15) & 0xefc60000;
            y ^= y >>> 18;
            y >>>= 0;
            index = (index + 1) % mtLen;
            y = y / 4294967296
            return y;
        };
        function twist() {
            var i, y;
            for (i = 0; i < mtLen; i++) {
                y = ((mt[i] & 0x80000000) + (mt[(i + 1) % mtLen] & 0x7fffffff)) >>> 0;
                mt[i] = (mt[(i + 397) % mtLen] ^ (y >>> 1)) >>> 0;
                if (y % 2 !== 0) {
                    mt[i] = (mt[i] ^ 0x9908b0df) >>> 0;
                }
            }
        }

        
    }

    
}
