(()=>{"use strict";var e={963:(e,o,t)=>{t.r(o),t.d(o,{default:()=>x});var a=t(8899),i=t(2317),n=t(2879),r=t(4330),s=t(8246),l=t(6702),d=t(1059),c=t(7321),u=t(1172),p=t(5200),f=t.n(p),g=t(6499);const m={"pension alimenticia":[{id:1,texto:"\xbfCu\xe1ntos hijos est\xe1n involucrados?",opciones:["1","2","3 o m\xe1s"]},{id:2,texto:"\xbfCu\xe1l es el nivel de ingresos del pagador?",opciones:["Bajo","Medio","Alto"]},{id:3,texto:"\xbfHay acuerdo mutuo sobre la pensi\xf3n?",opciones:["S\xed","No"]}],divorcio:[{id:1,texto:"\xbfTienen hijos en com\xfan?",opciones:["S\xed","No"]},{id:2,texto:"\xbfEl divorcio es de mutuo acuerdo?",opciones:["S\xed","No"]},{id:3,texto:"\xbfExisten bienes en com\xfan?",opciones:["S\xed","No"]}],herencia:[{id:1,texto:"\xbfHay testamento?",opciones:["S\xed","No"]},{id:2,texto:"\xbfCu\xe1ntos herederos est\xe1n involucrados?",opciones:["1","2","3 o m\xe1s"]},{id:3,texto:"\xbfExisten bienes inmuebles?",opciones:["S\xed","No"]}],"contrato de arrendamiento":[{id:1,texto:"\xbfEl contrato es para vivienda o negocio?",opciones:["Vivienda","Negocio"]},{id:2,texto:"\xbfCu\xe1l es la duraci\xf3n del contrato?",opciones:["Menos de 1 a\xf1o","1 a 3 a\xf1os","M\xe1s de 3 a\xf1os"]},{id:3,texto:"\xbfExisten cl\xe1usulas adicionales?",opciones:["S\xed","No"]}],"despido laboral":[{id:1,texto:"\xbfCu\xe1l fue la causa del despido?",opciones:["Justificada","Injustificada"]},{id:2,texto:"\xbfSe cumpli\xf3 con el preaviso?",opciones:["S\xed","No"]},{id:3,texto:"\xbfRecibiste indemnizaci\xf3n?",opciones:["S\xed","No"]}],"acoso laboral":[{id:1,texto:"\xbfCu\xe1l es la naturaleza del acoso?",opciones:["F\xedsico","Psicol\xf3gico","Ambos"]},{id:2,texto:"\xbfExisten pruebas documentales?",opciones:["S\xed","No"]},{id:3,texto:"\xbfEl empleador est\xe1 al tanto?",opciones:["S\xed","No"]}],"accidente de tr\xe1nsito":[{id:1,texto:"\xbfHubo lesionados?",opciones:["S\xed","No"]},{id:2,texto:"\xbfQui\xe9n tuvo la culpa?",opciones:["Yo","El otro conductor","No est\xe1 claro"]},{id:3,texto:"\xbfEl seguro cubre los da\xf1os?",opciones:["S\xed","No"]}],adopcion:[{id:1,texto:"\xbfEs una adopci\xf3n nacional o internacional?",opciones:["Nacional","Internacional"]},{id:2,texto:"\xbfLa pareja es casada o soltera?",opciones:["Casada","Soltera"]},{id:3,texto:"\xbfEl menor tiene m\xe1s de 12 a\xf1os?",opciones:["S\xed","No"]}],"violencia dom\xe9stica":[{id:1,texto:"\xbfHas denunciado antes?",opciones:["S\xed","No"]},{id:2,texto:"\xbfNecesitas una orden de restricci\xf3n?",opciones:["S\xed","No"]},{id:3,texto:"\xbfHay hijos involucrados?",opciones:["S\xed","No"]}],impuestos:[{id:1,texto:"\xbfEs para declaraci\xf3n personal o empresarial?",opciones:["Personal","Empresarial"]},{id:2,texto:"\xbfTienes impuestos atrasados?",opciones:["S\xed","No"]},{id:3,texto:"\xbfHas recibido alguna notificaci\xf3n de auditor\xeda?",opciones:["S\xed","No"]}],"propiedad intelectual":[{id:1,texto:"\xbfEs una patente, derecho de autor o marca registrada?",opciones:["Patente","Derecho de autor","Marca registrada"]},{id:2,texto:"\xbfHas registrado la propiedad?",opciones:["S\xed","No"]},{id:3,texto:"\xbfNecesitas asistencia en caso de infracci\xf3n?",opciones:["S\xed","No"]}]},h=e=>e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\blaborales\b/,"laboral").replace(/\bacosos\b/,"acoso").replace(/\bpropiedades\b/,"propiedad").replace(/\bintelectuales\b/,"intelectual").replace(/\bpensiones\b/,"pension").replace(/\badopciones\b/,"adopcion").replace(/s$/,"");function x(){const[e,o]=(0,a.useState)(""),[l,p]=(0,a.useState)(0),[x,y]=(0,a.useState)([]),[j,v]=(0,a.useState)(0),C=l/(m[h(e.trim())]?.length||1);return(0,g.jsx)(i.default,{style:b.container,children:(0,g.jsxs)(i.default,{style:b.card,children:[(0,g.jsx)(c.default,{source:t(8975),style:b.logo}),(0,g.jsx)(n.default,{style:b.title,children:"Consulta Legal"}),(0,g.jsx)(n.default,{style:b.description,children:"Calcula el precio de tu consulta legal"}),0===l&&(0,g.jsxs)(i.default,{style:b.inputContainer,children:[(0,g.jsx)(n.default,{style:b.label,children:"Tema de consulta"}),(0,g.jsx)(r.default,{style:b.input,placeholder:"Ej. Pensi\xf3n alimenticia",value:e,onChangeText:e=>o(e)}),(0,g.jsx)(d.default,{style:b.button,onPress:()=>{h(e.trim())in m?p(1):f().fire({title:"Lo siento",text:"No tenemos informaci\xf3n sobre ese tema espec\xedfico.",icon:"error",confirmButtonText:"OK",heightAuto:!1})},children:(0,g.jsx)(n.default,{style:b.buttonText,children:"Iniciar Consulta"})})]}),l>0&&l<=m[h(e.trim())]?.length&&(0,g.jsxs)(i.default,{children:[(0,g.jsx)(i.default,{style:b.progressBarBackground,children:(0,g.jsx)(i.default,{style:[b.progressBarFill,{width:100*C+"%"}]})}),(0,g.jsx)(n.default,{style:b.question,children:m[h(e.trim())][l-1]?.texto}),m[h(e.trim())][l-1]?.opciones.map(((o,t)=>(0,g.jsx)(d.default,{style:b.button,onPress:()=>(o=>{if(y([...x,o]),l<m[h(e.trim())].length)p(l+1);else{const e=1e5+x.reduce(((e,o)=>"3 o m\xe1s"===o||"Alto"===o||"No"===o?e+5e4:e+25e3),0),o=new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",minimumFractionDigits:0}).format(e);v(`${o} + IVA`),p(l+1)}})(o),children:(0,g.jsx)(n.default,{style:b.buttonText,children:o})},t)))]}),l>(m[h(e.trim())]?.length||0)&&(0,g.jsxs)(i.default,{style:b.resultContainer,children:[(0,g.jsx)(n.default,{style:b.resultTitle,children:"Precio estimado de la consulta:"}),(0,g.jsx)(n.default,{style:b.resultPrice,children:j}),(0,g.jsxs)(i.default,{style:b.contactCard,children:[(0,g.jsx)(n.default,{style:b.contactTitle,children:"Ejecutivo de Contacto"}),(0,g.jsx)(n.default,{style:b.contactText,children:"Nombre: Juan P\xe9rez"}),(0,g.jsx)(n.default,{style:b.contactText,children:"Tel\xe9fono: +56 9 3870 6522"}),(0,g.jsx)(n.default,{style:b.contactText,children:"Email: jperez@abogados.com"})]}),(0,g.jsxs)(i.default,{style:b.contactButtonsContainer,children:[(0,g.jsx)(d.default,{style:b.contactButtonWhatsApp,onPress:()=>{u.default.openURL("whatsapp://send?phone=+56938706522&text=Hola%20Juan,%20me%20gustar\xeda%20obtener%20m\xe1s%20informaci\xf3n%20sobre%20los%20servicios%20legales.").catch((()=>{s.default.alert("Error","No se pudo abrir WhatsApp")}))},children:(0,g.jsx)(n.default,{style:b.contactButtonText,children:"Hablar por WhatsApp"})}),(0,g.jsx)(d.default,{style:b.contactButtonLlamar,onPress:()=>{u.default.openURL("tel:+56938706522").catch((()=>{s.default.alert("Error","No se pudo realizar la llamada")}))},children:(0,g.jsx)(n.default,{style:b.contactButtonText,children:"Llamar"})})]}),(0,g.jsx)(d.default,{style:b.button,onPress:()=>{o(""),p(0),y([]),v(0)},children:(0,g.jsx)(n.default,{style:b.buttonText,children:"Nueva Consulta"})})]})]})})}const b=l.default.create({container:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#f0f0f0",height:"100vh",width:"100%"},card:{backgroundColor:"white",padding:20,borderRadius:10,width:350,alignItems:"center",shadowColor:"#000",shadowOffset:{width:0,height:2},shadowOpacity:.25,shadowRadius:3.84,elevation:5},logo:{width:40,height:40,marginBottom:15},title:{fontSize:24,fontWeight:"bold",marginBottom:10},description:{marginBottom:20,color:"#6c757d",textAlign:"center"},inputContainer:{width:"100%",alignItems:"center"},label:{marginBottom:10,fontSize:16,fontWeight:"500",color:"#333"},input:{width:"100%",height:40,borderColor:"gray",borderWidth:1,marginBottom:20,padding:10,borderRadius:5,backgroundColor:"#fff"},button:{backgroundColor:"#000",paddingVertical:10,paddingHorizontal:20,borderRadius:5,marginBottom:10,alignItems:"center",width:"100%"},buttonText:{color:"#fff",fontWeight:"bold",fontSize:16,textAlign:"center"},question:{fontSize:18,marginBottom:20,textAlign:"center"},resultContainer:{alignItems:"center"},resultTitle:{fontSize:18,fontWeight:"bold",marginBottom:20},resultPrice:{fontSize:32,fontWeight:"bold",marginBottom:20},contactCard:{backgroundColor:"#f9f9f9",padding:15,borderRadius:8,width:"100%",alignItems:"center",marginTop:15,marginBottom:15,borderColor:"#ddd",borderWidth:1},contactTitle:{fontSize:18,fontWeight:"bold",marginBottom:5},contactText:{fontSize:14,color:"#333",marginBottom:3},contactButtonsContainer:{flexDirection:"row",justifyContent:"space-around",marginTop:20,marginBottom:20,width:"100%"},contactButtonWhatsApp:{backgroundColor:"#25D366",paddingVertical:10,paddingHorizontal:20,borderRadius:5},contactButtonLlamar:{backgroundColor:"#34B7F1",paddingVertical:10,paddingHorizontal:20,borderRadius:5},progressBarBackground:{width:"100%",height:10,backgroundColor:"#e0e0e0",borderRadius:5,marginBottom:20,overflow:"hidden"},progressBarFill:{height:"100%",backgroundColor:"#4CAF50",transition:"width 0.3s ease-in-out",borderRadius:10},progressText:{fontSize:16,marginTop:10,textAlign:"center"}})},8975:(e,o,t)=>{e.exports=t.p+"static/media/logo.87f43611085adb0fb97c.png"}},o={};function t(a){var i=o[a];if(void 0!==i)return i.exports;var n=o[a]={exports:{}};return e[a].call(n.exports,n,n.exports,t),n.exports}t.m=e,(()=>{var e=[];t.O=(o,a,i,n)=>{if(!a){var r=1/0;for(c=0;c<e.length;c++){for(var[a,i,n]=e[c],s=!0,l=0;l<a.length;l++)(!1&n||r>=n)&&Object.keys(t.O).every((e=>t.O[e](a[l])))?a.splice(l--,1):(s=!1,n<r&&(r=n));if(s){e.splice(c--,1);var d=i();void 0!==d&&(o=d)}}return o}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[a,i,n]}})(),t.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},t.d=(e,o)=>{for(var a in o)t.o(o,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:o[a]})},t.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),t.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.p="/",(()=>{var e={792:0};t.O.j=o=>0===e[o];var o=(o,a)=>{var i,n,[r,s,l]=a,d=0;if(r.some((o=>0!==e[o]))){for(i in s)t.o(s,i)&&(t.m[i]=s[i]);if(l)var c=l(t)}for(o&&o(a);d<r.length;d++)n=r[d],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(c)},a=self.webpackChunkweb=self.webpackChunkweb||[];a.forEach(o.bind(null,0)),a.push=o.bind(null,a.push.bind(a))})();var a=t.O(void 0,[230],(()=>t(3846)));a=t.O(a)})();
//# sourceMappingURL=main.a6abb0b4.js.map