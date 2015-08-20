/*
All this JS will be injected inplace of
<script src='script.js'></script>

IMPORTANT file must NOT contain any double quotes (').

*/

// START RSA - DO NOT MODIFY ---------------------------------------------------
var a;var b=0xdeadbeefcafe;var c=((b&0xffffff)==0xefcafe);function d(a,b,c){if(a!=null)if('number'==typeof a)this.fromNumber(a,b,c);else if(b==null&&'string'!=typeof a)this.fromString(a,256);else this.fromString(a,b);}function e(){return new d(null);}function f(a,b,c,d,e,f){while(--f>=0){var g=b*this[a++]+c[d]+e;e=Math.floor(g/0x4000000);c[d++]=g&0x3ffffff;}return e;}function g(a,b,c,d,e,f){var g=b&0x7fff,h=b>>15;while(--f>=0){var i=this[a]&0x7fff;var j=this[a++]>>15;var k=h*i+j*g;i=g*i+((k&0x7fff)<<15)+c[d]+(e&0x3fffffff);e=(i>>>30)+(k>>>15)+h*j+(e>>>30);c[d++]=i&0x3fffffff;}return e;}function h(a,b,c,d,e,f){var g=b&0x3fff,h=b>>14;while(--f>=0){var i=this[a]&0x3fff;var j=this[a++]>>14;var k=h*i+j*g;i=g*i+((k&0x3fff)<<14)+c[d]+e;e=(i>>28)+(k>>14)+h*j;c[d++]=i&0xfffffff;}return e;}if(c&&(navigator.appName=='Microsoft Internet Explorer')){d.prototype.am=g;a=30;}else if(c&&(navigator.appName!='Netscape')){d.prototype.am=f;a=26;}else{d.prototype.am=h;a=28;}d.prototype.DB=a;d.prototype.DM=((1<<a)-1);d.prototype.DV=(1<<a);var i=52;d.prototype.FV=Math.pow(2,i);d.prototype.F1=i-a;d.prototype.F2=2*a-i;var j='0123456789abcdefghijklmnopqrstuvwxyz';var k=new Array();var l,m;l='0'.charCodeAt(0);for(m=0;m<=9;++m)k[l++]=m;l='a'.charCodeAt(0);for(m=10;m<36;++m)k[l++]=m;l='A'.charCodeAt(0);for(m=10;m<36;++m)k[l++]=m;function n(a){return j.charAt(a);}function o(a,b){var c=k[a.charCodeAt(b)];return(c==null)?-1:c;}function p(a){for(var b=this.t-1;b>=0;--b)a[b]=this[b];a.t=this.t;a.s=this.s;}function q(a){this.t=1;this.s=(a<0)?-1:0;if(a>0)this[0]=a;else if(a<-1)this[0]=a+this.DV;else this.t=0;}function r(a){var b=e();b.fromInt(a);return b;}function s(a,b){var c;if(b==16)c=4;else if(b==8)c=3;else if(b==256)c=8;else if(b==2)c=1;else if(b==32)c=5;else if(b==4)c=2;else{this.fromRadix(a,b);return;}this.t=0;this.s=0;var e=a.length,f=false,g=0;while(--e>=0){var h=(c==8)?a[e]&0xff:o(a,e);if(h<0){if(a.charAt(e)=='-')f=true;continue;}f=false;if(g==0)this[this.t++]=h;else if(g+c>this.DB){this[this.t-1]|=(h&((1<<(this.DB-g))-1))<<g;this[this.t++]=(h>>(this.DB-g));}else this[this.t-1]|=h<<g;g+=c;if(g>=this.DB)g-=this.DB;}if(c==8&&(a[0]&0x80)!=0){this.s=-1;if(g>0)this[this.t-1]|=((1<<(this.DB-g))-1)<<g;}this.clamp();if(f)d.ZERO.subTo(this,this);}function t(){var a=this.s&this.DM;while(this.t>0&&this[this.t-1]==a)--this.t;}function u(a){if(this.s<0)return '-'+this.negate().toString(a);var b;if(a==16)b=4;else if(a==8)b=3;else if(a==2)b=1;else if(a==32)b=5;else if(a==4)b=2;else return this.toRadix(a);var c=(1<<b)-1,d,e=false,f='',g=this.t;var h=this.DB-(g*this.DB)%b;if(g-->0){if(h<this.DB&&(d=this[g]>>h)>0){e=true;f=n(d);}while(g>=0){if(h<b){d=(this[g]&((1<<h)-1))<<(b-h);d|=this[--g]>>(h+=this.DB-b);}else{d=(this[g]>>(h-=b))&c;if(h<=0){h+=this.DB;--g;}}if(d>0)e=true;if(e)f+=n(d);}}return e?f:'0';}function v(){var a=e();d.ZERO.subTo(this,a);return a;}function w(){return(this.s<0)?this.negate():this;}function x(a){var b=this.s-a.s;if(b!=0)return b;var c=this.t;b=c-a.t;if(b!=0)return(this.s<0)?-b:b;while(--c>=0)if((b=this[c]-a[c])!=0)return b;return 0;}function y(a){var b=1,c;if((c=a>>>16)!=0){a=c;b+=16;}if((c=a>>8)!=0){a=c;b+=8;}if((c=a>>4)!=0){a=c;b+=4;}if((c=a>>2)!=0){a=c;b+=2;}if((c=a>>1)!=0){a=c;b+=1;}return b;}function z(){if(this.t<=0)return 0;return this.DB*(this.t-1)+y(this[this.t-1]^(this.s&this.DM));}function A(a,b){var c;for(c=this.t-1;c>=0;--c)b[c+a]=this[c];for(c=a-1;c>=0;--c)b[c]=0;b.t=this.t+a;b.s=this.s;}function B(a,b){for(var c=a;c<this.t;++c)b[c-a]=this[c];b.t=Math.max(this.t-a,0);b.s=this.s;}function C(a,b){var c=a%this.DB;var d=this.DB-c;var e=(1<<d)-1;var f=Math.floor(a/this.DB),g=(this.s<<c)&this.DM,h;for(h=this.t-1;h>=0;--h){b[h+f+1]=(this[h]>>d)|g;g=(this[h]&e)<<c;}for(h=f-1;h>=0;--h)b[h]=0;b[f]=g;b.t=this.t+f+1;b.s=this.s;b.clamp();}function D(a,b){b.s=this.s;var c=Math.floor(a/this.DB);if(c>=this.t){b.t=0;return;}var d=a%this.DB;var e=this.DB-d;var f=(1<<d)-1;b[0]=this[c]>>d;for(var g=c+1;g<this.t;++g){b[g-c-1]|=(this[g]&f)<<e;b[g-c]=this[g]>>d;}if(d>0)b[this.t-c-1]|=(this.s&f)<<e;b.t=this.t-c;b.clamp();}function E(a,b){var c=0,d=0,e=Math.min(a.t,this.t);while(c<e){d+=this[c]-a[c];b[c++]=d&this.DM;d>>=this.DB;}if(a.t<this.t){d-=a.s;while(c<this.t){d+=this[c];b[c++]=d&this.DM;d>>=this.DB;}d+=this.s;}else{d+=this.s;while(c<a.t){d-=a[c];b[c++]=d&this.DM;d>>=this.DB;}d-=a.s;}b.s=(d<0)?-1:0;if(d<-1)b[c++]=this.DV+d;else if(d>0)b[c++]=d;b.t=c;b.clamp();}function F(a,b){var c=this.abs(),e=a.abs();var f=c.t;b.t=f+e.t;while(--f>=0)b[f]=0;for(f=0;f<e.t;++f)b[f+c.t]=c.am(0,e[f],b,f,0,c.t);b.s=0;b.clamp();if(this.s!=a.s)d.ZERO.subTo(b,b);}function G(a){var b=this.abs();var c=a.t=2*b.t;while(--c>=0)a[c]=0;for(c=0;c<b.t-1;++c){var d=b.am(c,b[c],a,2*c,0,1);if((a[c+b.t]+=b.am(c+1,2*b[c],a,2*c+1,d,b.t-c-1))>=b.DV){a[c+b.t]-=b.DV;a[c+b.t+1]=1;}}if(a.t>0)a[a.t-1]+=b.am(c,b[c],a,2*c,0,1);a.s=0;a.clamp();}function H(a,b,c){var f=a.abs();if(f.t<=0)return;var g=this.abs();if(g.t<f.t){if(b!=null)b.fromInt(0);if(c!=null)this.copyTo(c);return;}if(c==null)c=e();var h=e(),i=this.s,j=a.s;var k=this.DB-y(f[f.t-1]);if(k>0){f.lShiftTo(k,h);g.lShiftTo(k,c);}else{f.copyTo(h);g.copyTo(c);}var l=h.t;var m=h[l-1];if(m==0)return;var n=m*(1<<this.F1)+((l>1)?h[l-2]>>this.F2:0);var o=this.FV/n,p=(1<<this.F1)/n,q=1<<this.F2;var r=c.t,s=r-l,t=(b==null)?e():b;h.dlShiftTo(s,t);if(c.compareTo(t)>=0){c[c.t++]=1;c.subTo(t,c);}d.ONE.dlShiftTo(l,t);t.subTo(h,h);while(h.t<l)h[h.t++]=0;while(--s>=0){var u=(c[--r]==m)?this.DM:Math.floor(c[r]*o+(c[r-1]+q)*p);if((c[r]+=h.am(0,u,c,s,0,l))<u){h.dlShiftTo(s,t);c.subTo(t,c);while(c[r]<--u)c.subTo(t,c);}}if(b!=null){c.drShiftTo(l,b);if(i!=j)d.ZERO.subTo(b,b);}c.t=l;c.clamp();if(k>0)c.rShiftTo(k,c);if(i<0)d.ZERO.subTo(c,c);}function I(a){var b=e();this.abs().divRemTo(a,null,b);if(this.s<0&&b.compareTo(d.ZERO)>0)a.subTo(b,b);return b;}function J(a){this.m=a;}function K(a){if(a.s<0||a.compareTo(this.m)>=0)return a.mod(this.m);else return a;}function L(a){return a;}function M(a){a.divRemTo(this.m,null,a);}function N(a,b,c){a.multiplyTo(b,c);this.reduce(c);}function O(a,b){a.squareTo(b);this.reduce(b);}J.prototype.convert=K;J.prototype.revert=L;J.prototype.reduce=M;J.prototype.mulTo=N;J.prototype.sqrTo=O;function P(){if(this.t<1)return 0;var a=this[0];if((a&1)==0)return 0;var b=a&3;b=(b*(2-(a&0xf)*b))&0xf;b=(b*(2-(a&0xff)*b))&0xff;b=(b*(2-(((a&0xffff)*b)&0xffff)))&0xffff;b=(b*(2-a*b%this.DV))%this.DV;return(b>0)?this.DV-b:-b;}function Q(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&0x7fff;this.mph=this.mp>>15;this.um=(1<<(a.DB-15))-1;this.mt2=2*a.t;}function R(a){var b=e();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);if(a.s<0&&b.compareTo(d.ZERO)>0)this.m.subTo(b,b);return b;}function S(a){var b=e();a.copyTo(b);this.reduce(b);return b;}function T(a){while(a.t<=this.mt2)a[a.t++]=0;for(var b=0;b<this.m.t;++b){var c=a[b]&0x7fff;var d=(c*this.mpl+(((c*this.mph+(a[b]>>15)*this.mpl)&this.um)<<15))&a.DM;c=b+this.m.t;a[c]+=this.m.am(0,d,a,b,0,this.m.t);while(a[c]>=a.DV){a[c]-=a.DV;a[++c]++;}}a.clamp();a.drShiftTo(this.m.t,a);if(a.compareTo(this.m)>=0)a.subTo(this.m,a);}function U(a,b){a.squareTo(b);this.reduce(b);}function V(a,b,c){a.multiplyTo(b,c);this.reduce(c);}Q.prototype.convert=R;Q.prototype.revert=S;Q.prototype.reduce=T;Q.prototype.mulTo=V;Q.prototype.sqrTo=U;function W(){return((this.t>0)?(this[0]&1):this.s)==0;}function X(a,b){if(a>0xffffffff||a<1)return d.ONE;var c=e(),f=e(),g=b.convert(this),h=y(a)-1;g.copyTo(c);while(--h>=0){b.sqrTo(c,f);if((a&(1<<h))>0)b.mulTo(f,g,c);else{var i=c;c=f;f=i;}}return b.revert(c);}function Y(a,b){var c;if(a<256||b.isEven())c=new J(b);else c=new Q(b);return this.exp(a,c);}d.prototype.copyTo=p;d.prototype.fromInt=q;d.prototype.fromString=s;d.prototype.clamp=t;d.prototype.dlShiftTo=A;d.prototype.drShiftTo=B;d.prototype.lShiftTo=C;d.prototype.rShiftTo=D;d.prototype.subTo=E;d.prototype.multiplyTo=F;d.prototype.squareTo=G;d.prototype.divRemTo=H;d.prototype.invDigit=P;d.prototype.isEven=W;d.prototype.exp=X;d.prototype.toString=u;d.prototype.negate=v;d.prototype.abs=w;d.prototype.compareTo=x;d.prototype.bitLength=z;d.prototype.mod=I;d.prototype.modPowInt=Y;d.ZERO=r(0);d.ONE=r(1);function Z(){this.i=0;this.j=0;this.S=new Array();}function ab(a){var b,c,d;for(b=0;b<256;++b)this.S[b]=b;c=0;for(b=0;b<256;++b){c=(c+this.S[b]+a[b%a.length])&255;d=this.S[b];this.S[b]=this.S[c];this.S[c]=d;}this.i=0;this.j=0;}function ac(){var a;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;a=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=a;return this.S[(a+this.S[this.i])&255];}Z.prototype.init=ab;Z.prototype.next=ac;function ad(){return new Z();}var ae=256;var af;var ag;var ah;function ai(a){ag[ah++]^=a&255;ag[ah++]^=(a>>8)&255;ag[ah++]^=(a>>16)&255;ag[ah++]^=(a>>24)&255;if(ah>=ae)ah-=ae;}function aj(){ai(new Date().getTime());}if(ag==null){ag=new Array();ah=0;var ak;if(window.crypto&&window.crypto.getRandomValues){var al=new Uint8Array(32);window.crypto.getRandomValues(al);for(ak=0;ak<32;++ak)ag[ah++]=al[ak];}if(navigator.appName=='Netscape'&&navigator.appVersion<'5'&&window.crypto){var am=window.crypto.random(32);for(ak=0;ak<am.length;++ak)ag[ah++]=am.charCodeAt(ak)&255;}while(ah<ae){ak=Math.floor(65536*Math.random());ag[ah++]=ak>>>8;ag[ah++]=ak&255;}ah=0;aj();}function an(){if(af==null){aj();af=ad();af.init(ag);for(ah=0;ah<ag.length;++ah)ag[ah]=0;ah=0;}return af.next();}function ao(a){var b;for(b=0;b<a.length;++b)a[b]=an();}function ap(){}ap.prototype.nextBytes=ao;function aq(a,b){return new d(a,b);}function ar(a,b){var c='';var d=0;while(d+b<a.length){c+=a.substring(d,d+b)+'\n';d+=b;}return c+a.substring(d,a.length);}function as(a){if(a<0x10)return '0'+a.toString(16);else return a.toString(16);}function at(a,b){if(b<a.length+11){alert('Message too long for RSA');return null;}var c=new Array();var e=a.length-1;while(e>=0&&b>0){var f=a.charCodeAt(e--);if(f<128)c[--b]=f;else if((f>127)&&(f<2048)){c[--b]=(f&63)|128;c[--b]=(f>>6)|192;}else{c[--b]=(f&63)|128;c[--b]=((f>>6)&63)|128;c[--b]=(f>>12)|224;}}c[--b]=0;var g=new ap();var h=new Array();while(b>2){h[0]=0;while(h[0]==0)g.nextBytes(h);c[--b]=h[0];}c[--b]=2;c[--b]=0;return new d(c);}function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null;}function av(a,b){if(a!=null&&b!=null&&a.length>0&&b.length>0){this.n=aq(a,16);this.e=parseInt(b,16);}else alert('Invalid RSA public key');}function aw(a){return a.modPowInt(this.e,this.n);}function ax(a){var b=at(a,(this.n.bitLength()+7)>>3);if(b==null)return null;var c=this.doPublic(b);if(c==null)return null;var d=c.toString(16);if((d.length&1)==0)return d;else return '0'+d;}RSAKey.prototype.doPublic=aw;RSAKey.prototype.setPublic=av;RSAKey.prototype.encrypt=ax;
// END RSA - START PAGE JS -----------------------------------------------------

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
    postRequest(base_url+'connect-ap', {idx:0}, device_id_callback);
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

  postRequest(base_url+'configure-id', jsonData, connect_callback);
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
        callback.success(JSON.parse(xmlhttp.responseText));
      } else {
        //Error
        callback.error(xmlhttp.status, xmlhttp.responseText);
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
        callback.success(JSON.parse(xmlhttp.responseText));
      } else {
        //Error
        callback.error(xmlhttp.status, xmlhttp.responseText);
      }
      if (callback.regardless){
        //executed regardless
        callback.regardless();
      }
    }
  }
};

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

// Executed immediately on load
getRequest(base_url+'device-id', device_id_callback);
getRequest(base_url+'public-key', public_key_callback);