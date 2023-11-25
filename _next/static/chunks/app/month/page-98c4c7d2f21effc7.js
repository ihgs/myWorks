(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[602],{9331:function(e,t,r){Promise.resolve().then(r.bind(r,8988))},2653:function(e,t,r){"use strict";r.d(t,{Z:function(){return w}});var i=r(7437),n=r(3457),a=r(6507),l=r(5770),o=r(9050),s=r(5133),d=r(5884),c=r(2265),h=r(1865),u=r(6002),v=r(5883),m=r(4384),x=r(7924),p=r(7775);let f=(0,x.default)();function g(e){let t,{work:r,clickSave:s}=e,d=(0,c.useContext)(u.X),[x,p]=(0,v.FV)(m.j);d&&(t=d.resolve("recorder"));let{control:f,handleSubmit:g}=(0,h.cI)({defaultValues:{start:"",end:"",item:"",type:"",comment:"",...r}}),y={time:{required:"時間を入力してください",pattern:{value:/\d\d:\d\d/,message:"00:00 形式で入力してください。"}},item:{required:"項目を入力してください"}},w=async e=>{let r=await t.save(e),i=x.map(t=>t.id===e.id?r:t);s(r),p(i)};return(0,i.jsxs)(n.Z,{component:"form",spacing:1.5,onSubmit:g(w),children:[(0,i.jsxs)(a.Z,{children:[(0,i.jsx)(h.Qr,{name:"start",control:f,rules:y.time,render:e=>{var t;let{field:r,fieldState:n}=e;return(0,i.jsx)(l.Z,{...r,sx:{mr:1},type:"text",label:"start",error:n.invalid,helperText:null===(t=n.error)||void 0===t?void 0:t.message,variant:"standard"})}}),(0,i.jsx)(h.Qr,{name:"end",control:f,rules:y.time,render:e=>{var t;let{field:r,fieldState:n}=e;return(0,i.jsx)(l.Z,{...r,sx:{mr:1},type:"text",label:"end",error:n.invalid,helperText:null===(t=n.error)||void 0===t?void 0:t.message,variant:"standard"})}}),(0,i.jsx)(h.Qr,{name:"item",control:f,rules:y.item,render:e=>{var t;let{field:r,fieldState:n}=e;return(0,i.jsx)(l.Z,{...r,sx:{mr:1},type:"item",label:"item",error:n.invalid,helperText:null===(t=n.error)||void 0===t?void 0:t.message,variant:"standard"})}}),(0,i.jsx)(h.Qr,{name:"type",control:f,render:e=>{var t;let{field:r,fieldState:n}=e;return(0,i.jsx)(l.Z,{...r,sx:{mr:1},type:"type",label:"type",error:n.invalid,helperText:null===(t=n.error)||void 0===t?void 0:t.message,variant:"standard"})}})]}),(0,i.jsx)(h.Qr,{name:"comment",control:f,render:e=>{var t;let{field:r,fieldState:n}=e;return(0,i.jsx)(l.Z,{...r,type:"text",label:"comment",error:n.invalid,helperText:null===(t=n.error)||void 0===t?void 0:t.message,multiline:!0,minRows:3})}}),(0,i.jsx)(o.Z,{type:"submit",variant:"contained",name:"save",children:"Save"})]})}function y(e){var t;let{work:r,clickEdit:n,onlyDisplay:l}=e,[h,u]=(0,c.useState)(!1);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(d.Z,{container:!0,alignItems:"center",columnSpacing:1,sx:{wordWrap:"break-word"},children:[(0,i.jsxs)(d.Z,{xs:2,children:[r.start," ~ ",r.end]}),(0,i.jsxs)(d.Z,{xs:4,children:[r.item," "]}),(0,i.jsxs)(d.Z,{xs:4,children:[r.type," "]}),(0,i.jsx)(d.Z,{xs:2,spacing:2,children:(0,i.jsxs)(a.Z,{display:"flex",justifyContent:"flex-end",children:[(0,i.jsx)(o.Z,{sx:{m:1},variant:"outlined",onClick:()=>{u(!h)},children:h?"Hidden":"Show"}),!l&&(0,i.jsx)(o.Z,{sx:{m:1},variant:"contained",onClick:()=>n(r),children:"Edit"})]})})]}),h&&(0,i.jsx)(d.Z,{container:!0,children:(0,i.jsx)(d.Z,{xs:12,children:(0,i.jsx)(s.Z,{variant:"outlined",sx:{paddingX:2},children:(0,p.ZP)(f.convert(null!==(t=r.comment)&&void 0!==t?t:"").toString())})})})]})}function w(e){let{work:t,edit:r=!1,onlyDisplay:n=!1}=e,[a,l]=(0,c.useState)(t),[o,s]=(0,c.useState)(r);return(0,c.useEffect)(()=>{l({...t})},[]),(0,i.jsx)(i.Fragment,{children:o?(0,i.jsx)(g,{work:a,clickSave:e=>{l(e),s(!1)}}):(0,i.jsx)(y,{work:a,clickEdit:()=>s(!0),onlyDisplay:n})})}},4384:function(e,t,r){"use strict";r.d(t,{j:function(){return n}});var i=r(5883);let n=(0,i.cn)({key:"workListState",default:[]})},6002:function(e,t,r){"use strict";r.d(t,{X:function(){return n}});var i=r(2265);let n=(0,i.createContext)(void 0)},1621:function(e,t,r){"use strict";r.d(t,{$:function(){return l}});var i=r(7868);class n extends i.ZP{constructor(){super("myWorks"),this.version(1).stores({works:"++id, year, month"})}}let a=new n;class l{async save(e){if(void 0!=e.id&&!(e.id<=-1))return await this.update(e);{delete e.id,e.version=1;let t=await a.works.add(e);return{id:t,...e}}}async update(e){if(void 0==e.version||void 0==e.id)throw Error("Invalid data");let t=await a.works.get(e.id);if((null==t?void 0:t.version)!==e.version)throw Error("Data is old.");return e.version=e.version+1,await a.works.update(e.id,e),{...e}}async listByDay(e,t,r){return await a.works.where({year:e,month:t,day:r}).sortBy("start")}async listByMonth(e,t){return await a.works.where({year:e,month:t}).sortBy("day")}}},8988:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return _}});var i=r(7437),n=r(2265),a=r(4124),l=r(9337),o=r(4548),s=r.n(o),d=r(2750);let c=s()();function h(e){let{year:t=c.year(),month:r=c.month()+1,onChange:n}=e;return(0,i.jsx)(a._,{dateAdapter:d.y,adapterLocale:"ja",children:(0,i.jsx)(l.$,{openTo:"month",defaultValue:s()().year(t).month(r-1),format:"YYYY/MM",views:["year","month"],onChange:e=>{n({year:e.year(),month:e.month()+1})}})})}var u=r(6507),v=r(9050),m=r(5133),x=r(791),p=r(3428),f=r(7042),g=r(5600),y=r(9975),w=r(5843),j=r(7927),Z=r(6520),b=r(5702);function k(e){return(0,b.Z)("MuiDivider",e)}(0,Z.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);let C=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],S=e=>{let{absolute:t,children:r,classes:i,flexItem:n,light:a,orientation:l,textAlign:o,variant:s}=e;return(0,g.Z)({root:["root",t&&"absolute",s,a&&"light","vertical"===l&&"vertical",n&&"flexItem",r&&"withChildren",r&&"vertical"===l&&"withChildrenVertical","right"===o&&"vertical"!==l&&"textAlignRight","left"===o&&"vertical"!==l&&"textAlignLeft"],wrapper:["wrapper","vertical"===l&&"wrapperVertical"]},k,i)},A=(0,w.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})(({theme:e,ownerState:t})=>(0,p.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin"},t.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},t.light&&{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:(0,y.Fq)(e.palette.divider,.08)},"inset"===t.variant&&{marginLeft:72},"middle"===t.variant&&"horizontal"===t.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===t.variant&&"vertical"===t.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===t.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},t.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:e})=>(0,p.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:e,ownerState:t})=>(0,p.Z)({},t.children&&"vertical"!==t.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`}}),({theme:e,ownerState:t})=>(0,p.Z)({},t.children&&"vertical"===t.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`}}),({ownerState:e})=>(0,p.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),E=(0,w.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})(({theme:e,ownerState:t})=>(0,p.Z)({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`},"vertical"===t.orientation&&{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`})),I=n.forwardRef(function(e,t){let r=(0,j.Z)({props:e,name:"MuiDivider"}),{absolute:n=!1,children:a,className:l,component:o=a?"div":"hr",flexItem:s=!1,light:d=!1,orientation:c="horizontal",role:h="hr"!==o?"separator":void 0,textAlign:u="center",variant:v="fullWidth"}=r,m=(0,x.Z)(r,C),g=(0,p.Z)({},r,{absolute:n,component:o,flexItem:s,light:d,orientation:c,role:h,textAlign:u,variant:v}),y=S(g);return(0,i.jsx)(A,(0,p.Z)({as:o,className:(0,f.Z)(y.root,l),role:h,ref:t,ownerState:g},m,{children:a?(0,i.jsx)(E,{className:y.wrapper,ownerState:g,children:a}):null}))});I.muiSkipListHighlight=!0;var R=r(5884),D=r(2653),L=r(4033);let $=e=>{if(!e)return 0;let t=e.match(/(\d+):(\d+)/);if(t){let e=t[1],r=t[2];return 60*parseInt(e)+parseInt(r)}return 0};function B(e){let{year:t,month:r,day:a,works:l}=e,[o,s]=(0,n.useState)(!1),d=(0,L.useRouter)(),c=0;l.forEach(e=>{let t=$(e.end),r=$(e.start);c+=t-r});let h=c/60;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(R.Z,{container:!0,alignItems:"center",children:[(0,i.jsx)(R.Z,{xs:2,children:a}),(0,i.jsxs)(R.Z,{xs:8,children:[h," H"]}),(0,i.jsx)(R.Z,{xs:2,spacing:2,children:(0,i.jsxs)(u.Z,{display:"flex",justifyContent:"flex-end",children:[h>0&&(0,i.jsx)(v.Z,{sx:{m:1},variant:"outlined",onClick:()=>{s(!o)},size:"small",children:o?"Hidden":"Show"}),(0,i.jsx)(v.Z,{sx:{m:1},variant:"outlined",size:"small",onClick:()=>{d.push("/?year=".concat(t,"&month=").concat(r,"&day=").concat(a))},children:"Go"})]})})]}),o&&(0,i.jsx)(m.Z,{sx:{marginLeft:2},children:(()=>{let e=[];return l.forEach(t=>{e.push((0,i.jsx)(D.Z,{work:t,edit:!1,onlyDisplay:!0},t.id))}),e})()}),(0,i.jsx)(I,{})]})}var M=r(6002);function T(e){let t,{month:r}=e,a=(0,n.useContext)(M.X),[l,o]=(0,n.useState)([]);return a&&(t=a.resolve("recorder")),(0,n.useEffect)(()=>{let e=async()=>{let e=[],i=s()().year(r.year).month(r.month-1).date(1).endOf("month");for(let t=0;t<i.date();t++)e[t]=[];let n=await t.listByMonth(r.year,r.month);n.forEach(t=>{e[t.day-1].push(t)}),o(e)};e()},[r]),(0,i.jsx)(i.Fragment,{children:l.map((e,t)=>(0,i.jsx)(B,{year:r.year,month:r.month,day:t+1,works:e},"".concat(r.year,"-").concat(t)))})}var V=r(5539),W=r(1621);let F=s()();function _(){let e=(0,V.fH)();e.register({recorder:(0,V.D1)(W.$).singleton()});let[t,r]=(0,n.useState)({year:F.year(),month:F.month()+1});return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(M.X.Provider,{value:e,children:[(0,i.jsx)(h,{onChange:e=>{r({...e})}}),(0,i.jsx)(T,{month:t})]})})}}},function(e){e.O(0,[691,290,804,798,971,472,744],function(){return e(e.s=9331)}),_N_E=e.O()}]);