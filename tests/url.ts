import AsyncValidator from '../src';

const validator = new AsyncValidator({
  v: {
    type: 'url',
  },
});

for (var i = 1; i <= 1000; i++) {
  var time = Date.now();
  var attack_str = '//a.b' + 'c1'.repeat(i) + 'a';
  validator.validate({
    v: attack_str,
  });
  var time_cost = Date.now() - time;
  console.log(
    'attack_str.length: ' + attack_str.length + ': ' + time_cost + ' ms',
  );
}

if (false) {
  console.log('*'.repeat(10));

  for (var i = 1; i <= 50000; i++) {
    var time = Date.now();
    var attack_str = '//' + ':'.repeat(i * 10000) + '@';
    validator.validate({
      v: attack_str,
    });
    var time_cost = Date.now() - time;
    console.log(
      'attack_str.length: ' + attack_str.length + ': ' + time_cost + ' ms',
    );
  }
}
