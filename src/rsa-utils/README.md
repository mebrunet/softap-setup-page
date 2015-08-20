# Simple RSA Encryption Util

## What is this?

This is a compilation of Tom Wu's rsa JS libraries. It contains the bare minimum to encrypt a message with a public key via RSA in browser.

For more information visit Tom Wu's [rsa page](http://www-cs-students.stanford.edu/~tjw/jsbn/).

Specifically, the files used are:

- jsbn.js
- rng.js
- prng4.js
- rsa.js

It exposes the RSAKey object. 

## Sample use:

	var rsa = new RSAKey();
	var N = "HEX_ENCODED_PUBLIC_MODULUS";
	var E = "HEX_ENCODED_PUBLIC_EXPONENT"; // probably "010001"
	rsa.setPublic(N,E);
	var encrypted = rsa.encrypt("My message to encrypt!")
	
For more information on how to retrive N and E from a DER or PEM key file consult [this post](http://stackoverflow.com/questions/1193529/how-to-store-retreieve-rsa-public-private-key).

Assembled by Marc-Etienne Brunet in August 2015.
