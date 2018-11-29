# Galactrum URIs
Represents a Galactrum payment URI. Galactrum URI strings is a good standard to share payment request, sometimes as a Galactrum link or using a QR code.

URI Examples:

```
galactrum:GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW
galactrum:GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW?amount=1.2
galactrum:GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW?amount=1.2&message=Payment&label=Satoshi&extra=other-param
```

## URI Validation
The main use that we expect you'll have for the `URI` class in Orecore is validating and parsing Galactrum URIs. A `URI` instance exposes the address as a Orecore `Address` object and the amount in satoshis, if present.

The code for validating URIs looks like this:

```javascript
var uriString = 'galactrum:GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW?amount=1.2';
var valid = URI.isValid(uriString);
var uri = new URI(uriString);
console.log(uri.address.network, uri.amount); // 'livenet', 120000000
```

## URI Parameters
All standard parameters can be found as members of the `URI` instance. However a Galactrum URI may contain other non-standard parameters, all those can be found under the `extra` namespace.

See [the official BIP21 spec](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) for more information.

## Create URI
Another important use case for the `URI` class is creating a Galactrum URI for sharing a payment request. That can be accomplished by using a dictionary to create an instance of URI.

The code for creating an URI from an Object looks like this:

```javascript
var uri = new URI({
  address: 'GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW',
  amount : 10000,
  message: 'My payment request'
});
console.log(uri.toString()) //galactrum:GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW?amount=0.0001&message=My%20payment%20request
```

Methods `toObject`, `toJSON` and `inspect` remain available.

## fromString

```
var uri = new URI("galactrum:GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW?amount=0.0001&message=My%20payment%20request>")
```


## fromObject
```
var uri = new URI({
          address:"GWS9X5udrLGcWyq8SmJoqR7MPwiKA6jkUW",
          amount:"10000",
          message:"My payment request"
          })
```
