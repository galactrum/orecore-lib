'use strict';

require('chai').should();
var bitcore = require('../..');
var Hash = bitcore.crypto.Hash;

describe('Hash', function() {
  var buf = new Buffer([0, 1, 2, 3, 253, 254, 255]);
  var str = 'test string';

  describe('@sha1', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha1(buf);
      hash.toString('hex').should.equal('de69b8a4a5604d0486e6420db81e39eb464a17b2');
      hash = Hash.sha1(new Buffer(0));
      hash.toString('hex').should.equal('da39a3ee5e6b4b0d3255bfef95601890afd80709');
    });

    it('throws an error when the input is not a buffer', function() {
      Hash.sha1.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha256', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha256(buf);
      hash.toString('hex').should.equal('6f2c7b22fd1626998287b3636089087961091de80311b9279c4033ec678a83e8');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha256.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha256hmac', function() {

    it('computes this known big key correctly', function() {
      var key = new Buffer('b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad' +
        'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad' +
        'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad' +
        'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad');
      var data = new Buffer('');
      Hash.sha256hmac(data, key).toString('hex')
        .should.equal('fb1f87218671f1c0c4593a88498e02b6dfe8afd814c1729e89a1f1f6600faa23');
    });

    it('computes this known empty test vector correctly', function() {
      var key = new Buffer('');
      var data = new Buffer('');
      Hash.sha256hmac(data, key).toString('hex')
        .should.equal('b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad');
    });

    it('computes this known non-empty test vector correctly', function() {
      var key = new Buffer('key');
      var data = new Buffer('The quick brown fox jumps over the lazy dog');
      Hash.sha256hmac(data, key).toString('hex')
        .should.equal('f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8');
    });

  });

  describe('#sha256sha256', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha256sha256(buf);
      hash.toString('hex').should.equal('be586c8b20dee549bdd66018c7a79e2b67bb88b7c7d428fa4c970976d2bec5ba');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha256sha256.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha256ripemd160', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha256ripemd160(buf);
      hash.toString('hex').should.equal('7322e2bd8535e476c092934e16a6169ca9b707ec');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha256ripemd160.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#ripemd160', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.ripemd160(buf);
      hash.toString('hex').should.equal('fa0f4565ff776fee0034c713cbf48b5ec06b7f5c');
    });

    it('fails when the input is not a buffer', function() {
      Hash.ripemd160.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha512', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha512(buf);
      hash.toString('hex')
        .should.equal('c0530aa32048f4904ae162bc14b9eb535eab6c465e960130005fedd' +
          'b71613e7d62aea75f7d3333ba06e805fc8e45681454524e3f8050969fe5a5f7f2392e31d0');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha512.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha512hmac', function() {

    it('calculates this known empty test vector correctly', function() {
      var hex = 'b936cee86c9f87aa5d3c6f2e84cb5a4239a5fe50480a6ec66b70ab5b1f4a' +
        'c6730c6c515421b327ec1d69402e53dfb49ad7381eb067b338fd7b0cb22247225d47';
      Hash.sha512hmac(new Buffer([]), new Buffer([])).toString('hex').should.equal(hex);
    });

    it('calculates this known non-empty test vector correctly', function() {
      var hex = 'c40bd7c15aa493b309c940e08a73ffbd28b2e4cb729eb94480d727e4df577' +
        'b13cc403a78e6150d83595f3b17c4cc331f12ca5952691de3735a63c1d4c69a2bac';
      var data = new Buffer('test1');
      var key = new Buffer('test2');
      Hash.sha512hmac(data, key).toString('hex').should.equal(hex);
    });

  });

  describe('#lyra2rev2', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.lyra2rev2(buf);
      hash.toString('hex')
        .should.equal('91d33ad4bce21b02893dd72a7f35e80433826c0dac13c0b07f72c521bff27c5f');
    });

    it('calculates the hash of the Galactrum genesis block correctly', function() {
      var genesishex = '01000000000000000000000000000000000000000000000000000000000000000000000028eb69aa985ba7c78b9ba4330aa6be8b86cbe692ec766bf6f7a9f3d09e750e6d834b2f5af0ff0f1e304720020101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4f04ffff001d010447746865677561726469616e2031332f4f63742f3230313720426974636f696e20707269636520736f6172732061626f75742024352c30303020746f207265636f72642068696768ffffffff0100ca9a3b000000003432049fad2642410713ee18830254864c23793fa9dfe708985b8aa779edb03f6ca8003dc96d0d60f874161333756d8bb529a20eac00000000';
      var buffer = new Buffer(genesishex, 'hex');
      var hash = Hash.lyra2rev2(buffer);
      hash.toString('hex')
        .should.equal('ae800e3786f59632e2b62402f37a778bf0c75238874f397846a023a92d080000'); // little endian
    });

    it('fails when the input is not a buffer', function() {
      Hash.lyra2rev2.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

});
