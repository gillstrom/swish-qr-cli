import test from 'ava';
import dargs from 'dargs';
import execa from 'execa';
import isPng from 'is-png';

const args = dargs({
	amount: 100,
	lock: ['amount', 'number'],
	message: 'Lorem ipsum',
	number: '0701234567'
});

test(async t => {
	const base64 = await execa.stdout('./cli.js', args);
	t.true(base64.startsWith('data:image/png;base64,iVBORw0KGgo'));
	t.true(isPng(Buffer.from(base64.replace('data:image/png;base64,', ''), 'base64')));
});
