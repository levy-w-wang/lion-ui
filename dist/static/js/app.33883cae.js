(function(e){function t(t){for(var a,r,s=t[0],i=t[1],c=t[2],l=0,f=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(t);while(f.length)f.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},o={app:0},u=[];function s(e){return i.p+"static/js/"+({}[e]||e)+"."+{"chunk-2d0e451a":"defdf65f","chunk-3a4ef55e":"fa92da61","chunk-449a4d3f":"617222ac","chunk-7828f190":"b890657c"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-3a4ef55e":1,"chunk-449a4d3f":1,"chunk-7828f190":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="static/css/"+({}[e]||e)+"."+{"chunk-2d0e451a":"31d6cfe0","chunk-3a4ef55e":"5ca6f76d","chunk-449a4d3f":"de0ad896","chunk-7828f190":"442ad0b7"}[e]+".css",o=i.p+a,u=document.getElementsByTagName("link"),s=0;s<u.length;s++){var c=u[s],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===a||l===o))return t()}var f=document.getElementsByTagName("style");for(s=0;s<f.length;s++){c=f[s],l=c.getAttribute("data-href");if(l===a||l===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=a,delete r[e],d.parentNode.removeChild(d),n(u)},d.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var u=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=u);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(e);var f=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",f.name="ChunkLoadError",f.type=a,f.request=r,n[1](f)}o[e]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var f=0;f<c.length;f++)t(c[f]);var d=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("85ec"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"getMenu",(function(){return $}));var r={};n.r(r),n.d(r,"login",(function(){return on})),n.d(r,"test",(function(){return un}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:e.$route.meta.title+" - lion",expression:'$route.meta.title + " - lion"'}]})],1)},s=[],i={name:"app",data:function(){return{}}},c=i,l=(n("034f"),n("2877")),f=Object(l["a"])(c,u,s,!1,null,null,null),d=f.exports,p=(n("99af"),n("c975"),n("d3b7"),n("ac1f"),n("5319"),n("96cf"),n("1da1")),m=n("8c4f"),g=n("9ed6"),h=n("2f62"),b={state:{userInfo:null,token:null,hiteMessage:[{id:1,title:"测试提示信息",message:"测试信息主体",time:"2020-08-15",url:"#"},{id:2,title:"长标题测试长标题测试长标题测试长标题测试长标题测试长标题测试",message:"测试信息主体",time:"2020-08-15",url:"#"}],showHiteMessage:!1},getters:{userInfo:function(e){if(null==e.userInfo){var t=sessionStorage.getItem("user");if(null!=t)e.userInfo=JSON.parse(t);else{var n=localStorage.getItem("user");null!=n&&(e.userInfo=JSON.parse(n))}}return e.userInfo},token:function(e){if(null==e.token){var t=sessionStorage.getItem("token");if(null!=t)e.token=t;else{var n=localStorage.getItem("token");e.token=n}}return e.token}},mutations:{setToken:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];n?localStorage.setItem("token",t):sessionStorage.setItem("token",t)},setUserInfo:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e.userInfo=t,e.token=t.token,n?localStorage.setItem("user",JSON.stringify(t)):sessionStorage.setItem("user",JSON.stringify(t)),this.commit("setToken",t.token,n)},logout:function(e){localStorage.clear(),sessionStorage.clear(),e.userInfo=null,e.token=null,F(),R.push({path:"/login",query:{redirect:"/"}})},toggleShowHiteMessage:function(e){e.showHiteMessage=!e.showHiteMessage,console.log(e.showHiteMessage)}},actions:{}},v=(n("0fb7"),n("450d"),n("f529")),y=n.n(v),k=n("bc3a"),w=n.n(k),S=n("4328"),C=n.n(S),x="",T={method:"get",baseURL:x,headers:{"Content-Type":"application/json;charset=UTF-8"},data:{},timeout:1e4,responseType:"json"};w.a.defaults.timeout=T.timeout,w.a.defaults.headers=T.headers,w.a.defaults.baseURL=T.baseURL,w.a.interceptors.request.use((function(e){if("post"==e.method||"put"==e.method)e.data=JSON.stringify(e.data);else if("get"==e.method){var t=e.url.indexOf("?")>=0?"&":"?";e.url+=t+"_="+Date.now(),e.data=C.a.stringify(e.data)}return e}),(function(e){return Promise.resolve(e)})),w.a.interceptors.response.use((function(e){if(e&&e.data&&e.data.success&&e.data.data&&e.data.code,e.data)switch(e.data.code){case 401:y.a.error("登录已失效，请重新登录"),setTimeout((function(){R.replace({path:"/login",query:{redirect:R.currentRoute.fullPath}})}),1500);break;case 402:return y.a.error("无权限操作"),new Promise((function(){}))}return e}),(function(e){var t="";if(e&&e.response)switch(e.response.status){case 400:t="请求错误";break;case 401:t="未授权，请登录";break;case 403:t="拒绝访问";break;case 404:t="请求发生错误";break;case 408:t="请求超时";break;case 500:t="服务器内部错误";break;case 501:t="服务未实现";break;case 502:t="网关错误";break;case 503:t="服务不可用";break;case 504:t="网关超时";break;case 505:t="HTTP版本不受支持";break;default:t="服务器开小差了，请稍后再试"}return y.a.error(t),new Promise((function(){}))}));var O={Get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){w.a.get(e,{params:t}).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))},Post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){w.a.post(e,t).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))},Delete:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){w.a.delete(e,t).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))},Put:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){w.a.put(e,t).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))}},$=function(e){return"user"==e?O.Get("api/usermenu"):O.Get("api/menu")},P={state:{isCollapse:!1,mainTabs:[],mainTabsActiveName:"",themeColor:"#545c64",menuTree:[],menuLoad:!1},getters:{isCollapse:function(e){return e.isCollapse},menuLoad:function(e){return e.menuLoad}},mutations:{toggleCollapse:function(e){e.isCollapse=!e.isCollapse},updateMainTabs:function(e,t){e.mainTabs=t},updateMainTabsActiveName:function(e,t){e.mainTabsActiveName=t},setThemeColor:function(e,t){e.themeColor=t},setMenuLoad:function(e,t){e.menuLoad=t},setMenuTree:function(e,t){e.menuTree=t},resetMenu:function(e){e.menuTree=[],e.mainTabs=[],e.menuLoad=!1,e.isCollapse=!1,e.mainTabsActiveName="",e.themeColor="#545c64"}},actions:{getMenuTree:function(e,t){var n=e.commit;return new Promise((function(e,a){$(t).then((function(t){200===t.code&&(t.success&&n("setMenuTree",t.data),e(t.data))})).catch((function(e){a(e)}))}))}}};o["default"].use(h["a"]);var _=new h["a"].Store({modules:{user:b,app:P}}),j=_;o["default"].use(m["a"]);var I=m["a"].prototype.push;m["a"].prototype.push=function(e){return I.call(this,e).catch((function(e){return e}))};var N=[{path:"/",name:"home",component:function(){return n.e("chunk-7828f190").then(n.bind(null,"c1f7"))},children:[{path:"",name:"index",component:function(){return n.e("chunk-2d0e451a").then(n.bind(null,"905b"))},meta:{title:"首页",index:0}}]},{path:"/login",name:"login",component:g["default"],meta:{title:"登录"}},{path:"/notfound",name:"notfound",component:function(){return n.e("chunk-449a4d3f").then(n.bind(null,"34b7"))},meta:{title:"未找到"}}],M=function(){return new m["a"]({routes:N})},L=M();function F(){var e=M();L.matcher=e.matcher}var z=["/login","/notfound"];function E(e){if(j.state.app.menuRouteLoaded)console.log("已加载菜单和路由.");else{var t=A(e);L.options.routes[0].children=L.options.routes[0].children.concat(t),L.addRoutes(L.options.routes),j.commit("setMenuLoad",!0)}}function A(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=[],r=0;r<e.length;r++)if(e[r].children&&e[r].children.length>=1)a=a.concat(e[r].children);else if(e[r].url&&/\S/.test(e[r].url)){e[r].url=e[r].url.replace(/^\//,"");var o={path:e[r].url,component:null,name:e[r].menuName,meta:{title:e[r].menuName,icon:e[r].icon,index:e[r].menuId}};try{(function(){var t=e[r].url;o["component"]=function(e){return n.e("chunk-3a4ef55e").then(function(){var a=[n("4b3b")("./".concat(t))];e.apply(null,a)}.bind(this)).catch(n.oe)}})()}catch(u){}t.push(o)}return a.length>=1&&A(a,t),t}L.beforeEach(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t,n,a){var r,o,u,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=j.getters.userInfo,o=j.getters.token,u=null!==r&&null!==o&&void 0!==r&&void 0!==o,"/login"!=t.path){e.next=7;break}u?a({path:"/"}):a(),e.next=23;break;case 7:if(u){e.next=11;break}-1!==z.indexOf(t.path)?a():a({path:"/login",query:{redirect:t.fullPath}}),e.next=23;break;case 11:if(!j.state.app.menuLoad){e.next=16;break}return a(),e.abrupt("return");case 16:return console.log(r.username),e.next=19,j.dispatch("getMenuTree",r.username);case 19:s=e.sent,console.log(s),E(s),a();case 23:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()),L.onReady((function(){var e=[{path:"*",redirect:"/notfound",name:"notfound",component:function(){return n.e("chunk-449a4d3f").then(n.bind(null,"34b7"))},meta:{title:"未找到"}}];L.options.routes=L.options.routes.concat(e),L.addRoutes(L.options.routes)}));var R=L,q=(n("46a1"),n("e5f2")),H=n.n(q),J=(n("9e1f"),n("6ed5")),U=n.n(J),B=(n("be4f"),n("896a")),D=n.n(B),G=(n("f92a"),n("d775")),K=n.n(G),V=(n("acb6"),n("c673")),Q=n.n(V),W=(n("e3ea"),n("7bc3")),X=n.n(W),Y=(n("fd71"),n("a447")),Z=n.n(Y),ee=(n("bdc7"),n("aa2f")),te=n.n(ee),ne=(n("de31"),n("c69e")),ae=n.n(ne),re=(n("a673"),n("7b31")),oe=n.n(re),ue=(n("adec"),n("3d2d")),se=n.n(ue),ie=(n("6762"),n("dd3d")),ce=n.n(ie),le=(n("a586"),n("7464")),fe=n.n(le),de=(n("b8e0"),n("a4c4")),pe=n.n(de),me=(n("6b30"),n("c284")),ge=n.n(me),he=(n("aaa5"),n("a578")),be=n.n(he),ve=(n("b5c2"),n("20cf")),ye=n.n(ve),ke=(n("915d"),n("e04d")),we=n.n(ke),Se=(n("5e32"),n("6721")),Ce=n.n(Se),xe=(n("cbb5"),n("8bbc")),Te=n.n(xe),Oe=(n("e612"),n("dd87")),$e=n.n(Oe),Pe=(n("075a"),n("72aa")),_e=n.n(Pe),je=(n("eca7"),n("3787")),Ie=n.n(je),Ne=(n("425f"),n("4105")),Me=n.n(Ne),Le=(n("b84d"),n("c216")),Fe=n.n(Le),ze=(n("8f24"),n("76b9")),Ee=n.n(ze),Ae=(n("0c67"),n("299c")),Re=n.n(Ae),qe=(n("06f1"),n("6ac9")),He=n.n(qe),Je=(n("4ffc"),n("946e")),Ue=n.n(Je),Be=(n("d624"),n("3e9c")),De=n.n(Be),Ge=(n("826b"),n("c263")),Ke=n.n(Ge),Ve=(n("5466"),n("ecdf")),Qe=n.n(Ve),We=(n("38a0"),n("ad41")),Xe=n.n(We),Ye=(n("ae26"),n("845f")),Ze=n.n(Ye),et=(n("1951"),n("eedf")),tt=n.n(et),nt=(n("016f"),n("486c")),at=n.n(nt),rt=(n("6611"),n("e772")),ot=n.n(rt),ut=(n("1f1a"),n("4e4b")),st=n.n(ut),it=(n("e960"),n("b35b")),ct=n.n(it),lt=(n("d4df"),n("7fc1")),ft=n.n(lt),dt=(n("c526"),n("1599")),pt=n.n(dt),mt=(n("560b"),n("dcdc")),gt=n.n(mt),ht=(n("3c52"),n("0d7b")),bt=n.n(ht),vt=(n("fe07"),n("6ac5")),yt=n.n(vt),kt=(n("b5d8"),n("f494")),wt=n.n(kt),St=(n("9d4c"),n("e450")),Ct=n.n(St),xt=(n("10cb"),n("f3ad")),Tt=n.n(xt),Ot=(n("34db"),n("3803")),$t=n.n(Ot),Pt=(n("8bd8"),n("4cb2")),_t=n.n(Pt),jt=(n("ce18"),n("f58e")),It=n.n(jt),Nt=(n("4ca3"),n("443e")),Mt=n.n(Nt),Lt=(n("bd49"),n("18ff")),Ft=n.n(Lt),zt=(n("960d"),n("defb")),Et=n.n(zt),At=(n("cb70"),n("b370")),Rt=n.n(At),qt=(n("3db2"),n("58b8")),Ht=n.n(qt),Jt=(n("a7cc"),n("df33")),Ut=n.n(Jt),Bt=(n("f4f9"),n("c2cc")),Dt=n.n(Bt),Gt=(n("7a0f"),n("0f6c")),Kt=n.n(Gt),Vt=(n("a769"),n("5cc3")),Qt=n.n(Vt),Wt=(n("672e"),n("101e")),Xt=n.n(Wt),Yt=(n("0fb4"),n("9944")),Zt=n.n(Yt),en=(n("e2f3"),n("06f9")),tn=n.n(en),nn=(n("2986"),n("14e9")),an=n.n(nn);o["default"].use(an.a),o["default"].use(tn.a),o["default"].use(Zt.a),o["default"].use(Xt.a),o["default"].use(Qt.a),o["default"].use(Kt.a),o["default"].use(Dt.a),o["default"].use(Ut.a),o["default"].use(Ht.a),o["default"].use(Rt.a),o["default"].use(Et.a),o["default"].use(Ft.a),o["default"].use(Mt.a),o["default"].use(It.a),o["default"].use(_t.a),o["default"].use($t.a),o["default"].use(Tt.a),o["default"].use(Ct.a),o["default"].use(wt.a),o["default"].use(yt.a),o["default"].use(bt.a),o["default"].use(gt.a),o["default"].use(pt.a),o["default"].use(ft.a),o["default"].use(ct.a),o["default"].use(st.a),o["default"].use(ot.a),o["default"].use(at.a),o["default"].use(tt.a),o["default"].use(Ze.a),o["default"].use(Xe.a),o["default"].use(Qe.a),o["default"].use(Ke.a),o["default"].use(De.a),o["default"].use(Ue.a),o["default"].use(He.a),o["default"].use(Re.a),o["default"].use(Ee.a),o["default"].use(Fe.a),o["default"].use(Me.a),o["default"].use(Ie.a),o["default"].use(_e.a),o["default"].use($e.a),o["default"].use(Te.a),o["default"].use(Ce.a),o["default"].use(we.a),o["default"].use(ye.a),o["default"].use(be.a),o["default"].use(ge.a),o["default"].use(pe.a),o["default"].use(fe.a),o["default"].use(ce.a),o["default"].use(se.a),o["default"].use(oe.a),o["default"].use(ae.a),o["default"].use(te.a),o["default"].use(Z.a),o["default"].use(X.a),o["default"].use(Q.a),o["default"].use(K.a),o["default"].use(D.a.directive),o["default"].prototype.$loading=D.a.service,o["default"].prototype.$msgbox=U.a,o["default"].prototype.$alert=U.a.alert,o["default"].prototype.$confirm=U.a.confirm,o["default"].prototype.$prompt=U.a.prompt,o["default"].prototype.$notify=H.a,o["default"].prototype.$message=y.a;var rn=n("5530"),on=function(e){return O.Post("/login",e)},un=function(){return O.Get("/test")},sn=Object(rn["a"])(Object(rn["a"])({},r),a),cn=(n("b19f"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"public-pagination"},[n("div",{staticClass:"operation"},[e._t("default")],2),n("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,total:e.total,"page-sizes":e.pageSizes,layout:"total, sizes, prev, pager, next, jumper",background:e.background},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)}),ln=[],fn=(n("a9e3"),{props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},background:{type:Boolean,default:!0}},data:function(){return{}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination")},handleCurrentChange:function(e){this.$emit("pagination")}}}),dn=fn,pn=Object(l["a"])(dn,cn,ln,!1,null,"1674fda8",null),mn=pn.exports,gn=n("7876"),hn=n.n(gn);o["default"].use(hn.a),o["default"].component("pagination-footer",mn),o["default"].config.productionTip=!1,o["default"].prototype.$api=sn,new o["default"]({router:R,store:j,render:function(e){return e(d)}}).$mount("#app")},"85ec":function(e,t,n){},"8d7b":function(e,t,n){},"9ed6":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loginContain"},[n("div",{staticClass:"loginBox"},[e._m(0),n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginFormRules,"label-position":"left","label-width":"0px"}},[n("el-form-item",{attrs:{prop:"username"}},[n("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"请输入账号"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}},[n("i",{staticClass:"el-input__icon el-icon-user-solid",attrs:{slot:"prefix"},slot:"prefix"})])],1),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"密码"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}},[n("i",{staticClass:"el-input__icon el-icon-lock",attrs:{slot:"prefix"},slot:"prefix"})])],1),n("el-form-item",{staticStyle:{width:"100%"}},[n("el-button",{staticStyle:{width:"100%",background:"#19b9e7"},attrs:{type:"primary",loading:e.logining},nativeOn:{click:function(t){return t.preventDefault(),e.login(t)}}},[e._v("登 录")])],1)],1)],1)])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h2",{staticClass:"loginH2"},[n("strong",[e._v("Vue")]),e._v(" 后台管理系统")])}],o={data:function(){return{logining:!1,loginForm:{username:"admin",password:"123456"},notifyObj:null,loginFormRules:{username:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},components:{},methods:{login:function(){var e=this;this.logining=!0;var t={username:this.loginForm.username,password:this.loginForm.password};this.$api.login(t).then((function(t){if(t.success){e.$store.commit("setUserInfo",t.data),e.$message({type:"success",message:"登录成功",duration:800});var n="/";void 0!==e.$route.query.redirect&&(n=e.$route.query.redirect),setTimeout((function(){e.logining=!1,e.$router.push(n),e.notifyObj&&e.notifyObj.close(),e.notifyObj=null}),800)}else e.logining=!1,e.$message({type:"error",message:"账号或密码错误"})}))}},computed:{},created:function(){""!=this.$store.state.app.mainTabsActiveName&&window.location.reload()},mounted:function(){this.notifyObj=this.$notify({title:"提示",message:"管理员，账号分别为：admin,用户账号：user,密码均为：123456",duration:4e3,iconClass:"el-icon-s-opportunity"})}},u=o,s=(n("c9c9"),n("2877")),i=Object(s["a"])(u,a,r,!1,null,"66250bc3",null);t["default"]=i.exports},b19f:function(e,t,n){},c9c9:function(e,t,n){"use strict";var a=n("8d7b"),r=n.n(a);r.a}});