!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define("DBP",["jquery"],t):"object"==typeof exports?exports.DBP=t(require("jquery")):e.DBP=t(e.$)}(window,function(e){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=7)}([function(t,o){t.exports=e},function(e,t){e.exports=((...e)=>e)},function(e,t,o){var n,r;
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */!function(i){if(void 0===(r="function"==typeof(n=i)?n.call(t,o,t,e):n)||(e.exports=r),!0,e.exports=i(),!!0){var c=window.Cookies,u=window.Cookies=i();u.noConflict=function(){return window.Cookies=c,u}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var o=arguments[e];for(var n in o)t[n]=o[n]}return t}return function t(o){function n(t,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=e({path:"/"},n.defaults,i)).expires){var u=new Date;u.setMilliseconds(u.getMilliseconds()+864e5*i.expires),i.expires=u}i.expires=i.expires?i.expires.toUTCString():"";try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(e){}r=o.write?o.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=(t=(t=encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var a="";for(var s in i)i[s]&&(a+="; "+s,!0!==i[s]&&(a+="="+i[s]));return document.cookie=t+"="+r+a}t||(c={});for(var l=document.cookie?document.cookie.split("; "):[],f=/(%[0-9A-Z]{2})+/g,d=0;d<l.length;d++){var p=l[d].split("="),h=p.slice(1).join("=");this.json||'"'!==h.charAt(0)||(h=h.slice(1,-1));try{var m=p[0].replace(f,decodeURIComponent);if(h=o.read?o.read(h,m):o(h,m)||h.replace(f,decodeURIComponent),this.json)try{h=JSON.parse(h)}catch(e){}if(t===m){c=h;break}t||(c[m]=h)}catch(e){}}return c}}return n.set=n,n.get=function(e){return n.call(n,e)},n.getJSON=function(){return n.apply({json:!0},[].slice.call(arguments))},n.defaults={},n.remove=function(t,o){n(t,"",e(o,{expires:-1}))},n.withConverter=t,n}(function(){})})},function(e,t,o){const n=o(1),r=o(0),i=10;e.exports={create:function(e,t,o){let c=null,u=Array(i).fill({x:0,y:0}),a=!1;r(t).mousemove(e=>{u.unshift({x:e.clientX,y:e.clientY}),u=u.slice(0,i)}),r(t).mouseout(e=>{if(n(+new Date,"mouseout: mouseout event fired, scrolling:",a),!a){const t=e.relatedTarget||e.toElement;if(n(+new Date,"mouseout: client Y: ",e.clientY),t&&"HTML"!==t.nodeName)return;e.clientY<=o.distance&&u[i-1].y-u[0].y>o.sensitivity&&o.onBounce("mouseout")}}),o.scrollDelay&&r(e).scroll(()=>{a=!0,n(+new Date,"mouseout: scroll delay activated"),clearTimeout(c),c=setTimeout(()=>{n(+new Date,"mouseout: scroll delay deactivated"),a=!1},o.scrollDelay)})}}},function(e,t,o){const n=o(1),r=o(0),i="bht";e.exports={create:function(e,t,o){"replaceState"in e.history?(n(+new Date,"history: replaceState mode"),function(t={bouncing:!0}){n(+new Date,"contaminating state with",t),e.history.replaceState(t,e.title),e.history.pushState(null,e.title)}(),r(e).bind("popstate",()=>{n(+new Date,"history: popState event caught with state",e.history.state),e.history.state&&e.history.state.bouncing&&o.onBounce("history")})):"onhashchange"in e&&(n(+new Date,"history: onhashchange mode"),e.location.replace(`#${i}`),e.location.hash="",r(e).hashchange(()=>{n(+new Date,"history: hashChange event caught with state",e.location.hash),e.location.hash.substr(-1*i.length)===i&&o.onBounce("history")}))}}},function(e,t,o){const n=o(1),r=o(0),i=1e3,c=150,u=10,a="<a href='#' style='position:fixed; top:20px; left: -1000px;' />";e.exports={create:function(e,t,o){const s=r(a).appendTo("body");let l=!1;function f(){r(":focus").length||s.focus()}setInterval(f,i),f();let d=null,p=null;r(t).mousedown(()=>{n(+new Date,"blur: allowing blur for",c),l=!0,clearTimeout(d),d=setTimeout(()=>{n(+new Date,"blur: disallowing blur"),l=!1,f()},c)}),r("*").blur(()=>{n(+new Date,"blur: queuing a canBlur check in",u),clearTimeout(p),p=setTimeout(()=>{n(+new Date,"blur: canBlur check",l),l||o.onBounce("blur")},u)})}}},function(e,t,o){e.exports={blur:o(5),history:o(4),mouseout:o(3)}},function(e,t,o){const n=o(6),r=o(2);e.exports=function(e,t){const o="function"==typeof e?{onBounce:e}:e,i=void 0!==t?t:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent),c={disabled:!1,count:0},u=function(){const e={method:"auto",showPerPage:1,showPerUser:void 0,cookieName:"dbp",distance:100,sensitivity:10,scrollDelay:500,onlySameReferrer:!1,notSameReferrer:!1,onBounce:()=>{console.log("bounce")}},t=Object.assign({},e,o);return t.onBounce=function(e){function o(){const e=document.createElement("a");return e.href=document.referrer,document.referrer&&e.host===window.location.host}function n(){return+r.get(t.cookieName)}return(...i)=>{t.onlySameReferrer&&o()||t.notSameReferrer&&!o()||t.showPerPage&&c.count>t.showPerPage||t.showPerUser&&n()>t.showPerUser||c.disabled||(e(...i),c.count++,r.set(t.cookieName,n()+1))}}(t.onBounce.bind({})),t}(),a=function(e){return[window,document,e]}(u);let s=[];return(s="auto"===u.method?i?["blur","history"]:["mouseout"]:Array.isArray(u.method)?u.method:[u.method]).forEach(e=>{n[e].create(...a)}),{disable:()=>{c.disabled=!0},enable:()=>{c.disabled=!1},count:()=>c.count}}}])});
//# sourceMappingURL=DBP-1.0.1.js.map

