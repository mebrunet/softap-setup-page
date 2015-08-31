/*

IMPORTANT file must NOT contain any double quotes (').

*/

// Globals ---------------------------------------------------------------------

var base_url = 'http://192.168.0.1/';
var network_list;
var public_key;
var rsa = new RSAKey(); // requires rsa-utils/

// Common DOM elements
var scanButton = document.getElementById('scan-button');
var connectButton = document.getElementById('connect-button');
var copyButton = document.getElementById('copy-button');
var showButton = document.getElementById('show-button');
var deviceID = document.getElementById('device-id');
var connectForm = document.getElementById('connect-form');


// Function ordered by typical user flow ---------------------------------------

var public_key_callback = {
  success: function(resp){
    console.log('Public key: ' + resp['b']);
    public_key = resp['b'];
    // Pull N and E out of device key and use to set public key
    rsa.setPublic(public_key.substring(58,58+256), public_key.substring(318,318+6));
  },
  error: function(error, resp){
    console.log(error);
    window.alert('There was a problem fetching important information from your device. Please verify your connection, then reload this page.');
  }
};

var device_id_callback = {
  success: function(resp){
    var id = resp['id'];
    deviceID.value = id;
  },
  error: function(error, resp){
    console.log(error);
    var msg = 'COMMUNICATION_ERROR';
    deviceID.value = msg;
    
  }
};

var scan = function(){
  console.log('Scanning...!');
  disableButtons();
  scanButton.innerHTML = 'Scanning...';
  connectButton.innerHTML = 'Connect';

  document.getElementById('connect-div').style.display = 'none';
  document.getElementById('networks-div').style.display = 'none';
  
  getRequest(base_url+'scan-ap', scan_callback);

};

var scan_callback = {
  success: function(resp){
    network_list = resp['scans'];
    console.log('I found:');
    var networks_div = document.getElementById('networks-div');
    networks_div.innerHTML = ''; //start by clearing html
    
    if(network_list.length > 0){
      for(var i=0; i < network_list.length; i++){
        ssid = network_list[i]['ssid'];
        console.log(network_list[i]);
        add_wifi_option(networks_div, ssid);
        // Show password and connect
        document.getElementById('connect-div').style.display = 'block';
      }
    } else {
      networks_div.innerHTML = '<p class=\'scanning-error\'>No networks found.</p>';
    }
  },

  error: function(error){
    console.log('Scanning error:' + error);
    document.getElementById('networks-div').innerHTML = '<p class=\'scanning-error\'>Scanning error.</p>';
  },

  regardless: function(){
    scanButton.innerHTML = 'Re-Scan';
    enableButtons();
    document.getElementById('networks-div').style.display = 'block';
  }
};

var configure = function(evt){
  evt.preventDefault();
  // get user input
  var network = get_selected_network();
  var password = document.getElementById('password').value;
  // simple validation
  if(!network){
    window.alert('Please select a network!');
    return false;
  }
  // prep payload
  var jsonData = {
    idx:0,
    ssid: network.ssid,
    sec: network.sec,
    ch: network.ch
  }; 
  if(network.sec != 0){
	  jsonData.pwd = rsa.encrypt(password);
  }
  // send
  connectButton.innerHTML = 'Sending credentials...';
  disableButtons();
  console.log('Sending credentials: ' + JSON.stringify(jsonData));
  postRequest(base_url+'configure-ap', jsonData, configure_callback);
};

var configure_callback = {
  success: function(resp){
    console.log('Credentials received.');
    //Now connect to the WiFi
    connectButton.innerHTML = 'Credentials received...';
    postRequest(base_url+'connect-ap', {idx:0}, connect_callback);
  },
  error: function(error, resp){
    console.log('Configure error: ' + error);
    window.alert('The configuration command failed, check that you are still well connected to the device\'s WiFi hotspot and retry.');
    connectButton.innerHTML = 'Retry';
    enableButtons();
  }
};

