(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92cdfc32"],{8403:function(t,e,i){"use strict";i("96cf");var n=i("1da1"),r=i("bc3a"),a=i.n(r),s=function(){return a.a.post("email/resend")},o=function(t,e,i,n){return a.a.post("email/verify/"+String(t)+"/"+String(e),null,{params:{expires:String(i),signature:String(n)}})};e["a"]={resendEmailVerification:function(){return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))()},verifyEmail:function(t,e,i,r){return Object(n["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,o(t,e,i,r);case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()}}},c66d:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"profile"},[i("div",{staticClass:"container"},[i("div",{staticClass:"profile__tab-menu"},[i("ul",{staticClass:"profile__tab-menu-ul"},[i("router-link",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",attrs:{to:{name:"Profile"},"active-class":"choice",exact:!0}},[i("div",{staticClass:"profile__tab-menu-li-body"},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Мои данные")])])]),i("router-link",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",attrs:{to:{name:"ProfileNotices"},"active-class":"choice"}},[i("div",{staticClass:"profile__tab-menu-li-body"},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Уведомления")]),t.noticesCount?i("span",{staticClass:"profile__tab-menu-li-span"},[t._v(t._s(t.noticesCount))]):t._e()])]),i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-last"},[i("span",{staticClass:"profile__tab-menu-li-link black-arrow"},[t._v("Разместить")]),i("ul",{staticClass:"profile__tab-menu-ul-drop"},[i("router-link",{attrs:{to:{name:"ProfileAccounts"},custom:""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.navigate,r=e.isActive;return[i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",class:{choice:r},on:{click:n}},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Анкету блогера")])])]}}])}),i("router-link",{attrs:{to:{name:"ProfileProjects"},custom:""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.navigate,r=e.isActive;return[i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",class:{choice:r},on:{click:n}},[i("span",{staticClass:"profile__tab-menu-li-link"},[t._v("Рекламное предложение")])])]}}])})],1)])],1)]),t.userLoading||t.user.verifyed?t._e():i("div",{staticClass:"profile__confirmation"},[i("div",{staticClass:"profile__confirmation-row"},[t._m(0),i("div",{staticClass:"profile__confirmation-button"},[t.mailSending?i("preloader",{attrs:{height:"90"}}):i("button",{staticClass:"button-grand-black",on:{click:t.resendVerification}},[t._v(" Отправить повторно ")])],1)])]),i("br"),t.userLoading?i("preloader"):i("router-view")],1)])},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"profile__confirmation-text"},[i("p",{staticClass:"profile__confirmation-text-p"},[t._v(" Чтобы создавать заявки и получать предложения - подтвердите свою почту. Мы отправили вам сообщение на E-mail. ")]),i("p",{staticClass:"profile__confirmation-text-p secondary"},[t._v(" (Обновите страницу, если вы уже подтвердили почту) ")])])}],a=(i("d3b7"),i("ac1f"),i("5319"),i("f152")),s=i("8403"),o={name:"Profile",data:function(){return{mailSending:!1}},components:{Preloader:a["a"]},computed:{user:function(){return this.$store.getters.user},userLoading:function(){return this.$store.getters.userLoading},noticesCount:function(){return this.$store.getters.noticesPagination.total}},methods:{resendVerification:function(){var t=this;this.mailSending=!0,s["a"].resendEmailVerification().then((function(){t.$notify("Письмо с подтверждением отправлено на ваш E-mail.")})).catch((function(t){t.response&&429===t.response.status&&alert("Вы слишком часто просите переотправить вам подтверждение. Повторите попытку позже.")})).finally((function(){t.mailSending=!1}))},clearQueryParam:function(t){if(void 0!==this.$route.query[t]){var e=Object.assign({},this.$route.query);delete e[t],this.$router.replace({query:e})}}},mounted:function(){var t=this;this.$route.query["reload"]&&(this.clearQueryParam("reload"),setTimeout((function(){location.reload()}),400)),this.user?this.user.verifyed&&this.$store.dispatch("loadNotices",{page:1}):this.$onUserLoad.hook((function(){t.user.verifyed&&t.$store.dispatch("loadNotices",{page:1})}))}},l=o,c=i("2877"),u=Object(c["a"])(l,n,r,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-92cdfc32-legacy.71ea7ae9.js.map