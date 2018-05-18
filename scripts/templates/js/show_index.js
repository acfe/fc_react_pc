const publicPath = '{publicPath}';

var index = function () {
    this.commonInit();
};

index.prototype =  {

    commonInit: function () {
        window.fc = window.fc || {};
        if(!this.isListeningHash) {
            window.fc.hashChangeFuncs = {
                pageInit: this.pageInit.bind(this)
            };
            window.addEventListener('popstate', function() {
                for(var i in window.fc.hashChangeFuncs) {
                    window.fc.hashChangeFuncs[i]();
                }
            });
            this.pageInit();
            this.isListeningHash = true;
        }
    },

    pageInit: function () {
        var hashArr = location.hash.split('/');
        if(!hashArr || !hashArr[1]) {
            hashArr = ['', 'index'];
        }
        window.fc.hashArr = hashArr;
        var show = hashArr[1];
        if(this.show == show) {
            return false;
        }
        window.fc.routerHashLock = false;
        if(this.show) {
            window.fc.routerHashLock = true;
            location.reload();
            return;
        }
        this.show = show;
        //loading
        var app = document.getElementById('app');
        app.style.minHeight = document.clientHeight + 'px';
        app.innerHTML = '<div class="loadingImg"><img src="{publicPath}img/loading.gif"></div>';
        this.createCss(show);
        var index = this;
        setTimeout(function() {
            if(!window.fc.vendorInit) {
                window.fc.vendorInit = true;
                this.createVendor('vendor', function() {
                    index.createJs(show);
                });
            } else {
                index.createJs(show);
            }
        }.bind(this), 500);
    },

    createCss: function (name) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
        link.href = publicPath + 'css/' + name + '.css?{random}';
    },

    createVendor: function (name, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = publicPath + 'js/' + name +  '.js?{random}';
        head.appendChild(script);
        script.onload = function() {
            callback && callback();
        };
    },

    createJs: function (name) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        head.appendChild(script);
        script.src = publicPath + 'js/' + name +  '.js?{random}';
    }

};

new index();