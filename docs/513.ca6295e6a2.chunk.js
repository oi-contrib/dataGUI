"use strict";(self.webpackChunkdatagui=self.webpackChunkdatagui||[]).push([[513],{513:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var r=n(540),o=n(151);const i=e=>{const t=document.getElementsByTagName("head")[0];t.style.color=e;const n=((e,t)=>{const n=document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(e,null):e.currentStyle;return"string"==typeof t?n.getPropertyValue(t):n})(t,"color").replace(/rgba?\(/,"").replace(")","").split(",");for(let e=0;e<n.length;e++)n[e]=+n[e];return n.push(1),[n[0]/255,n[1]/255,n[2]/255,n[3]]},a=JSON.parse('[{"value":1048,"name":"Search Engine"},{"value":735,"name":"Direct"},{"value":580,"name":"Email"},{"value":484,"name":"Union Ads"},{"value":300,"name":"Video Ads"}]');let l=(0,o.getLoopColors)(a.length);class s extends r.Component{constructor(e){super(e),this.refContent=r.createRef()}render(){return r.createElement("div",{style:{border:"1px solid gray",width:"700px",height:"500px",position:"fixed",left:"50%",top:"50%",transform:"translate(-50%, -50%)",textAlign:"center"}},r.createElement("div",{style:{fontSize:"20px",lineHeight:"50px",fontWeight:600}},"Referer of a Website"),r.createElement("div",{style:{fontSize:"12px",fontWeight:200}},"Fake Data"),r.createElement("ul",{style:{position:"absolute",textAlign:"left",left:"10px",top:"50px",fontSize:"12px",fontWeight:200}},a.map(((e,t)=>r.createElement("li",{style:{lineHeight:"16px",marginTop:"7px"},key:t},r.createElement("span",{style:{display:"inline-block",width:"25px",height:"16px",backgroundColor:l[t],verticalAlign:"top",marginRight:"5px",borderRadius:"3px"}}),e.name)))),r.createElement("div",{ref:this.refContent,style:{height:"435px"}}))}componentDidMount(){let e=[];for(let t=0;t<l.length;t++)e.push(i(l[t]));let t=(0,o.getLoopColors)(a.length,.9),n=[];for(let e=0;e<l.length;e++)n.push(i(t[e]));let r=(0,o.getWebGLContext)(this.refContent.current,1,"aspectFill");r.enable(r.DEPTH_TEST);let s=new o.Shader(r).compile("attribute vec4 a_position;\nuniform mat4 u_matrix;\n\nvoid main()\n{\n    vec4 temp = u_matrix * a_position;\n\n    // 把原生的WebGL使用的左手坐标系变成了右手坐标系\n    temp.z = -1.0 * temp.z;\n\n    // 表示眼睛距离vec4(0.0,0.0,1.0)的距离\n    float dist = 4.0;\n\n    // 使用投影直接计算\n    // 为保证纹理和相对位置正确\n    // x、y、z的改变满足线性变换\n    gl_Position = vec4((dist + 1.0) * temp.x, (dist + 1.0) * temp.y, dist * (dist + temp.z) + 1.0 - dist * dist, temp.w * 2.0 * (dist + temp.z));\n}","precision mediump float;\n\nuniform vec4 u_color;\n\nvoid main()\n{\n    gl_FragColor = u_color;\n}").use(),p=r.getUniformLocation(s.program,"u_matrix"),u=r.getAttribLocation(s.program,"a_position"),d=r.getUniformLocation(s.program,"u_color"),m=new o.Buffer(r).use(),c=(new o.Matrix4).scale(.7,.7,.7).rotate(-1,1,0,0);r.uniformMatrix4fv(p,!1,c.value());let g=0;for(let e=0;e<a.length;e++)g+=a[e].value;let f=-.5*Math.PI;for(let t=0;t<a.length;t++){let i=a[t].value/g*Math.PI*2,l=[],s=[],p=[],c=[],h=Math.ceil(i*this.refContent.current.clientHeight*.1),x=.8,y=1.7,v=.1,w=i/h;for(let e=0;e<=h;e++){let t=(0,o.rotate)(0,0,f+w*e,y,0),n=(0,o.rotate)(0,0,f+w*e,x,0);l.push(t[0],t[1],v,n[0],n[1],v),s.push(t[0],t[1],-v,n[0],n[1],-v),p.push(n[0],n[1],v,n[0],n[1],-v),c.push(t[0],t[1],v,t[0],t[1],-v)}r.uniform4f(d,...e[t]),m.write(new Float32Array(l)).divide(u,3,3,0),r.drawArrays(r.TRIANGLE_STRIP,0,l.length/3),m.write(new Float32Array(s)).divide(u,3,3,0),r.drawArrays(r.TRIANGLE_STRIP,0,s.length/3),r.uniform4f(d,...n[t]),m.write(new Float32Array(p)).divide(u,3,3,0),r.drawArrays(r.TRIANGLE_STRIP,0,p.length/3),m.write(new Float32Array(c)).divide(u,3,3,0),r.drawArrays(r.TRIANGLE_STRIP,0,c.length/3),f+=i}}}const p=s}}]);