/*
All this JS will be injected inplace of
<script src='script.js'></script>

IMPORTANT file must NOT contain any double quotes (').

*/

var base_url = 'http://192.168.0.1/';
var network_list;
var public_key;
var rsa = new RSAKey();

var public_key_callback = {
  success: function(resp){
    console.log('Public key: ');
    console.log(resp);
    public_key = resp['b'];
    // Pull N and E out of device key and use to set public key
    rsa.setPublic(public_key.substring(58,58+256), public_key.substring(318,318+6));
  },
  error: function(error, resp){
    console.log(error);
    window.alert('Error fetching important information from your device,'
      +' please check connection and refresh this page.');
  }
};

var device_id_callback = {
  success: function(resp){
    var id = resp['id'];
    document.getElementById('device-id').innerHTML = id;
  },
  error: function(error, resp){
    console.log(error);
    var msg = 'sorry... there was a problem, please '
      +'verify your connection to the device and reload this page.';
    document.getElementById('device-id').innerHTML = msg;
    
  }
};

var add_wifi_option = function(parent, ssid){
  var radio = document.createElement('INPUT');
  radio.type = 'radio';
  radio.value = ssid;
  radio.id = ssid;
  parent.appendChild(document.createElement('BR'));
  parent.appendChild(radio);
  var label = document.createElement('SPAN');
  label.className = 'ssid-label';
  label.innerHTML = ssid;
  parent.appendChild(label);
}

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
      networks_div.innerHTML = '<p>No networks found.</p>'; //start by clearing html
    }
  },

  error: function(error){
    console.log('Scanning error:');
    console.log(error);
  },

  regardless: function(){
    document.getElementById('scan-button').innerHTML = 'Re-Scan';
    document.getElementById('scan-button').disabled = false;
  }
};

var scan = function(){
  console.log('Scanning...!');
  document.getElementById('scan-button').innerHTML = 'Scanning...';
  document.getElementById('scan-button').disabled = true;
  document.getElementById('connect-div').style.display = 'none';
  
  getRequest(base_url+'scan-ap', scan_callback);

};

var connect_callback = {
  success: function(resp){
    console.log('Credential accepted');
    //Now connect to the WiFi
    //postRequest(base_url+'connect-ap', {idx:0});
    getRequest(base_url+'connect'); // strangely this works more consistently...
    document.getElementById('connect-button').innerHTML = 'Connecting to cloud...';
    window.alert('Your device will now attempt to connect to the cloud.')
  },
  error: function(error, resp){
    console.log('Credential error:');
    console.log(error);
    document.getElementById('connect-button').innerHTML = 'Retry';
    document.getElementById('connect-button').disabled = false;
    document.getElementById('scan-button').disabled = false;
  }
}

var get_selected_network = function(){
  for(var i=0; i < network_list.length; i++){
    ssid = network_list[i]['ssid'];
    if(document.getElementById(ssid).checked){
      return network_list[i];
    }
  }
}

var connect = function(){
  
  //Form validation here
  var network = get_selected_network();
  if(!network){
    window.alert('Please select a network!');
    return;
  }
  
  console.log('Sending credentials...');
  document.getElementById('connect-button').innerHTML = 'Sending credentials...';
  document.getElementById('connect-button').disabled = true;
  document.getElementById('scan-button').disabled = true;
  
  var password = document.getElementById('password').value;

  var jsonData = {
    idx:0,
    ssid: network.ssid,
    pwd: rsa.encrypt(password),
    sec: network.sec,
    ch: network.ch

  }

  postRequest(base_url+'configure-ap', jsonData, connect_callback);
}


// Light AJAX helper methods----------------

var getRequest = function(url, callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url, true); //true specifies async
  xmlhttp.send();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4){
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

var postRequest = function(url, jsonData, callback){
  var dataString = JSON.stringify(jsonData);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', url, true); //true specifies async
  xmlhttp.setRequestHeader('Content-Type', 'text');
  xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
  console.log('POST: ' + dataString);
  xmlhttp.send(dataString);

  // Handle response
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4){
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

// Executed immediately on load

// Attach scan and connect
var scanButton = document.getElementById('scan-button');
var connectButton = document.getElementById('connect-button');
if (scanButton.addEventListener) {                    // For all major browsers, except IE 8 and earlier
    scanButton.addEventListener('click', scan);
    connectButton.addEventListener('click', connect);
} else if (scanButton.attachEvent) {                  // For IE 8 and earlier versions
    scanButton.attachEvent('onclick', scan);
    connectButton.attachEvent('onclick', connect);
}

// Get important device information
getRequest(base_url+'device-id', device_id_callback);
getRequest(base_url+'public-key', public_key_callback);