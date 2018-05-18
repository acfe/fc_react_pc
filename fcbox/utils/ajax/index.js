class Ajax {

    constructor() {
        //this.createXMLHttpRequest();
        this.isAlipay = false;
        let ua = navigator.userAgent.toLowerCase();
        //if(/Alipay/i.test(ua)) {
            this.isAlipay = true;
        //}
    }

    createXMLHttpRequest() {
        var xmlHttp;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
            if (xmlHttp.overrideMimeType) {
                xmlHttp.overrideMimeType("text/xml");
            }
        } else if (window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        xmlHttp.withCredentials = true;
        return xmlHttp;
    }

    get(param) {
        if (!param || !param.url) {
            return;
        }
        var xmlHttp = this.createXMLHttpRequest();
        var url = param.url;
        var data = param.data || {};
        var strTag = '', dataStr = '';
        for (var i in data) {
            dataStr += strTag + encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
            if (!strTag) {
                strTag = "&";
            }
        }
        url += /\?/.test(url) ? dataStr : '?' + dataStr;
        xmlHttp.open('GET', url, true);
        if(this.isAlipay) {
            xmlHttp.setRequestHeader("If-Modified-Since","0");
            xmlHttp.setRequestHeader("Cache-Control","no-cache");
        }
        xmlHttp.send();
        return this.sendCallback(xmlHttp);
    };

    post(param) {
        if (!param || !param.url) {
            return;
        }
        var xmlHttp = this.createXMLHttpRequest();
        var url = param.url;
        var data = param.data || {};
        xmlHttp.open('POST', url, true);
        xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        if(this.isAlipay) {
            xmlHttp.setRequestHeader("If-Modified-Since","0");
            xmlHttp.setRequestHeader("Cache-Control","no-cache");
        }
        var strTag = '', dataStr = '';
        for (var i in data) {
            dataStr += strTag + encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
            if (!strTag) {
                strTag = "&";
            }
        }
        xmlHttp.send(dataStr);
        if (typeof param.progress == 'function') {
            xmlHttp.upload.onprogress = function (e) {
                param.progress(e);
            }
        }
        return this.sendCallback(xmlHttp);
    };

    postForm(param) {
        if (!param || !param.url || !param.data) {
            return;
        }
        var xmlHttp = this.createXMLHttpRequest();
        var url = param.url;
        var data = param.data;
        xmlHttp.open('POST', url, true);        
        xmlHttp.send(data);
        return this.sendCallback(xmlHttp);
    }

    postJson(param) {
        if (!param || !param.url || !param.data) {
            return;
        }
        var xmlHttp = this.createXMLHttpRequest();
        var url = param.url;
        var data = param.data;
        xmlHttp.open('POST', url, true);
        xmlHttp.setRequestHeader("Content-Type","application/json");
        if(this.isAlipay) {
            xmlHttp.setRequestHeader("If-Modified-Since","0");
            xmlHttp.setRequestHeader("Cache-Control","no-cache");
        }
        xmlHttp.send(JSON.stringify(data));
        return this.sendCallback(xmlHttp);
    }

    upload(param) {
        if (!param || !param.url || !param.data) {
            return;
        }
        var xmlHttp = this.createXMLHttpRequest();
        var url = param.url;
        var data = param.data;
        xmlHttp.open('POST', url, true);
        xmlHttp.withCredentials = false;       
        xmlHttp.send(data);
        if (param.onprogress) {
            xmlHttp.onprogress = param.onprogress;
            xmlHttp.upload.onprogress = param.onprogress;
        }
        param.success = param.success || function() {};
        param.error = param.error || function() {};
        xmlHttp.onload = (e) => {
            if((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 304){
                param.success(xmlHttp.responseText);
            } else {
                param.error(xmlHttp.responseText || e);
            }
        }
        xmlHttp.onerror = (e) => {
            param.error(xmlHttp.responseText || e);
        }
    }

    uploadFormData (param) {
        if (!param || !param.url || !param.data) {
            return;
        }
        var form = new FormData();
        var xmlHttp = this.createXMLHttpRequest();
        var url = param.url;
        var data = param.data;
        for(var p in data){
            if(data.hasOwnProperty(p)){
                form.append(p, data[p]);
            }
        }
        xmlHttp.open('POST', url, true);
        xmlHttp.withCredentials = false;         
        xmlHttp.send(form);
        return this.sendCallback(xmlHttp);
    }

    sendCallback(xmlHttp) {
        return new Promise((resolve, reject) => {
            xmlHttp.onload = (e) => {
                if((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 304){
                    resolve(xmlHttp.responseText);
                } else {
                    reject(xmlHttp.responseText || e);
                }
            }
            xmlHttp.onerror = (e) => {
                reject(xmlHttp.responseText || e);
            }
        });
    }
}

export default new Ajax();
