(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6e046b0"],{"22ff":function(e,r,t){"use strict";t.r(r);var i=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("preloader")},s=[],a=t("f152"),n=t("8403"),u={name:"Verification",components:{Preloader:a["a"]},computed:{id(){return this.$route.params["id"]},hash(){return this.$route.params["hash"]},expires(){return this.$route.query["expires"]},signature(){return this.$route.query["signature"]},user(){return this.$store.getters.user}},methods:{verify(){n["a"].verifyEmail(this.id,this.hash,this.expires,this.signature).then(()=>{this.$notify("Ваш E-mail успешно подтвержден! Обновите страницу, чтобы пользоваться сервисом.")}).catch(()=>{alert("Что-то пошло не так! :( Возможно срок действия ссылки истёк либо она была повреждена.")}).finally(()=>{this.$router.push({name:"Profile",query:{reload:"true"}})})}},mounted(){this.user?this.verify():this.$onUserLoad.hook(this.verify)}},o=u,h=t("2877"),l=Object(h["a"])(o,i,s,!1,null,null,null);r["default"]=l.exports},8403:function(e,r,t){"use strict";var i=t("bc3a"),s=t.n(i);const a=()=>s.a.post("email/resend"),n=(e,r,t,i)=>s.a.post("email/verify/"+String(e)+"/"+String(r),null,{params:{expires:String(t),signature:String(i)}});r["a"]={async resendEmailVerification(){return await a()},async verifyEmail(e,r,t,i){return await n(e,r,t,i)}}}}]);