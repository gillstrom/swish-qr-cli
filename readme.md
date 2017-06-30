# swish-qr-cli [![Build Status](https://travis-ci.org/gillstrom/swish-qr-cli.svg?branch=master)](https://travis-ci.org/gillstrom/swish-qr-cli)

> Generate a Swish QR code


## Install

```
$ npm install --global swish-qr-cli
```


## Usage

*Run without options for an interactive interface.*

```
$ swish-qr --help

  Generate a Swish QR code

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
    $ swish-qr --number 1230000000 --amount 150 --message "Lorem ipsum" --lock amount --lock number
```


## Related

* [swish-qr](https://github.com/gillstrom/swish-qr) - API for this module.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
