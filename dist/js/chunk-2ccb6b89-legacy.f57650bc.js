(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ccb6b89"],{"0128":function(e,t,i){},"04a5":function(e,t,i){"use strict";i("0128")},8403:function(e,t,i){"use strict";i("96cf");var n=i("1da1"),r=i("bc3a"),a=i.n(r),s=function(){return a.a.post("email/resend")},o=function(e,t,i,n){return a.a.post("email/verify/"+String(e)+"/"+String(t),null,{params:{expires:String(i),signature:String(n)}})};t["a"]={resendEmailVerification:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()},verifyEmail:function(e,t,i,r){return Object(n["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,o(e,t,i,r);case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()}}},c66d:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"profile"},[i("div",{staticClass:"container"},[i("div",{staticClass:"profile__tab-menu"},[i("h2",{staticClass:"profile__main-title"},[e._v("Личный кабинет")]),i("ul",{staticClass:"profile__tab-menu-ul"},[i("router-link",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",attrs:{to:{name:"Profile"},"active-class":"choice",exact:!0}},[i("div",{staticClass:"profile__tab-menu-li-body"},[i("span",{staticClass:"profile__tab-menu-li-link"},[e._v("Мои данные")])])]),i("router-link",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",attrs:{to:{name:"ProfileNotices"},"active-class":"choice"}},[i("div",{staticClass:"profile__tab-menu-li-body"},[i("span",{staticClass:"profile__tab-menu-li-link"},[e._v("Уведомления")]),e.noticesCount?i("span",{staticClass:"profile__tab-menu-li-span"},[e._v(e._s(e.noticesCount))]):e._e()])]),i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-last",class:{"profile__tab-menu-ul-li-hover":e.displayProfileMenu},on:{mouseenter:e.showProfileMenu,mouseleave:e.hideProfileMenu,click:e.hideProfileMenu}},[i("span",{staticClass:"profile__tab-menu-li-link black-arrow"},[e._v("Разместить")]),i("transition",{attrs:{name:"fade"}},[e.displayProfileMenu?i("ul",{staticClass:"profile__tab-menu-ul-drop"},[i("router-link",{attrs:{to:{name:"ProfileAccounts"},custom:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.navigate,r=t.isActive;return[i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",class:{choice:r},on:{click:n}},[i("span",{staticClass:"profile__tab-menu-li-link"},[e._v("Анкету блогера")])])]}}],null,!1,4016112372)}),i("router-link",{attrs:{to:{name:"ProfileProjects"},custom:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.navigate,r=t.isActive;return[i("li",{staticClass:"profile__tab-menu-ul-li profile__tab-menu-ul-li-drop",class:{choice:r},on:{click:n}},[i("span",{staticClass:"profile__tab-menu-li-link"},[e._v("Рекламное предложение")])])]}}],null,!1,493015923)})],1):e._e()])],1)],1)]),e.userLoading||e.user.verifyed?e._e():i("div",{staticClass:"profile__confirmation"},[i("div",{staticClass:"profile__confirmation-row"},[e._m(0),i("div",{staticClass:"profile__confirmation-button"},[e.mailSending?i("preloader",{attrs:{small:""}}):i("button",{staticClass:"button-grand-black",on:{click:e.resendVerification}},[e._v(" Отправить повторно ")])],1)])]),i("br"),e.userLoading?i("preloader"):i("router-view")],1)])},r=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"profile__confirmation-text"},[i("p",{staticClass:"profile__confirmation-text-p"},[e._v(" Чтобы создавать заявки и получать предложения - подтвердите свою почту. Мы отправили вам сообщение на E-mail. ")]),i("p",{staticClass:"profile__confirmation-text-p secondary"},[e._v(" (Обновите страницу, если вы уже подтвердили почту) ")])])}],a=(i("d3b7"),i("ac1f"),i("5319"),i("f152")),s=i("8403"),o={name:"Profile",data:function(){return{mailSending:!1,displayProfileMenu:!1}},components:{Preloader:a["a"]},computed:{user:function(){return this.$store.getters.user},userLoading:function(){return this.$store.getters.userLoading},noticesCount:function(){return this.$store.getters.noticesPagination.total}},methods:{showProfileMenu:function(){var e=this;setTimeout((function(){e.displayProfileMenu=!0}),5)},hideProfileMenu:function(){this.displayProfileMenu&&(this.displayProfileMenu=!1)},resendVerification:function(){var e=this;this.mailSending=!0,s["a"].resendEmailVerification().then((function(){e.$notify("Письмо с подтверждением отправлено на ваш E-mail.")})).catch((function(e){e.response&&429===e.response.status&&alert("Вы слишком часто просите переотправить вам подтверждение. Повторите попытку позже.")})).finally((function(){e.mailSending=!1}))},clearQueryParam:function(e){if(void 0!==this.$route.query[e]){var t=Object.assign({},this.$route.query);delete t[e],this.$router.replace({query:t})}}},mounted:function(){var e=this;this.$route.query["reload"]&&(this.clearQueryParam("reload"),setTimeout((function(){location.reload()}),400)),this.user?this.user.verifyed&&this.$store.dispatch("loadNotices",{page:1}):this.$onUserLoad.hook((function(){e.user.verifyed&&e.$store.dispatch("loadNotices",{page:1})}))}},l=o,u=(i("04a5"),i("2877")),c=Object(u["a"])(l,n,r,!1,null,"43995c0b",null);t["default"]=c.exports}}]);