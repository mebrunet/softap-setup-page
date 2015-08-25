# Tools to build a SoftAP set page for the Photon

## Updates

- 2015/08/24 - Everything is working when built against v0.4.4 and develop. The page can now be served from the Photon and/or an external host. i.e. CORS issues have been resolved. 

- 2015/08/20 - Published first working prototype version! (yay) But it only seems to work with Photon firmware branch photon_043 right now... not sure why it won't work with develop.

## Description

**Important:** this repository gives you the tools to *build* a SoftAP page for the Photon (i.e. a page served by the Photon capable of connecting it to the WiFi). If all you want to do is flash a version of the firmware that already has a working SoftAP page included, see [this repository](https://bitbucket.org/mebrunet/photon-firmware/).


This project shares the build tools I put together in making a SoftAP page for the Photon, in hopes that others will improve what I've done. Which shouldn't be hard... I'm a rather amateur web developer.

The basic idea is to use these tools to generate the necessary firmware modifications, then insert those modifications into whatever core firmware version you're using. (Though at this point it's only been tested with photon_043)

## What's in the box

1) The browser friendly RSA tools you need to encrypt your WiFi password. (Thank you [Tom Wu](http://www-cs-students.stanford.edu/~tjw/jsbn/) !)
2) A compression tool that takes your source code and turns it into a bunch of C++ character arrays for easy injection into the firmware.
3) Information about which files you need to edit in the firmware.


## Quickstart

You'll need:

- Python 2.7 and pip, 
- A modern browser (I'm on chrome v44),
- The Photon firmware (branch photon_043) + associated build tools. (See [this repository](https://bitbucket.org/mebrunet/photon-firmware/) for help with that).
- Patience... haha, as I learnt over the last week, serving the modern web from embedded devices is an exercise in tenacity.

Start with:

	git clone https://github.com/mebrunet/softap-setup-page
	cd softap-setup-page
	pip install -r requirements.txt
	python compress.py

Then open `build/instructions.txt` and do what it says.

Flash your new version of the firmware:
	
	cd your/photon/firmware/dir
	cd modules
	sudo make PLATFORM=photon clean all program-dfu

Enjoy connecting your Photon to the WiFi without an app!

**Note:** This should be build against v0.4.4 or develop in order to work properly.

## Changing Stuff

You'll inevitably want to modify the html and javascript in `src/`, here's how.

- Run the pages "pre-compression" in your browser. e.g. Just try opening `src/index.html`. The *Helpful Tricks* section below is useful at this point. 
- Edit the files in `src/`, and when you're happy with the changes run `python compress.py`. 
- If you renamed or added files you'll need to change the configuration settings. For now this is done by editing `compress.py` directly. It's pretty self explanatory, but feel free to open an issue if you have questions.
- For now you're limited to using single quotes in your source code... alternatively you can be less lazy than me and modify the compression script to escape double quotes.
- Because I convert an entire file into a single C-string (char array), there is a limit to the size of any given file (I'm not sure what it is exactly, but it's not a lot). Break bigger files down into parts like I did to `src/rsa-utils/jsbn_1.js` and `jsbn_2.js`.
- That's about it. See `examples/` for what the files in `hal/src/photon/` should be modified to look like.


## Helpful Tricks

### Connecting to both the Internet and your Photon's SoftAP

One of the issues in playing around with the Photon in SoftAP mode is that you lose your WiFi connection. I've found two ways to avoid this.

1) Connect your machine via ethernet to you local network, and connect your WiFi to the Photon's app.

2) If you don't have an ethernet port, use an Android Phone's USB tethering instead. i.e. connect your Android phone to the local WiFi, then connect it via usb to your laptop, then in the Hotspot menu select "usb tether" and it simulates an ethernet conection with your machine over usb.

In both cases you now have access to both the Photon and the Internet.

### Postman and disabling CORS

If you want to toy with the HTTP API from your browser, a great tool is [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en). (Note I found POST requests required setting Content-Type headers to "multipart/form-data".)

However, if you want to use jQuery, you'll need to disable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), by using this [chrome extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) for example. (2015/08/24 - This is no longer the case if building against v0.4.4 or develop).

## Useful links
- [Particle's Soft AP over HTTP documentation](https://github.com/spark/firmware/blob/develop/hal/src/photon/soft-ap.md)
	