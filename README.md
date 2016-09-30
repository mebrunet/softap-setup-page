# Tools to build a SoftAP Setup page for the Photon

## Updates

- 2016/09/30 - I've found some time to bring this project up to date with the new method for implementing SoftAP on the Photon. See the [demo](http://mebrunet.github.io/softap-setup-page/src). More updates comming soon!

## Description

This repository gives you the tools to *build* a SoftAP page for the Photon (i.e. a page served by the Photon capable of connecting it to the WiFi). It shares the build tools I put together, in hopes that others will improve what I've done. Which shouldn't be hard... they are very simple.

The basic idea is to edit the style and wording of the html / js, then either: 

 - Serve the SoftAP pages from static file server you control.

AND/OR

 - Use the included compression tools to minimize the files into something you can embed into the Photon's firmware so it can be served by the device itself when in Listening Mode.

## What's in the box

1) The browser friendly RSA tools you need to encrypt your WiFi password. (Thank you [Tom Wu](http://www-cs-students.stanford.edu/~tjw/jsbn/) !)
2) A basic html and javascript file that takes the user through the connection process. (And has slightly different instructions when serving externally vs. from the Photon.)
3) A simple python script to serve these files locally as you make changes. 
4) A compression tool that takes your source code and turns it into a bunch of C++ character arrays for easy injection into the firmware.


## Usage

### Getting Started
You'll need:

- Python 2.7, pip, and virtualenv. 
- A modern browser (I'm on chrome v53),
- A Photon running firmaware 0.5.0 or above.
- You should probably also read the [SoftAP section](https://docs.particle.io/reference/firmware/photon/#softap-http-pages) of Particle's firmware reference.

Then install everything on your machine with:

	git clone https://github.com/mebrunet/softap-setup-page
	cd softap-setup-page
	pip install -r requirements.txt
	source venv/bin/activate # Use 'deactivate' to undo this when you're done

### Serving SoftAP pages externally (eg. from an amazon S3 bucket)
The idea here is to:
1) Point your client to a web url where your SoftAP setup page is hosted.
2) Let their browser download everything (scripts... etc.)
3) Have them follow the instructions on that page (temporarily loosing internet connection in order to connect to the Photon's hotspot) and pass the local WiFi credentials to the Photon so it can get online.  

Running:

	python server.py

Will serve the contents of the `src` folder at [http://localhost:8000](http://localhost:8000). So you can experiment with the process, edit the code/style util you're happy, then host it on your own servers somewhere.

### Serving the SoftAP pages from the Photon
Use

	python compress.py

to minify and mangle your pages into something you can embed in the firmware.

A more detailed explaination + examples coming soon!

## Notes
- If you renamed or added files you'll need to change the configuration settings. For now this is done by editing `compress.py` directly. It's pretty self explanatory, but feel free to open an issue if you have questions.
- For now you're limited to using single quotes in your source code... alternatively you can be less lazy than me and modify the compression script to escape double quotes.
- Because I convert an entire file into a single C-string (char array), there is a limit to the size of any given file (I'm not sure what it is exactly, but it's not a lot). Break bigger files down into parts like I did to `src/rsa-utils/jsbn_1.js` and `jsbn_2.js`.
- That's about it. See `examples/` for what the output should look like.

## Helpful Tricks

### Connecting to both the Internet and your Photon's SoftAP

One of the issues in playing around with the Photon in SoftAP mode is that you lose your WiFi connection. I've found two ways to avoid this.

1) Connect your machine via ethernet to you local network, and connect your WiFi to the Photon's app (just make sure your router isn't also at 192.168.0.1).

2) If you don't have an ethernet port, use an Android Phone's USB tethering instead. i.e. connect your Android phone to the local WiFi, then connect it via usb to your laptop, then in the Hotspot menu select "usb tether" and it simulates an ethernet conection with your machine over usb.

In both cases you now have access to both the Photon and the Internet.

### Postman

If you want to toy with the HTTP API from your browser, a great tool is [Postman](https://www.getpostman.com/). (Note I found POST requests required setting Content-Type headers to "multipart/form-data".)

### Credit
Again, thank you [Tom Wu](http://www-cs-students.stanford.edu/~tjw/jsbn/)! for the great RSA libraries.
Wifi Icon (favicon) courtesy of [iconarchive.com](http://www.iconarchive.com/tag/wifi)
