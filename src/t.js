// t.js (c) Alex Wilson 2012 (arexkun11@gmail.com)
~function(data, transforms, uid, expando){
    "use strict";
    
    for(var st = document.documentElement.style, prefixes = "O0Moz0Webkit0Ms0".split(0), prefix, prefix_lc, l = prefixes.length;l--;){
        if(prefixes[l] + "Transition" in st){
            prefix = prefixes[l];
            prefix_lc = prefix.toLowerCase();
        }
    }
    
    function lC(a){return "-" + a.toLowerCase()}
    function uC(a){return a.substring(1).toUpperCase()}
    
    function d(elem, prop){
        var id;
        return data[id = elem[expando] || (elem[expando] = uid++)] || (data[id] = {});
    }
    
    function proxy(props, fn){
        for(var i = props.length, ret = {};i--;){
            ret[props[i]] = fn(props[i]);
        }
        return ret;
    }
    
    function tm(s){
        if(/\ds$/.test(s)) return parseFloat(s) * 1000;
        return parseInt(s);
    }
    
    function t(elem, prop, val, time){
        setTimeout(function(){
            st[prefix + "Transition"] = arr + "";
        }, 13);
        prop = prop.replace(/\-[a-z]/, uC);
        var r, o = css(elem, prop), g = 0, trans = d(elem, "t"), arr = [], l = 0, st = elem.style, tO;
        trans[transforms.hasOwnProperty(prop) ? "-" + prefix_lc + "-transform" : prop.replace(/[A-Z]/g, lC)] = time;
        console.log(trans);
        for(var x in trans){
            arr[l++] = x + " " + trans[x];
        }
        
        time = tm(time);
        
        return r = {
            go: function(fn){
                clearTimeout(tO);
                tO = setTimeout(function(){
                    g = 1;
                    css(elem, prop, val);
                    if(fn) tO = setTimeout(function(){
                        fn.call(elem);
                    }, time)
                }, 13);
                return r;
            },
            
            stop: function(){
                clearTimeout(tO);
                css(elem, prop, css(elem, prop));
                return r;
            },
            
            revert: function(fn){
                clearTimeout(tO);
                tO = setTimeout(function(){
                    g = 0;
                    css(elem, prop, o);
                    if(fn) tO = setTimeout(function(){
                        fn.call(elem);
                    }, time)
                }, 13);
                return r;
            },
            
            toggle: function(fn){
              return g ? r.revert(fn) : r.go(fn);  
            },
            
            on: function(evt, noToggle, cb){
                if(typeof noToggle === "function"){
                    cb = noToggle;
                    noToggle = false;
                }
                
                if(/\s/.test(evt)){
                    evt = evt.split(/\s+/);
                    for(var i = evt.length;i--;){
                        r.on(evt[i], noToggle, cb);
                    }
                    return r;
                }
                
                
                if(evt === "hover"){
                    on(elem, "mouseover", function(){
                        r.go(cb);
                    });
                    on(elem, "mouseout", function(){
                       r.revert(cb); 
                    });
                }
                else
                {
                    on(elem, evt, function(){noToggle ? r.go(cb) : r.toggle(cb)})
                }
                return t;
            },
            
            and: function(other){
                return proxy("go0stop0revert0toggle0on".split(0), function(p){
                    return function(){
                        r[p].apply(this, arguments);
                        other[p].apply(this, arguments);
                    };
                });
            }
        }
    }
    
    // Transformation defaults
    
    function on(elem, evt, fn){
        elem.addEventListener(evt, fn, false);
    }
    
    function css(elem, prop, val){
        var is_tr = transforms.hasOwnProperty(prop), tr, str, x;
        if(val != null){
            if(is_tr){
                tr = d(elem, "tr");
                str = "";
                tr[prop] = val;
                for(x in tr) str += x + "(" + tr[x] + ") ";
                elem.style[prefix + "Transform"] = str;
            }
            else
            {
                elem.style[prop] = val;
            }
        }
        else
        {
            if(is_tr){
                tr = d(elem, "tr");
                return tr.hasOwnProperty(prop) ? tr[prop] : transforms[prop];
            }
            else
            {
                return getComputedStyle(elem, null)[prop];
            }
        }
    }
    
    t.css = css;
    window.t = t;
    t.data = data;
    
}({}, {
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0
}, 1, Math.random());