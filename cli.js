#!/usr/bin/env node
'use strict';
const inquirer = require('inquirer');
const meow = require('meow');
const qrcodeTerminal = require('qrcode-terminal');
const swishQr = require('swish-qr');
const termImg = require('term-img');

const cli = meow(`
	Usage
	  $ swish-qr [options]

	Options
	  -a, --amount <amount>    The amount of money to send
	  -i, --image              Show QR code in the terminal
	  -l, --lock <field>       Lock fields from user input
	  -m, --message <message>  The message to send
	  -n, --number <number>    The recipient

	Example
	  $ swish-qr
	  $ swish-qr --number 1230000000 --amount 150 --message "Thanks for the help" --lock amount --lock number
`, {
	alias: {
		a: 'amount',
		i: 'image',
		l: 'lock',
		m: 'message',
		n: 'number'
	},
	string: [
		'message',
		'number'
	]
});

const generateImage = res => {
	const buf = res.replace('data:image/png;base64,', '');

	termImg(Buffer.from(buf, 'base64'), {
		fallback: () => {
			qrcodeTerminal.generate(swishQr.generateString(cli.flags), {small: true});
		}
	});
};

if (Object.keys(cli.flags).length === 0) {
	inquirer.prompt([{
		name: 'number',
		message: 'What is the recipients phone number?'
	}, {
		name: 'amount',
		message: 'How much money do you want to send?'
	}, {
		name: 'message',
		message: 'Do you want to send a message?'
	}, {
		name: 'lock',
		type: 'checkbox',
		message: 'Which fields do you want to lock?',
		choices: [{
			name: 'Number',
			value: 'number'
		}, {
			name: 'Amount',
			value: 'amount'
		}, {
			name: 'Message',
			value: 'message'
		}]
	}]).then(answers => {
		swishQr(answers).then(res => {
			generateImage(res);
		});
	});
} else {
	swishQr(cli.flags).then(res => {
		if (cli.flags.image) {
			generateImage(res);
			return;
		}

		console.log(res);
	});
}