var connect_callback = {
  success: function(resp){
    console.log('Attempting to connect to the cloud.');
    //Now connect to the WiFi
    connectButton.innerHTML = 'Attempting to connect...';
    window.alert('Your device should now start flashing green and attempt to connect to the cloud. This usually takes about 20 seconds, after which it will begin slowly blinking cyan. \n\n\nIf this process fails because you entered the wrong password, the device will flash green indefinitely. In this case, hold the setup button for 6 seconds until the device starts blinking blue again. Then reconnect to the WiFi hotspot it generates and reload this page to try again.');
  },
  error: function(error, resp){
    console.log('Connect error: ' + error);
    window.alert('The connect command failed, check that you are still well connected to the device\'s WiFi hotspot and retry.');
    connectButton.innerHTML = 'Retry';
    enableButtons();
  }

}

// Helper methods --------------------------------------------------------------

var disableButtons = function (){
  connectButton.disabled = true;
  scanButton.disabled = true;
};

var enableButtons = function (){
  connectButton.disabled = false;
  scanButton.disabled = false;
};

var add_wifi_option = function(parent, ssid){
  var radio = document.createElement('INPUT');
  radio.type = 'radio';
  radio.value = ssid;
  radio.id = ssid;
  radio.name = 'ssid';
  radio.className = 'radio' ;
  var div = document.createElement('DIV');
  div.className = 'radio-div';
  div.appendChild(radio);
  var label = document.createElement('label');
  label.htmlFor = ssid;
  label.innerHTML = ssid;
  div.appendChild(label);
  parent.appendChild(div);
};

var get_selected_network = function(){
  // network_list is global
  for(var i=0; i < network_list.length; i++){
    ssid = network_list[i]['ssid'];
    if(document.getElementById(ssid).checked){
      return network_list[i];
    }
  }
};

var copy = function() {
  window.prompt('Copy to clipboard: Ctrl + C, Enter', deviceID.value);
};

var toggleShow = function(){
  var passwordInput = document.getElementById('password');
  inputType = passwordInput.type;
  
  if(inputType === 'password'){
    showButton.innerHTML = 'Hide';
    passwordInput.type = 'text';
  } else {
    showButton.innerHTML = 'Show';
    passwordInput.type = 'password';
  }
};

var getRequest = function(url, callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url, true); //true specifies async
  xmlhttp.timeout = 8000; // Long timeout needed for scan-ap
  xmlhttp.send();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4){
      if(callback){
        if(xmlhttp.status==200){
          //Response okay
          if(callback.success){
            callback.success(JSON.parse(xmlhttp.responseText));
          }
        } else {
          //Error
          if(callback.error){
            callback.error(xmlhttp.status, xmlhttp.responseText);
          }
        }
        if (callback.regardless){
          //executed regardless
          callback.regardless();
        }
      }
    }
  };
};

var postRequest = function(url, jsonData, callback){
  var dataString = JSON.stringify(jsonData);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', url, true); //true specifies async
  xmlhttp.timeout = 4000;
  xmlhttp.setRequestHeader('Content-Type', 'multipart/form-data');
  //console.log('POST: ' + dataString);
  xmlhttp.send(dataString);

  // Handle response
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4){
      if(callback){
        if(xmlhttp.status==200){
          //Response okay
          if(callback.success){
            callback.success(JSON.parse(xmlhttp.responseText));
          }
        } else {
          //Error
          if(callback.error){
            callback.error(xmlhttp.status, xmlhttp.responseText);
          }
        }
        //executed regardless
        if (callback.regardless){
          callback.regardless();
        }
      }
    }
  };
};

// Executed immediately on load -----------------------------------------------

// Attach events
if (scanButton.addEventListener) {  // For all major browsers
    copyButton.addEventListener('click', copy);
    showButton.addEventListener('click', toggleShow);
    scanButton.addEventListener('click', scan);
    connectForm.addEventListener('submit', configure);
} else if (scanButton.attachEvent) { // For IE 8 and earlier
    copyButton.attachEvent('onclick', copy);
    showButton.attachEvent('onclick', toggleShow);
    scanButton.attachEvent('onclick', scan);
    connectForm.attachEvent('onsubmit', configure);
}

// Get important device information
getRequest(base_url+'device-id', device_id_callback);
getRequest(base_url+'public-key', public_key_callback);
