(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1653c76e"],{"0cb2":function(t,e,i){var r=i("7b0b"),n=Math.floor,a="".replace,s=/\$([$&'`]|\d\d?|<[^>]*>)/g,o=/\$([$&'`]|\d\d?)/g;t.exports=function(t,e,i,l,c,u){var f=i+t.length,p=l.length,d=o;return void 0!==c&&(c=r(c),d=s),a.call(u,d,(function(r,a){var s;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,i);case"'":return e.slice(f);case"<":s=c[a.slice(1,-1)];break;default:var o=+a;if(0===o)return r;if(o>p){var u=n(o/10);return 0===u?r:u<=p?void 0===l[u-1]?a.charAt(1):l[u-1]+a.charAt(1):r}s=l[o-1]}return void 0===s?"":s}))}},5319:function(t,e,i){"use strict";var r=i("d784"),n=i("825a"),a=i("50c4"),s=i("a691"),o=i("1d80"),l=i("8aa5"),c=i("0cb2"),u=i("14c3"),f=Math.max,p=Math.min,d=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,i,r){var _=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,v=r.REPLACE_KEEPS_$0,m=_?"$":"$0";return[function(i,r){var n=o(this),a=void 0==i?void 0:i[t];return void 0!==a?a.call(i,n,r):e.call(String(n),i,r)},function(t,r){if(!_&&v||"string"===typeof r&&-1===r.indexOf(m)){var o=i(e,t,this,r);if(o.done)return o.value}var h=n(t),b=String(this),g="function"===typeof r;g||(r=String(r));var C=h.global;if(C){var k=h.unicode;h.lastIndex=0}var $=[];while(1){var y=u(h,b);if(null===y)break;if($.push(y),!C)break;var S=String(y[0]);""===S&&(h.lastIndex=l(b,a(h.lastIndex),k))}for(var E="",w=0,x=0;x<$.length;x++){y=$[x];for(var P=String(y[0]),A=f(p(s(y.index),b.length),0),R=[],L=1;L<y.length;L++)R.push(d(y[L]));var j=y.groups;if(g){var I=[P].concat(R,A,b);void 0!==j&&I.push(j);var N=String(r.apply(void 0,I))}else N=c(P,b,A,R,j,r);A>=w&&(E+=b.slice(w,A)+N,w=A+P.length)}return E+b.slice(w)}]}))},8403:function(t,e,i){"use strict";i("96cf");var r=i("1da1"),n=i("bc3a"),a=i.n(n),s=function(){return a.a.post("email/resend")},o=function(t,e,i,r){return a.a.post("email/verify/"+String(t)+"/"+String(e),null,{params:{expires:String(i),signature:String(r)}})};e["a"]={resendEmailVerification:function(){return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))()},verifyEmail:function(t,e,i,n){return Object(r["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,o(t,e,i,n);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r)})))()}}},c66d:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"profile"},[i("div",{staticClass:"container"},[i("div",{staticClass:"profile__tab-menu"},[i("ul",{staticClass:"profile__tab-menu-ul"},[i("router-link",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",attrs:{to:{name:"Profile"},"active-class":"choice",exact:!0}},[i("div",{staticClass:"profile__tab-menu-li-body"},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Мои данные")])])]),i("router-link",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",attrs:{to:{name:"ProfileNotices"},"active-class":"choice"}},[i("div",{staticClass:"profile__tab-menu-li-body"},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Уведомления")]),t.noticesCount?i("span",{staticClass:"profile__tab-menu-li-span"},[t._v(t._s(t.noticesCount))]):t._e()])]),i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-last"},[i("span",{staticClass:"profile__tab-menu-li-link black-arrow"},[t._v("Разместить")]),i("ul",{staticClass:"profile__tab-menu-ul-drop"},[i("router-link",{attrs:{to:{name:"ProfileAccounts"},custom:""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.navigate,n=e.isActive;return[i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",class:{choice:n},on:{click:r}},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Анкету блогера")])])]}}])}),i("router-link",{attrs:{to:{name:"ProfileProjects"},custom:""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.navigate,n=e.isActive;return[i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",class:{choice:n},on:{click:r}},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Рекламное предложение")])])]}}])})],1)])],1)]),t.userLoading||t.user.verifyed?t._e():i("div",{staticClass:"profile__confirmation"},[i("div",{staticClass:"profile__confirmation-row"},[t._m(0),i("div",{staticClass:"profile__confirmation-button"},[t.mailSending?i("preloader",{attrs:{height:"90"}}):i("button",{staticClass:"button-grand-black",on:{click:t.resendVerification}},[t._v(" Отправить повторно ")])],1)])]),i("br"),t.userLoading?i("preloader"):i("router-view")],1)])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"profile__confirmation-text"},[i("p",{staticClass:"profile__confirmation-text-p"},[t._v(" Чтобы создавать заявки и получать предложения - подтвердите свою почту. Мы отправили вам сообщение на E-mail. ")]),i("p",{staticClass:"profile__confirmation-text-p secondary"},[t._v(" (Обновите страницу, если вы уже подтвердили почту) ")])])}],a=(i("d3b7"),i("ac1f"),i("5319"),i("f152")),s=i("8403"),o={name:"Profile",data:function(){return{mailSending:!1}},components:{Preloader:a["a"]},computed:{user:function(){return this.$store.getters.user},userLoading:function(){return this.$store.getters.userLoading},noticesCount:function(){return this.$store.getters.noticesPagination.total}},methods:{resendVerification:function(){var t=this;this.mailSending=!0,s["a"].resendEmailVerification().then((function(){t.$notify("Письмо с подтверждением отправлено на ваш E-mail.")})).catch((function(t){t.response&&429===t.response.status&&alert("Вы слишком часто просите переотправить вам подтверждение. Повторите попытку позже.")})).finally((function(){t.mailSending=!1}))},clearQueryParam:function(t){if(void 0!==this.$route.query[t]){var e=Object.assign({},this.$route.query);delete e[t],this.$router.replace({query:e})}}},mounted:function(){var t=this;this.$route.query["reload"]&&(this.clearQueryParam("reload"),setTimeout((function(){location.reload()}),400)),this.user?this.user.verifyed&&this.$store.dispatch("loadNotices",{page:1}):this.$onUserLoad.hook((function(){t.user.verifyed&&t.$store.dispatch("loadNotices",{page:1})}))}},l=o,c=i("2877"),u=Object(c["a"])(l,r,n,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-1653c76e-legacy.218ca910.js.map