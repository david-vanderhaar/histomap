(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{160:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),a=n(13),o=n.n(a),s=(n(90),n(53)),c=(n(38),n(24)),l=n(20),u=n.n(l),h=n(28),d=n(33),p=n(23),f=n(37),m=n(34),_=n(36);function y(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}var v=n(75),b=n.n(v),g=n(44),E=(n(62),.2),w=100,x=w,k=function(){var e=Object(h.a)(u.a.mark(function e(t,n){var i,r,a=arguments;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:i=a.length>2&&void 0!==a[2]?a[2]:0,r=0;case 2:if(!(r<n)){e.next=9;break}return t.map(function(e){return C(e,t)}),e.next=6,Object(g.delay)(i);case 6:r++,e.next=2;break;case 9:return e.abrupt("return",t);case 10:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),S=function(e){for(var t=[],n=0;n<e;n++){var i=ae.entity[n%ae.entity.length];t.push(ee(i))}return t},O=function(e,t){t.forEach(function(t){t.id===e.id&&(t.chief_age=y(12,45))})},C=function(e,t){if(A(e,t),function(e,t){var n=Math.random()<=e.chief_age/1e3-.3;return n&&$("DEATH","".concat(e.name,"'s Chief has died."),[e.id],t),n}(e,t))!function(e,t){var n=X(e,t),i=y(0,n.length);$("DISMANTLE","".concat(i," communities have decided to leave ").concat(e.name,"."),[e.id],t),n.map(function(e,n){return n<=i-1&&R(e,t),!0})}(e,t),O(e,t);else if(null===e.chief){$("DECISION","The chief polity ".concat(e.name," deliberates"),[e.id],t);var n=j(e,t);n&&I(e,n,t)?D(e,n,null,t):P(e,t)}else{var i=Y(e,t);$("DECISION","".concat(i.name,"'s subordinate polity ").concat(e.name," deliberates"),[e.id],t),L(i,e,t)?W(i,e,t):P(e,t)}return e},j=function(e,t){var n=T(e,t).filter(function(e){return!te(e)}).map(function(e){return Y(e,t)}).sort(function(e,n){return J(e,t)-J(n,t)});return n.length>0&&n[0]},N=function(e,t,n){return[e].concat(Object(c.a)(K(e,n))).reduce(function(e,n){return e+(i=t,r=n,x>=Math.hypot(r.coordinates.x-i.coordinates.x,r.coordinates.y-i.coordinates.y));var i,r},0)},T=function(e,t){return t.filter(function(n){return Y(n,t).id!==e.id&&n.id!==e.id&&N(e,n,t)})},M=function(e,t){var n=[],i=K(e,t).sort(function(e,n){return J(n,t)-J(e,t)});i.length>4&&i.map(function(t,r){return r>=4?n.push({chief:i[r-4],target:t}):n.push({chief:e,target:t}),!0}),n.map(function(e){return t.forEach(function(t){t.id===e.target.id&&(t.chief=e.chief.id)}),!0})},R=function(e,t){var n=Y(e,t);t.forEach(function(i){i.id===e.id?($("SECESSION","".concat(i.name," is seceded from ").concat(n.name,"."),[i.id,n.id],t),i.chief=null):i.id===n.id&&(i.has_incurred_secession=!0)})},A=function(e,t){t.forEach(function(t){t.id===e.id&&(t.has_incurred_secession=!1,t.has_incurred_war=!1,t.chief_age+=1)})},I=function(e,t,n){var i=B(e,t,n),r=H(i);return Math.random()<=z(e,i,r)},L=function(e,t,n){var i=1-B(e,t,n);return Math.random()<=i},W=function(e,t,n){$("REBELLION","".concat(t.name," attempts rebellion against ").concat(e.name,"."),[t.id],n);var i=B(e,t,n);G(1-i)?($("REBELLION","".concat(t.name," succeeds in rebellion against ").concat(e.name,"."),[t.id],n),V(F(i),[e.id,t.id],n),R(t,n),M(Y(e),n)):($("REBELLION","".concat(t.name," fails in rebellion against ").concat(e.name,"."),[t.id],n),V(H(i),[e.id,t.id],n))},P=function(e,t){$("PEACE","".concat(e.name," has peace."),[e.id],t),U(Math.sign(e.baseline_resource_level-e.resource_level)*(e.baseline_resource_level/3),[e.id],t)},D=function e(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0,a=function(e,t,n){var i=[];return(i=K(t,n).length>0?T(e,n).filter(function(e){return Y(e,n).id===t.id}).sort(function(e,t){return J(t,n)-J(e,n)}):T(e,n).filter(function(e){return e.id===t.id})).length>0&&i[0]}(t,n,r);if(a){$("WAR","".concat(t.name," prepares for war against ").concat(n.name),[t.id],r);var o=B(t,a,r);null===i&&(i=1-o),!G(i)?($("WAR","".concat(t.name," succeeds in battle against ").concat(a.name),[t.id],r),V(H(o),[t.id,a.id],r),function(e,t,n){var i=X(t,n).map(function(e){return e.id});n.forEach(function(n){n.id===t.id&&(n.chief=e.id),i.indexOf(n.id)>-1&&(n.chief=null)})}(t,a,r),M(t,r),i-=.8*i,Y(n,r).id!==t.id&&($("WAR","".concat(t.name,"'s onslaught continues against ").concat(n.name),[t.id],r),e(t,n,i,r))):($("WAR","".concat(t.name," fails in battle against ").concat(a.name),[t.id],r),V(F(o),[t.id,a.id],r))}else $("IMPASSE","".concat(n.name," has no communities with reach of ").concat(t.name,"'s assualt."),[t.id],r)},G=function(e){return Math.random()<=e},B=function(e,t,n){var i=Math.pow(J(e,n),2);return i/(i+Math.pow(J(t,n),2))},z=function(e,t,n){return t*Math.exp(-2*n)*(e.resource_level/e.baseline_resource_level)},H=function(e){return E*(1-e)},F=function(e){return E*e},V=function(e,t,n){n.forEach(function(n){t.indexOf(n.id)>-1&&(n.resource_level=Math.max(0,n.resource_level-e))})},U=function(e,t,n){n.forEach(function(n){t.indexOf(n.id)>-1&&(n.resource_level+=e)})},J=function(e,t){return X(e,t).reduce(function(e,t){return e+.5*t.resource_level},0)+e.resource_level},K=function(e,t){return t.filter(function(n){return n.id!==e.id&&Y(n,t).id===e.id})},X=function(e,t){return t.filter(function(t){return t.id!==e.id&&t.chief===e.id})},Y=function e(t,n){var i=!1,r=[];return null!==t.chief&&(r=n.filter(function(e){return e.id===t.chief})),r.length>0&&(i=r[0]),i?e(i,n):t},$=function(e,t,n,i){i.forEach(function(i){n.indexOf(i.id)>-1&&(i.events=i.events.concat(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"DEFAULT",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{event:q[e],message:t}}(e,t)))})},q={DEFAULT:{color:"gray"},DECISION:{color:"green"},WAR:{color:"red"},PEACE:{color:"blue"},SECESSION:{color:"yellow"},ANNEX:{color:"orange"},DEATH:{color:"purple"},DISMANTLE:{color:"gray"},IMPASSE:{color:"gray"}},Q=function(e){return e.map(function(e){return{events:Object(c.a)(e.events),polity_id:e.id}})},Z=function(e){var t=function(e,t){return e.reduce(function(e,n){return e+J(n,t)},0)}(e,e);return e.map(function(n){return{percent:J(n,e)/t,polity_id:n.id}})};function ee(e){var t=1+y(-1,1)*E;return{id:b()(),name:re([ne,ie]),baseline_resource_level:t,resource_level:t,chief:null,coordinates:{x:y(0,w),y:y(0,w)},has_incurred_secession:!1,has_incurred_war:!1,chief_age:30,events:[],color:e}}var te=function(e){return e.has_incurred_secession&&e.has_incurred_war},ne=["Moon","Sun","Black","White","Light","Shadow","Red","Green","Gray","Mighty","Wither","Gale","Hay","Stone","River"],ie=["Fire","Water","Belly","Peaks","Born","Still","Wood","Wine","Run","Guard","Fell","Fall"],re=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map(function(e){return(t=e).length>0?t[y(0,t.length-1)]:null;var t}).join(" ")},ae={background:"#eadcbd",entity:["#de6640","#e39d96","#e8c4ac","#ebd66b","#638c5f","#869f9b","#cac9b4"]},oe=n(11),se=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(f.a)(this,Object(m.a)(t).call(this,e))).state={offset_x:e.width/100-1,offset_y:e.height/100-1,base_size:10,size_multiplier:20},n}return Object(_.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.props.polities.map(function(t,n){var i=t.coordinates.x*e.state.offset_x,a=t.coordinates.y*e.state.offset_y,o=J(t,e.props.polities),s=e.state.size_multiplier*o+e.state.base_size,c=X(t,e.props.polities).map(function(n,o){return r.a.createElement(oe.Group,null,r.a.createElement(oe.Line,{key:o+"b",x:0,y:0,points:[i,a,n.coordinates.x*e.state.offset_x,n.coordinates.y*e.state.offset_y],stroke:Y(t,e.props.polities).color,tension:1,strokeWidth:4}))});return r.a.createElement(oe.Group,{key:n},r.a.createElement(oe.Text,{x:i,y:a+40,text:t.name,fill:"red",fontSize:20}),r.a.createElement(oe.Text,{x:i,y:a-20,text:Math.round(100*o)/100,fill:"red",fontSize:20}),r.a.createElement(oe.Rect,{x:i,y:a,width:s,height:s,fill:t.color,shadowBlur:5}),c)});return r.a.createElement(oe.Group,null,t)}}]),t}(r.a.Component),ce=function(){return{background:arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#282c34",element_body:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#eadcbd",element_text:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"#282c34",chart_lines:arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#eadcbd"}},le={dark:ce(),light:ce("#eadcbd","#282c34","#eadcbd","#282c34")},ue=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(f.a)(this,Object(m.a)(t).call(this,e))).state={step_distance:100,entity_distance:40,offset_x:e.offset_x,offset_y:e.offset_y,previous_polity_power:0,padding_right:e.offset_x,event_text_width:60},n}return Object(_.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.props.all_historical_polities.map(function(e){return{polity:e,points:[]}});this.props.history.map(function(n,i){return n.polities.map(function(r,a){var o=a>0?n.percents.slice(0,a).reduce(function(e,t){return e+t.percent},0):0,s=n.percents.filter(function(e){return e.polity_id===r.id})[0].percent,l=(e.props.width-e.state.offset_x)*(s+o),u=i*e.state.step_distance;return t=t.map(function(e){return e.polity.id===r.id&&(e.points=[].concat(Object(c.a)(e.points),[l,u])),e}),!0}),!0});var n=this.state.offset_x,i=this.state.offset_y,a=this.props.history.length*this.state.step_distance;return a>=this.props.height-this.state.offset_y&&(i=this.state.offset_y-a+(this.props.height-this.state.step_distance)),r.a.createElement(oe.Group,null,r.a.createElement(oe.Group,{x:n,y:i,draggable:!0,dragBoundFunc:function(t){return{x:e.state.offset_x,y:Math.min(e.state.offset_y,t.y)}}},t.map(function(t,n){var i=[];return e.props.history.forEach(function(t,n){n===e.props.history.length-1&&(i=(i=i.concat([0,n*e.state.step_distance])).concat([0,0]))}),r.a.createElement(oe.Line,{key:n,x:0,y:0,points:t.points.concat(i),stroke:le[e.props.theme].background,tension:0,strokeWidth:4,closed:!0,fill:t.polity.color})}).reverse(),this.props.history.map(function(t,n){return r.a.createElement(oe.Group,null,r.a.createElement(oe.Text,{x:e.props.side_info_width-e.state.offset_x,y:n*e.state.step_distance-25,width:e.props.side_info_width,text:"".concat(n*e.props.years_to_run),fill:le[e.props.theme].element_body,fontSize:20,fontStyle:"bold",align:"center"}),r.a.createElement(oe.Line,{key:n,x:0,y:0,points:[e.props.side_info_width-e.state.offset_x,n*e.state.step_distance,e.props.width-e.state.offset_x+e.props.side_info_width,n*e.state.step_distance],stroke:le[e.props.theme].chart_lines,tension:0,strokeWidth:2}),r.a.createElement(oe.Text,{x:e.props.width-e.state.offset_x,y:n*e.state.step_distance-25,width:e.props.side_info_width,text:"".concat(n*e.props.years_to_run),fill:le[e.props.theme].element_body,fontSize:20,fontStyle:"bold",align:"center"}))}),this.props.history.map(function(t,n){return t.polities.map(function(i,a){var o=a>0?t.percents.slice(0,a).reduce(function(e,t){return e+t.percent},0):0,s=t.percents.filter(function(e){return e.polity_id===i.id})[0].percent,c=(e.props.width-e.state.offset_x)*(s+o),l=(e.props.width-e.state.offset_x)*o,u=(e.state.event_text_width,t.events.filter(function(e){return e.polity_id===i.id})),h=u.length>0?u[0].events:[];if(s>.06)return r.a.createElement(oe.Group,{key:a},r.a.createElement(oe.Text,{x:l+16,y:n*e.state.step_distance-e.state.step_distance/2,width:c-l-16,text:"".concat(i.name.toUpperCase(),"\n").concat(h.length>0?h[h.length-1].message:"none"),fill:le[e.props.theme].element_body,fontSize:12,fontStyle:"bold",align:"center"}))})})))}}]),t}(r.a.Component);var he=function(e){return r.a.createElement("div",{className:"Toolbar"},r.a.createElement("button",{onClick:function(){e.running_sim?e.onPause():e.onStart()},className:"btn",style:{backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text}},e.running_sim?"Pause":"Start"),r.a.createElement("button",{onClick:function(){return e.onStep()},className:"btn",style:{backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text}},"Step"),r.a.createElement("button",{onClick:function(){return e.onRestart()},className:"btn",style:{backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text}},"Restart"),r.a.createElement("button",{onClick:function(){return e.onReset()},className:"btn",style:{backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text}},"New History"),r.a.createElement("button",{onClick:function(){return e.onSwitchTheme()},className:"btn",style:{backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text}},"light"===e.theme?"Go Dark":"Go Light"),r.a.createElement("button",{onClick:function(){return e.onSwitchView()},className:"btn",style:{backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text}},e.chart_view?"Node View":"Chart View"))},de=n(45),pe=n(76),fe=n(188),me=n(193),_e=n(192),ye=n(190),ve=n(191),be=n(189),ge=n(194),Ee=n(81),we=n.n(Ee),xe=Object(fe.a)({list:{width:500},fullList:{width:"auto"}});function ke(e){var t,n=xe(),i=r.a.useState({top:!1,left:!1,bottom:!1,right:!1}),a=Object(s.a)(i,2),o=a[0],c=a[1],l=function(e,t){return function(n){("keydown"!==n.type||"Tab"!==n.key&&"Shift"!==n.key)&&c(Object(pe.a)({},o,Object(de.a)({},e,t)))}},u=function(e){return r.a.createElement(be.a,Object.assign({button:!0,style:{color:"#de6640"},component:"a"},e))};return r.a.createElement("div",null,r.a.createElement(_e.a,{disableFocusRipple:!0,className:"btn",style:{position:"absolute",borderRadius:2,left:10,top:10,backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text},onClick:l("left",!0)},r.a.createElement(we.a,null)),r.a.createElement(me.a,{PaperProps:{style:{backgroundColor:le[e.theme].element_body,color:le[e.theme].element_text}},open:o.left,onClose:l("left",!1)},(t="left",r.a.createElement("div",{className:n.list,role:"presentation",onClick:l(t,!1),onKeyDown:l(t,!1)},r.a.createElement(ye.a,null,r.a.createElement(be.a,null,r.a.createElement("h4",null,"About")),r.a.createElement(be.a,null,r.a.createElement(ge.a,null,"This is intended generate histomaps similar to John B. Sparks 1931 piece, titled \u201cThe Histomap: Four Thousand Years of World History.\u201d")),r.a.createElement(be.a,null,r.a.createElement(ge.a,null,"To simulate an early history I interpret Peter Turchin's model for Cycling in the Complexity of Early Societies."))),r.a.createElement(ve.a,null),r.a.createElement(ye.a,null,r.a.createElement(u,{href:"https://www.worldhistorycharts.com/the-histomap-by-john-sparks/"},r.a.createElement(ge.a,{primary:"The Histomap by John B. Sparks"})),r.a.createElement(u,{href:"https://escholarship.org/uc/item/5536t55r#page-1"},r.a.createElement(ge.a,{primary:"Cycling in the Complexity of Early Societies by Peter Turchin"}))),r.a.createElement(ve.a,null)))))}var Se=function(e){function t(){var e;Object(d.a)(this,t),e=Object(f.a)(this,Object(m.a)(t).call(this));var n=S(20),i=Z(n);return e.state={polities:n,all_historical_polities:n,chart_padding:180,side_info_width:80,width:window.innerWidth-180,height:window.innerHeight-280,stage_padding_top:20,top_section_height:200,bottom_section_height:60,history:[{polities:n,percents:i,events:[]}],years_to_run:10,running_sim:!1,running_sim_reference:null,step_interval:500,chart_view:!0},e.stage_ref=r.a.createRef(),e}return Object(_.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=Object(h.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.table(this.state.polities);case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"start",value:function(){var e=Object(h.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({running_sim:!0});case 2:return e.next=4,this.continuousStep(this.state.years_to_run,this.state.step_interval/this.state.years_to_run);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"pause",value:function(){this.setState({running_sim:!1})}},{key:"onSwitchView",value:function(){this.setState({chart_view:!this.state.chart_view})}},{key:"continuousStep",value:function(){var e=Object(h.a)(u.a.mark(function e(){var t,n,i,r,a,o,s=arguments;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:1,n=s.length>1&&void 0!==s[1]?s[1]:0,e.next=4,k(Object(c.a)(this.state.polities),t,n);case 4:return i=e.sent,r=Z(i),a=Q(i),o=this.state.history.concat({polities:i,percents:r,events:a}),e.next=10,this.setState({polities:i,history:o});case 10:return e.next=12,Object(g.delay)(this.state.step_interval);case 12:if(!this.state.running_sim){e.next=15;break}return e.next=15,this.continuousStep(t,n/t);case 15:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"step",value:function(){var e=Object(h.a)(u.a.mark(function e(){var t,n,i,r,a,o,s=arguments;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:1,n=s.length>1&&void 0!==s[1]?s[1]:0,e.next=4,k(Object(c.a)(this.state.polities),t,n);case 4:return i=e.sent,r=Z(i),a=Q(i),o=this.state.history.concat({polities:i,percents:r,events:a}),e.next=10,this.setState({polities:i,history:o});case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"reset",value:function(){var e=S(20),t=[{polities:e,percents:Z(e),events:[]}];this.setState({polities:e,all_historical_polities:e,history:t})}},{key:"restart",value:function(){var e=this.state.all_historical_polities,t=[{polities:e,percents:Z(e),events:[]}];this.setState({polities:e,history:t})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(ke,{theme:this.props.theme}),r.a.createElement("div",{className:"top-section",style:{height:this.state.top_section_height}},r.a.createElement("h1",{style:{color:le[this.props.theme].element_body,margin:0}},"The HISTOMAP"),r.a.createElement("p",{style:{color:le[this.props.theme].element_body}},"".concat((this.state.history.length-1)*this.state.years_to_run," year").concat(this.state.history.length>1?"s":""," of world history").toUpperCase()),r.a.createElement("p",{style:{color:le[this.props.theme].element_body}},"Relative power of contemporary states, nations, and empires".toUpperCase()),r.a.createElement(he,{theme:this.props.theme,running_sim:this.state.running_sim,onStart:this.start.bind(this),onPause:this.pause.bind(this),onStep:this.step.bind(this),onReset:this.reset.bind(this),onRestart:this.restart.bind(this),onSwitchTheme:this.props.onSwitchTheme,onSwitchView:this.onSwitchView.bind(this),chart_view:this.state.chart_view,stage_ref:this.stage_ref})),r.a.createElement("div",{className:"Stage",style:{paddingTop:this.state.stage_padding_top}},r.a.createElement(oe.Stage,{ref:this.stage_ref,width:this.state.width,height:this.state.height},r.a.createElement(oe.Layer,null,this.state.chart_view&&r.a.createElement(ue,{theme:this.props.theme,polities:this.state.polities,all_historical_polities:this.state.all_historical_polities,history:this.state.history,years_to_run:this.state.years_to_run,side_info_width:this.state.side_info_width,width:this.state.width-this.state.side_info_width,height:this.state.height-this.state.stage_padding_top,offset_x:this.state.chart_padding,offset_y:85}),!this.state.chart_view&&r.a.createElement(se,{polities:this.state.polities,width:this.state.width,height:this.state.height})))),r.a.createElement("div",{className:"bottom-section",style:{height:this.state.bottom_section_height}},r.a.createElement("span",{style:{color:le[this.props.theme].element_body},className:"bottom-section-text"},"Copyright by David A. Vanderhaar"),r.a.createElement("span",{style:{color:le[this.props.theme].element_body},className:"bottom-section-text"},"Made with React and Konva"),r.a.createElement("span",{style:{color:le[this.props.theme].element_body},className:"bottom-section-text"},"Model based on Peter Turchin's Cycling in the Complexity of Early Societies")))}}]),t}(r.a.Component),Oe=(n(156),function(e){return"light"===e?"dark":"light"}),Ce=r.a.createRef();var je=function(){var e=Object(i.useState)("light"),t=Object(s.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{ref:Ce,className:"App",style:{backgroundColor:le[n].background}},r.a.createElement(Se,{onSwitchTheme:function(){a(Oe(n))},theme:n}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(je,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},38:function(e,t,n){},86:function(e,t,n){e.exports=n(160)},90:function(e,t,n){}},[[86,1,2]]]);
//# sourceMappingURL=main.385bfa4a.chunk.js.map