/*! wordcloud-app  2014-08-30 */
"use strict";var GO2=function(a){if(!a||!a.clientId)throw"You need to at least set the clientId";this._clientId=a.clientId,a.scope&&(this._scope=Array.isArray(a.scope)?a.scope.join(" "):a.scope),a.redirectUri&&(this._redirectUri=a.redirectUri),a.popupHeight&&(this._popupHeight=a.popupHeight),a.popupWidth&&(this._popupWidth=a.popupWidth)};GO2.receiveMessage=function(){var a;window.opener&&window.opener.__windowPendingGO2&&(a=window.opener.__windowPendingGO2),window.parent&&window.parent.__windowPendingGO2&&(a=window.parent.__windowPendingGO2);var b=window.location.hash;a&&-1!==b.indexOf("access_token")&&a._handleMessage(b.replace(/^.*access_token=([^&]+).*$/,"$1"),parseInt(b.replace(/^.*expires_in=([^&]+).*$/,"$1"),10),b.replace(/^.*state=go2_([^&]+).*$/,"$1")),a&&window.location.search.indexOf("error=")&&a._handleMessage(!1)},GO2.prototype={WINDOW_NAME:"google_oauth2_login_popup",OAUTH_URL:"https://accounts.google.com/o/oauth2/auth",_clientId:void 0,_scope:"https://www.googleapis.com/auth/plus.me",_redirectUri:window.location.href.substr(0,window.location.href.length-window.location.hash.length).replace(/#$/,""),_popupWindow:null,_immediateFrame:null,_stateId:Math.random().toString(32).substr(2),_accessToken:void 0,_timer:void 0,_popupWidth:500,_popupHeight:400,onlogin:null,onlogout:null,login:function(a,b){if(!this._accessToken){this._removePendingWindows(),window.__windowPendingGO2=this;var c=this.OAUTH_URL+"?response_type=token&redirect_uri="+encodeURIComponent(this._redirectUri)+"&scope="+encodeURIComponent(this._scope)+"&state=go2_"+this._stateId+"&client_id="+encodeURIComponent(this._clientId);if(!b&&a&&(c+="&approval_prompt=force"),b){c+="&approval_prompt=auto";var d=this._immediateFrame=document.createElement("iframe");return d.src=c,d.hidden=!0,d.width=d.height=1,d.name=this.WINDOW_NAME,void document.body.appendChild(d)}var e=window.screenX+window.outerWidth/2-this._popupWidth/2,f=window.screenY+window.outerHeight/2-this._popupHeight/2,g="width="+this._popupWidth+",height="+this._popupHeight+",top="+f+",left="+e+",location=yes,toolbar=no,menubar=no";this._popupWindow=window.open(c,this.WINDOW_NAME,g)}},logout:function(){this._accessToken&&(this._removePendingWindows(),clearTimeout(this._timer),this._accessToken=void 0,this.onlogout&&this.onlogout())},getAccessToken:function(){return this._accessToken},_handleMessage:function(a,b,c){this._stateId===c&&(this._removePendingWindows(),a&&(this._accessToken=a,this.onlogin&&this.onlogin(this._accessToken),clearTimeout(this._timer),this._timer=setTimeout(function(){this._accessToken=void 0,this.onlogout&&this.onlogout()}.bind(this),1e3*b)))},destory:function(){clearTimeout(this._timer),this._removePendingWindows()},_removePendingWindows:function(){this._immediateFrame&&(document.body.removeChild(this._immediateFrame),this._immediateFrame=null),this._popupWindow&&(this._popupWindow.close(),this._popupWindow=null),window.__windowPendingGO2===this&&delete window.__windowPendingGO2}},window.name===GO2.prototype.WINDOW_NAME&&GO2.receiveMessage(),"function"==typeof define&&define.amd?define("google-oauth2-web-client",[],function(){return GO2}):window.GO2=GO2;