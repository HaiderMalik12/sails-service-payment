import { assert } from 'chai';
import BasePayment from '../../src/BasePayment';

describe('BasePayment', () => {
  it('Should properly export', () => {
    assert.isFunction(BasePayment);
  });

  it('Should properly make objects configurable', () => {
    let payment = new BasePayment();

    assert.notOk(payment.get('foo'));
    assert.instanceOf(payment.set('foo', 'bar'), BasePayment);
    assert.instanceOf(payment.set('obj', {foo: 'bar'}), BasePayment);
    assert.deepEqual(payment.get('obj'), {foo: 'bar'});
    assert.equal(payment.get('obj.foo'), 'bar');
    assert.equal(payment.get('foo'), 'bar');
  });

  it('Should properly create payment with pre-defined config', () => {
    let payment = new BasePayment({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.deepEqual(payment.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.equal(payment.get('foo'), 'bar');
    assert.equal(payment.get('obj.foo'), 'bar');
    assert.deepEqual(payment.get('obj'), {foo: 'bar'});
    assert.notOk(payment.get('NOT_EXISTS'));
  });

  it('Should properly get/set provider', () => {
    let payment = new BasePayment();

    assert.instanceOf(payment.getProvider(), Object);
    assert.instanceOf(payment.setProvider('PROVIDER'), BasePayment);
    assert.equal(payment.getProvider(), 'PROVIDER');
  });
});
