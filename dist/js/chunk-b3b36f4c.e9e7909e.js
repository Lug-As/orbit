(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b3b36f4c"],{"25c7":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"profile__offer profile__questionnaire profile__contant tab-4"},[!e.userLoading&&e.user.verifyed?s("div",{staticClass:"profile__offer-row profile__questionnaire-row"},[s("div",{staticClass:"profile__questionnaire-create"},[s("button",{staticClass:"profile__questionnaire-create-button button-grand-black",on:{click:e.toggleCreateMode}},[s("span",{staticClass:"big_char",class:{"big_char-cross":e.createMode}},[e._v("+")]),e.createMode?[e._v(" Закрыть форму ")]:[e._v(" Добавить предложение ")]],2)]),s("transition",{attrs:{name:"slide-up-down"}},[e.createMode?s("project-form",{on:{submit:e.createProject}}):e._e()],1),s("div",{staticClass:"profile__questionnaire-accounts"},[s("div",{staticClass:" profile__questionnaire-accounts-row"},[e._m(0),e.projectLoading?s("preloader"):e.userProjects&&e.userProjects.length?s("div",{staticClass:"offers__project-list"},e._l(e.userProjects,(function(t){return s("div",{staticClass:"offers__proposal-body"},[s("div",{staticClass:"offers__proposal-body-title"},[s("div",{staticClass:"offers__title-info"},[s("router-link",{attrs:{to:{name:"Project",params:{id:t.id}},custom:""},scopedSlots:e._u([{key:"default",fn:function(i){var r=i.navigate;return[s("h2",{staticClass:"offers__info-text cursor",on:{click:r}},[e._v(e._s(t.name))])]}}],null,!0)})],1),s("div",{staticClass:"offers__title-price price-info"},[s("p",{staticClass:"offers__price-text "},[e._v("Желаемый бюджет:")]),s("span",{staticClass:"offers__price-value"},[e._v(e._s(t.budget.toLocaleString())+" ₽")])])]),s("div",{staticClass:"offers__proposal-item details"},[s("div",{staticClass:"offers__proposal-item-info"},[s("p",{staticClass:"offers__details-text"},[e._v(" "+e._s(e._f("cut")(t.text))+" ")])])]),s("div",{staticClass:"offers__proposal-item region"},[s("div",{staticClass:"offers__proposal-item-info justify-item"},[s("div",{staticClass:"offers__proposal-item-button"},[s("div",{staticClass:"offers__proposal-item-button-row"},[s("div",{staticClass:"offers__title-price price-button"},[s("p",{staticClass:"offers__price-text"},[e._v("Желаемый бюджет:")]),s("span",{staticClass:"offers__price-value"},[e._v(e._s(t.budget.toLocaleString())+" ₽")])])]),s("div",{staticClass:"offers__item-button"},[s("button",{staticClass:"button-grand-black big",on:{click:function(s){return e.deleteProject(t.id)}}},[e._v(" Удалить предложение ")])])])])])])})),0):[s("p",{staticClass:"empty-result-text"},[e._v("У вас пока нет опубликованных рекламных предложений")])],s("div",{staticClass:"objects-pagination"},[s("pagination",{attrs:{data:e.userProjectsPagination,limit:2},on:{"pagination-change-page":e.changePage}})],1)],2)])],1):e._e()])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"profile__questionnaire-accounts-row-title"},[s("h2",{staticClass:"profile__offer-accounts-row-title-h2 profile__questionnaire-accounts-row-title-h2"},[e._v(" Актуальные предложения работы ")])])}],a=(s("5319"),s("f152")),o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"profile__questionnaire-body"},[s("div",{staticClass:"profile__offer-body-row profile__questionnaire-body-row"},[e._m(0),s("div",{staticClass:"profile__offer-item profile__questionnaire-item"},[s("div",{staticClass:"profile__questionnaire-item-info"},[e._m(1),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],staticClass:"profile__questionnaire-item-info-input",attrs:{type:"text"},domProps:{value:e.name},on:{blur:[e.$v.name.$touch,function(t){return e.$forceUpdate()}],input:function(t){t.target.composing||(e.name=t.target.value.trim())}}}),e.$v.name.$error?s("p",{staticClass:"red account_form__error"},[e.$v.name.required?e._e():[e._v(" Поле обязательно для заполнения ")],e.$v.name.maxLength?e._e():[e._v(" Длина названия не должна превышать "+e._s(e.$v.name.$params.maxLength.max)+" символов ")]],2):e._e()]),s("div",{staticClass:"profile__questionnaire-item-info"},[e._m(2),s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.text,expression:"text",modifiers:{trim:!0}}],staticClass:"profile__questionnaire-item-info-textarea",domProps:{value:e.text},on:{blur:[e.$v.text.$touch,function(t){return e.$forceUpdate()}],input:function(t){t.target.composing||(e.text=t.target.value.trim())}}}),e.$v.text.$error?s("p",{staticClass:"red account_form__error"},[e.$v.text.required?e._e():[e._v(" Поле обязательно для заполнения ")],e.$v.text.maxLength?e._e():[e._v(" Длина описания не должна превышать "+e._s(e.$v.text.$params.maxLength.max)+" символов ")]],2):e._e()]),s("div",{staticClass:"profile__questionnaire-item-info"},[e._m(3),s("input",{directives:[{name:"model",rawName:"v-model.number",value:e.budget,expression:"budget",modifiers:{number:!0}}],staticClass:"profile__questionnaire-item-info-input",attrs:{type:"text"},domProps:{value:e.budget},on:{keydown:e.resolveInputKeys,blur:[e.$v.budget.$touch,function(t){return e.$forceUpdate()}],input:function(t){t.target.composing||(e.budget=e._n(t.target.value))}}}),e.$v.budget.$error?s("p",{staticClass:"red account_form__error"},[e.$v.budget.required?e._e():[e._v(" Поле обязательно для заполнения ")],e.$v.budget.minValue?e._e():[e._v(" Бюджет должен быть больше 0 ")],e.$v.budget.maxValue?e._e():[e._v(" Бюджет должен быть меньше "+e._s((e.$v.budget.$params.maxValue.max+1).toLocaleString())+" ")]],2):e._e()]),s("div",{staticClass:"profile__questionnaire-item-info"},[s("h2",{staticClass:"profile__questionnaire-item-info-h2"},[e._v("Вид рекламы")]),s("v-select",{staticClass:"main__vue-select ac-proj-form__select",attrs:{label:"name",options:e.allTypes,reduce:function(e){return e.id},multiple:""},model:{value:e.ad_types,callback:function(t){e.ad_types=t},expression:"ad_types"}})],1),s("div",{staticClass:"profile__questionnaire-item-info"},[s("h2",{staticClass:"profile__questionnaire-item-info-h2"},[e._v(" Регион ")]),s("v-select",{staticClass:"main__vue-select main__vue-select--region ac-proj-form__select",attrs:{label:"name",options:e.allRegions,reduce:function(e){return e.id},selectable:function(e){return!e.hasOwnProperty("group")}},scopedSlots:e._u([{key:"option",fn:function(t){var i=t.group,r=t.name;return[i?s("div",{staticClass:"group"},[e._v(" "+e._s(i)+" ")]):[e._v(" "+e._s(r)+" ")]]}}]),model:{value:e.region,callback:function(t){e.region=t},expression:"region"}}),s("span",{staticClass:"profile__offer-item-info-span"},[e._v("Заполните поле, если ваша реклама привязана к региону.")])],1),s("div",{staticClass:"profile__questionnaire-item-info"},[s("h2",{staticClass:"profile__questionnaire-item-info-h2"},[e._v(" Желаемая аудитория ")]),s("div",{staticClass:"main__details-from-to"},[s("div",{staticClass:"main__details-from"},[s("p",{staticClass:"main__details-text"},[e._v("от")]),s("div",{staticClass:"main__details-input"},[s("input",{directives:[{name:"model",rawName:"v-model.number",value:e.followers_from,expression:"followers_from",modifiers:{number:!0}}],staticClass:"profile__details-input-small main__details-input-small",domProps:{value:e.followers_from},on:{keydown:e.resolveInputKeys,input:function(t){t.target.composing||(e.followers_from=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),s("div",{staticClass:"main__details-to"},[s("p",{staticClass:"main__details-text"},[e._v("до")]),s("div",{staticClass:"main__details-input"},[s("input",{directives:[{name:"model",rawName:"v-model.number",value:e.followers_to,expression:"followers_to",modifiers:{number:!0}}],staticClass:"profile__details-input-small main__details-input-small",domProps:{value:e.followers_to},on:{keydown:e.resolveInputKeys,input:function(t){t.target.composing||(e.followers_to=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})]),s("p",{staticClass:"profile__offer-deteilds-text main__details-text"},[e._v("Подписчиков")])])]),s("span",{staticClass:"profile__offer-item-info-span"},[e._v("Заполните поле, если вы знаете сколько должно быть подписчиков у блогера.")])]),s("div",{staticClass:"profile__offer-item-button-create profile__questionnaire-item-button-create"},[e._m(4),s("button",{staticClass:"profile__offer-item-button profile__questionnaire-item-button button-grand-black",attrs:{disabled:this.$v.$invalid},on:{click:e.submit}},[e._v(" Создать предложение ")]),s("span",{staticClass:"profile__offer-item-info-span"},[e._v(" Внимание! Все предложения модерируются. Если предложение не соответствует нашим правилам, администраторы вправе удалить предложение. ")])])])])])},n=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"profile__offer-body-avatar"},[i("picture",[i("source",{attrs:{srcset:s("44f6"),type:"image/webp"}}),i("img",{attrs:{src:s("f31a"),alt:""}})])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("h2",{staticClass:"profile__questionnaire-item-info-h2"},[e._v(" Заголовок предложения "),s("span",{staticClass:"red"},[e._v("*")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("h2",{staticClass:"profile__questionnaire-item-info-h2"},[e._v(" Описание предложения "),s("span",{staticClass:"red"},[e._v("*")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("h2",{staticClass:"profile__questionnaire-item-info-h2"},[e._v(" Бюджет "),s("span",{staticClass:"secondary"},[e._v("(в руб.)")]),s("span",{staticClass:"red"},[e._v("*")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("span",{staticClass:"red"},[e._v("*")]),e._v(" Обязательные поля")])}],l=s("b5ae"),c={name:"ProjectForm",data:()=>({name:null,text:null,budget:null,followers_from:null,followers_to:null,ad_types:[],region:null}),computed:{allTypes(){return this.$store.getters.types},allRegions(){return this.$store.getters.regions}},methods:{submit(){if(this.validate()){const e={name:this.name,text:this.text,budget:this.budget,followers_from:this.followers_from,followers_to:this.followers_to,ad_types:this.ad_types,region_id:this.region};this.$emit("submit",e)}},validate(){return this.$v.$touch(),!this.$v.$invalid},resolveInputKeys(e){const t=[8,46,37,38,39,40,116,13];if(!t.includes(e.keyCode)){const t=e.key;Number.isInteger(parseInt(t))||(e.returnValue=!1,e.preventDefault&&e.preventDefault())}}},validations:{name:{required:l["required"],maxLength:Object(l["maxLength"])(250)},text:{required:l["required"],maxLength:Object(l["maxLength"])(3e3)},budget:{required:l["required"],integer:l["integer"],maxValue:Object(l["maxValue"])(999999),minValue:Object(l["minValue"])(1)}},mounted(){this.$store.dispatch("loadTypes"),this.$store.dispatch("loadRegions")}},u=c,_=s("2877"),f=Object(_["a"])(u,o,n,!1,null,"5f09f6c3",null),p=f.exports,d={name:"ProfileProjects",data:()=>({createMode:!1}),title:"Мои рекламные предложения",components:{ProjectForm:p,Preloader:a["a"]},computed:{user(){return this.$store.getters.user},userLoading(){return this.$store.getters.userLoading},userProjects(){return this.$store.getters.userProjects},userProjectsPagination(){return this.$store.getters.userProjectsPagination},projectLoading(){return this.$store.getters.projectLoading},page(){let e;return this.$route.query["page"]?(e=Math.abs(parseInt(this.$route.query["page"])),1===e&&this.clearQueryParam("page")):e=1,0!==e&&Number.isInteger(e)||(e=1),e}},methods:{toggleCreateMode(){this.createMode=!this.createMode},loadUserProjects(){this.$store.dispatch("loadUserProjects",{page:this.page})},createProject(e){this.$store.dispatch("createProject",e).then(()=>{this.toggleCreateMode(),this.changePage()||(this.scrollToTop(390),this.loadUserProjects())}).catch(()=>{alert("Произошла ошибка отправки формы. Повторите позже.")})},deleteProject(e){confirm("Вы точно хотите удалить рекламное предложение? Восстановить его будет невозможно.")&&this.$store.dispatch("deleteProject",e)},clearQueryParam(e){if(void 0!==this.$route.query[e]){let t=Object.assign({},this.$route.query);delete t[e],this.$router.replace({query:t})}},changePage(e=1){return e!==this.page&&(this.scrollToTop(300),this.$router.push({name:this.$route.name,query:{page:e}}).then(()=>this.loadUserProjects()),!0)},scrollToTop(e=0){window.scrollTo({top:e,behavior:"smooth"})},starterFunction(){this.user.verifyed&&(this.userProjects.length&&this.page===this.userProjectsPagination.current_page||this.loadUserProjects())}},mounted(){this.user?this.starterFunction():this.$onUserLoad.hook(this.starterFunction)}},m=d,v=Object(_["a"])(m,i,r,!1,null,null,null);t["default"]=v.exports},"44f6":function(e,t,s){e.exports=s.p+"img/cosmonavt.66e6ba9d.webp"},f31a:function(e,t,s){e.exports=s.p+"img/cosmonavt.2b419bdd.png"}}]);
//# sourceMappingURL=chunk-b3b36f4c.e9e7909e.js.map