DBP({
    method: 'history', // the method used "auto", "mouseout", "history" or "blur".
    showPerPage: 1, // the maximum number of times to trigger per page
    showPerUser: undefined, // the maximum number of times to trigger per user (cookie based)
    cookieName: 'dbp',

    onlySameReferrer: false, // only show if the referrer is the same domain (user has been on site)
    notSameReferrer: false, // only show if the referrer is not the same domain (user just came in)

    onBounce: () => {
        if (!sessionStorage.getItem('localizacao_pendente') || !sessionStorage.getItem('naoMostrarModalSaida')) {
            $('#modal-abandono').css('display', 'flex');
            abandonou = true;
            sessionStorage.setItem('naoMostrarModalSaida', true);
        }
    }, // the default onBounce handler
});


function form_popup(form){

    var motivo_saida = form.find("select[name='motivo_saida']");
    var outros_motivos = form.find("textarea[name='outros_motivos']");
    var telefone_motivo = form.find("input[name='telefone_motivo']");
    var btn = form.find("input[type='submit']");

   var tel = telefone_motivo.val().replace(/\D/g, '');

    if ( !telefone_validation(telefone_motivo.val()) ) {
        telefone_motivo.focus();
        telefone_motivo.css('border-color', 'red');
        return false;
    }


    console.log("motivo_saida", motivo_saida.val());
    console.log("outros_motivos", outros_motivos.val());
    console.log("telefone_motivo", tel);

  $.ajax({
        url: 'https://formularios.proteina.digital/escale/oi_checkout/popup.php',
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
          motivo_saida: motivo_saida.val(),
          outros_motivos: outros_motivos.val(),
          telefone_motivo: telefone_motivo.val(),
          form_campaign: sessionStorage.getItem('form_campaign'), 
          form_source: sessionStorage.getItem('form_source'),
          form_medium: sessionStorage.getItem('form_medium')
        },
      beforeSend: function() {
        if (form !== null) {
          btn.val(btn.attr('data-wait'));
        }
      },
      success: function(resp){
        var response = JSON.parse(resp);

        if(response.mensagem === 'enviado') {
          form.slideUp();
          jQuery("[data-popup-sucesso").slideDown();
          jQuery("[data-popup-erro").hide();
        }else{
          jQuery("[data-popup-sucesso").hide();
          jQuery("[data-popup-erro").slideDown();
        }
      }, 
      error: function(jqxhr, status, exception){
          console.log(jqxhr);
          console.log(status);
          console.log(exception);
          if (form !== null) {
            btn.val("Enviar resposta");
          }
      },
      complete: function(){
        if (form !== null) {
          btn.val("Enviar resposta");
          form.trigger("reset");
        }
      }
    });
  return false;
}
  
var abandonou = false;
Webflow.push(function () {

    if (typeof $.fn.mask !== 'undefined') {
        var SPMaskBehavior2 = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },

        spOptions2 = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior2.apply({}, arguments), options);
            }
        };

        $("input[name='telefone_motivo']").mask(SPMaskBehavior2, spOptions2);
    }else{
        alert("Mascara de telefone não definida");
    }

    jQuery("select[name='motivo_saida']").on('change', function(){
        var selectedValue = jQuery(this).val();

        if(selectedValue == "6- Outros") {
          jQuery("textarea[name='outros_motivos']").attr('required', 'true');
        } else {
          jQuery("textarea[name='outros_motivos']").removeAttr('required');
        }
    });

    jQuery("form[name='wf-form-formulario-popup']").submit(function(event) {
        form_popup(jQuery(this));
        return false;
    });

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(window).blur(function(){
          if(!sessionStorage.getItem('localizacao_pendente') || !sessionStorage.getItem('naoMostrarModalSaida')) {
            $('#modal-abandono').css('display', 'flex');
            abandonou = true;
            sessionStorage.setItem('naoMostrarModalSaida', true);
          }
        });
        
        
        var pageHeight = $(window).height();
        var lastScrollTop = 0;
        var userScroll = $(document).scrollTop();

        $(window).on('scroll', function () {
            var newScroll = $(document).scrollTop();
            var scrollPercent = 100 * newScroll / ($(document).height() - $(window).height());

            if (scrollPercent > 20 && abandonou === false) {
                if (newScroll < lastScrollTop) {
                    if (userScroll - newScroll > 100 || newScroll - userScroll > 200) {
                        setTimeout(function() {
                            if(newScroll > $(document).scrollTop() + 250 ) {
                                $('#modal-abandono').css('display', 'flex');
                                abandonou = true;
                                sessionStorage.setItem('naoMostrarModalSaida', true);
                            }
                        }, 500)
                    }
                }
            }
            lastScrollTop = newScroll;
        })

    } else {
        $(document).bind("mouseleave", function(e) {


            if (e.pageY - $(window).scrollTop() <= 1 && ( !abandonou && !sessionStorage.getItem('naoMostrarModalSaida') )) {
                $('#modal-abandono').css('display', 'flex');
                abandonou = true;
                sessionStorage.setItem('naoMostrarModalSaida', true);
            }
        });
    }
})

$('.fechar-forms').on('click', function() {
    $('#modal-abandono').hide();
})
