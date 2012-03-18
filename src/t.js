~function(data, transforms, uid, expando){
    "use strict";
    
    for(var st = document.documentElement.style, prefixes = "O0Moz0Webkit0Ms0".split(0), prefix, prefix_lc, l = prefixes.length;l--;){
        if(prefixes[l] + "Transition" in st){
            prefix = prefixes[l];
            prefix_lc = prefix.toLowerCase();
        }
    }
    
    
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
        
        var r, o = css(elem, prop), g = 0, trans = d(elem, "t"), arr = [], l = 0, st = elem.style, tO;
        d[transforms.hasOwnProperty(prop) ? "-" + prefix_lc + "-transform" : prop] = time;
        for(var x in d){
            arr[l++] = x + " " + d[x];
        }
        
        return r = {
            go: function(fn){
                clearTimeout(tO);
                return tO = setTimeout(function(){
                    g = 1;
                    css(elem, prop, val);
                    if(fn) tO = setTimeout(function(){
                        fn.call(elem);
                    }, tm(time))
                }, 13)
            },
            
            stop: function(){
                    clearTimeout(tO);
                css(elem, prop, t.css(elem, prop));
            },
            
            revert: function(){
                g = 0;
                css(elem, prop, o);
            },
            
            toggle: function(evt){
              g ? r.revert() : r.go();  
            },
            
            on: function(evt, noToggle){
                if(evt === "hover"){
                    on(elem, "mouseover", function(){
                        r.go();
                    });
                    on(elem, "mouseout", function(){
                       r.revert(); 
                    });
                }
                else
                {
                    on(elem, evt, noToggle ? r.go : r.toggle)
                }
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
                // TODO: keep in central object
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
    translateX: 0,
    translateY: 0,
    rotate: 0
}, 1, Math.random());