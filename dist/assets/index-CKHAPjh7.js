var W=Object.defineProperty;var X=(a,o,t)=>o in a?W(a,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[o]=t;var h=(a,o,t)=>(X(a,typeof o!="symbol"?o+"":o,t),t);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}})();const Y="/assets/damage-CBpVFwyC.mp3";class u extends Error{constructor(o){super("position cant be set because it intersects with another or screen bounds"),this.object=o}}const m=[];let K=0;class v{constructor(o,t,s,e){h(this,"id");h(this,"domElement");h(this,"stage");var n;this.width=o,this.height=t,this.position=s,this.options=e,this.id=K++,this.domElement=document.createElement("div"),this.domElement.style.width=this.width+"px",this.domElement.style.height=this.height+"px",this.domElement.setAttribute("id",`object${this.id}`),this.domElement.classList.add("object"),(n=this.options)!=null&&n.domElementClasses&&this.domElement.classList.add(...this.options.domElementClasses);try{this.setPosition(this.position)}catch(r){throw r}const i=document.querySelector("#stage");if(!i)throw new Error("game is not initialized. couldn't find a stage element");this.stage=i,this.stage.insertAdjacentElement("afterbegin",this.domElement),m.push(this)}getPosition(){return this.position}setPosition(o){var n,r,l,y,x,O,_,T,S,M,j,I,D,H,N,U;if(o.x!==void 0&&(o.x+this.width>((n=this.stage)==null?void 0:n.clientWidth)||o.x<0)&&!((l=(r=this.options)==null?void 0:r.collision)!=null&&l.disabled))throw new u;if(o.y!==void 0&&(o.y+this.height>((y=this.stage)==null?void 0:y.clientHeight)||o.y<0)&&!((O=(x=this.options)==null?void 0:x.collision)!=null&&O.disabled))throw new u;const t=((T=(_=this.options)==null?void 0:_.collision)==null?void 0:T.bottomCollisionTrigger)==="bottom"?this.height:0,s=m.filter(c=>{const g=o.x||this.position.x;return c.id!==this.id&&g+this.width>=c.position.x&&g<=c.position.x+c.width}),e=m.filter(c=>{const g=o.y||this.position.y;return c.id!==this.id&&g+this.height>=c.position.y&&g+t<=c.position.y+c.height}),i=s.find(c=>e.some(g=>g.id===c.id));if(i&&!((M=(S=this.options)==null?void 0:S.collision)!=null&&M.disabled)&&!((I=(j=i.options)==null?void 0:j.collision)!=null&&I.disabled))throw(H=(D=i.options)==null?void 0:D.collision)!=null&&H.doWhenObjectCollided&&i.options.collision.doWhenObjectCollided(this),(U=(N=this.options)==null?void 0:N.collision)!=null&&U.doWhenCollidedIntoObject&&this.options.collision.doWhenCollidedIntoObject(i),new u(i);this.position.x=o.x!==void 0?o.x:this.position.x,this.position.y=o.y!==void 0?o.y:this.position.y}destroy(){this.domElement.remove(),m.splice(m.findIndex(o=>o.id===this.id),1)}update(){this.domElement.style.top=this.position.y+"px",this.domElement.style.left=this.position.x+"px"}}class B extends v{constructor(t,s,e){var n,r;const i=((n=e==null?void 0:e.objectOptions)==null?void 0:n.domElementClasses)||[];super(52,82,t,{...e==null?void 0:e.objectOptions,domElementClasses:[...i,"entity-container"]});h(this,"entityOptions");h(this,"healthPoints",0);h(this,"damageAudio");this.maxHealth=s,this.entityOptions=e,this.domElement.insertAdjacentHTML("afterbegin",`
            <div class="entity-sprite ${((r=this.entityOptions)==null?void 0:r.spriteElementClass)||""}"></div>
        `),this.domElement.setAttribute("direction","bottom"),this.setHealth(s),this.damageAudio=new Audio(Y),this.damageAudio.volume=.05}setHealth(t,s){var e,i,n,r;if(t>this.maxHealth)throw RangeError("player health must be a maximum of "+this.maxHealth);this.healthPoints=t,(e=this.entityOptions)!=null&&e.noHealthBar||((i=this.domElement.querySelector("#playerHealthBar"))==null||i.remove(),this.domElement.insertAdjacentHTML("afterbegin",`
                <meter id="playerHealthBar" min="0" max="${this.maxHealth}"
                    low="1" high="3" optimum="2" value="${this.healthPoints}"
                    class="absolute left-1/2 -translate-x-1/2 -bottom-4 z-10">
                    ${this.healthPoints} hp
                </meter>
            `)),t<=0&&((n=this.entityOptions)!=null&&n.doBeforeDeathAnimation&&this.entityOptions.doBeforeDeathAnimation(this),this.domElement.classList.add("dying"),(r=this.options)!=null&&r.collision&&(this.options.collision={disabled:!0}),setTimeout(()=>{var l;(l=this.entityOptions)!=null&&l.doAfterDeathAnimation&&this.entityOptions.doAfterDeathAnimation(this),this.destroy()},1e3)),s&&t>=0&&(this.damageAudio.currentTime=0,this.damageAudio.play())}getHealth(){return this.healthPoints}}const $="/assets/walking-BsVBOc2v.mp3",F=Object.keys,z="/assets/shot-BlRohupt.mp3";function k(a){return a*.0174533}class V extends v{constructor(t,s){var o=(...it)=>(super(...it),h(this,"angle"),this);try{o(64,64,t,{domElementClasses:["bullet"]}),this.angle=s,this.domElement.style.transform=`rotate(${this.angle}deg)`}catch(e){o(64,64,{x:0,y:0},{collision:{disabled:!0}}),this.angle=s,e instanceof u&&e.object&&this.damage(e.object),this.destroy()}}update(){try{const s=this.getPosition();this.setPosition({x:s.x+Math.cos(k(this.angle||0))*18,y:s.y+Math.sin(k(this.angle||0))*18}),super.update()}catch(s){s instanceof u&&s.object&&this.damage(s.object),this.destroy()}}damage(t){t instanceof p&&t.setHealth(t.getHealth()-1,!0)}}class Z extends v{constructor(t){super(51,31,{y:t.getPosition().y,x:t.getPosition().x},{domElementClasses:["gun"],collision:{disabled:!0}});h(this,"angle",0);h(this,"mousePosition",{x:0,y:0});h(this,"updateMousePosition",t=>this.mousePosition={x:t.pageX,y:t.pageY});h(this,"shotAudio");this.holderObject=t,document.addEventListener("mousemove",this.updateMousePosition),this.stage.addEventListener("click",()=>this.shoot()),this.shotAudio=new Audio(z),this.shotAudio.volume=.05}update(){const s=this.holderObject.getPosition(),e=this.getPosition(),i={x:s.x,y:s.y+this.height},n={x:e.x+this.width/2,y:e.y+this.height/2};let r=this.mousePosition.x-i.x,l=this.mousePosition.y-i.y;const y=Math.sqrt(r*r+l*l);r/=y,l/=y;const x=Math.atan2(this.mousePosition.y-n.y,this.mousePosition.x-n.x)*(180/Math.PI);this.setPosition({x:i.x+r*60,y:i.y+l*60}),this.angle=x,this.domElement.style.transform=`rotate(${this.angle}deg)`,super.update()}shoot(){this.shotAudio.currentTime=0,this.shotAudio.play();const s=this.getPosition(),e={x:s.x+this.width/2,y:s.y+this.height/2};let i=this.mousePosition.x-e.x,n=this.mousePosition.y-e.y;const r=Math.sqrt(i*i+n*n);i/=r,n/=r;try{new V({x:e.x+i*70,y:e.y+n*70},this.angle)}catch{}}}const d={left:{active:!1,key:"A"},top:{active:!1,key:"W"},right:{active:!1,key:"D"},bottom:{active:!1,key:"S"}};window.addEventListener("keydown",a=>{q(a.code,!0)});window.addEventListener("keyup",a=>{q(a.code,!1)});window.addEventListener("blur",()=>{F(d).forEach(a=>{d[a].active=!1})});function q(a,o){for(const t in d){const s=d[t];a.toUpperCase()==="KEY"+s.key&&(s.active=o)}}const b=class b extends B{constructor(){super({x:10,y:10},b.MAX_HEALTH_POINTS,{doBeforeDeathAnimation:()=>{var i;this.gun.destroy();const t=document.querySelector("#titleScreen"),s=t.querySelector("h1"),e=t.querySelector("button");t==null||t.classList.remove("closed"),s.textContent="imagine dying at this game",e.textContent="restart",e.style.pointerEvents="none",(i=t.querySelector("p"))==null||i.remove(),setTimeout(()=>{G(),e.style.pointerEvents="auto"},500)},objectOptions:{collision:{bottomCollisionTrigger:"bottom"}}});h(this,"walkingAudio");h(this,"gun");this.walkingAudio=new Audio($),this.walkingAudio.loop=!0,this.walkingAudio.volume=.2,this.gun=new Z(this)}update(){const t=this.getPosition(),s=this.domElement;let e=6;const i=Object.keys(d).filter(n=>d[n].active);i[0]?(s.setAttribute("direction",i[0]),s.setAttribute("walking",""),this.walkingAudio.play()):(s.removeAttribute("walking"),this.walkingAudio.pause()),i.length>1&&(e=e*.75);try{d.left.active&&this.setPosition({x:t.x-e}),d.top.active&&this.setPosition({y:t.y-e}),d.right.active&&this.setPosition({x:t.x+e}),d.bottom.active&&this.setPosition({y:t.y+e})}catch{}super.update()}destroy(){this.walkingAudio.pause(),this.walkingAudio.remove(),super.destroy()}};h(b,"MAX_HEALTH_POINTS",5);let f=b,A;function J(){A=new f}async function Q(a){return new Promise(o=>{setTimeout(()=>{o()},a*1e3)})}const w=class w extends B{constructor(t){const s={collision:{doWhenCollidedIntoObject:e=>{if(e instanceof f&&this.canDamage)try{e.setHealth(e.getHealth()-1,!0),this.canDamage=!1,window.setTimeout(()=>{this.canDamage=!0},700)}catch(i){console.log(i)}}},domElementClasses:["enemy-container"]};super(t,w.MAX_HEALTH_POINTS,{spriteElementClass:"enemy-sprite",noHealthBar:!0,objectOptions:s});h(this,"canDamage",!0);h(this,"moving",!0);this.domElement.setAttribute("walking","")}async setPositionWithAnimation(t){await Q(.1);try{this.moving=!1,this.domElement.classList.add("animated-teleporting"),this.setPosition(t),setTimeout(()=>{this.domElement.classList.remove("animated-teleporting"),this.moving=!0},400)}catch(s){if(s instanceof u)throw this.domElement.classList.remove("animated-teleporting"),this.moving=!0,s}}update(){const t=this.getPosition(),s=2;if(A&&this.moving){const e=A.getPosition(),i={x:t.x,y:t.y};let n;if(t.y<e.y?(n="bottom",i.y=i.y+s):t.y>e.y&&(n="top",i.y=i.y-s),(t.x<=e.x||t.x>=e.x+A.width)&&(t.x<e.x?(n="right",i.x=i.x+s):t.x>e.x&&(n="left",i.x=i.x-s)),!n)return;this.domElement.setAttribute("direction",n);try{this.setPosition(i)}catch(r){r instanceof u&&this.escapeCollision(r,n)}}super.update()}async escapeCollision(t,s){const e=this.getPosition(),i=t.object;if(!i||i instanceof f)return;const n=t.object.getPosition();try{const r={...e};s==="top"?r.y=n.y-i.height:s==="bottom"?r.y=n.y+i.height+this.height:s==="left"?r.x=n.x-i.width:s==="right"&&(r.x=n.x+i.width+this.width),await this.setPositionWithAnimation(r)}catch(r){if(r instanceof u&&r.object)this.escapeCollision(r,s);else{const l={x:0,y:0};s==="top"?l.y=0:s==="bottom"?l.y=this.stage.clientHeight-this.height:s==="left"?l.x=0:s==="right"&&(l.x=this.stage.clientWidth-this.width);try{await this.setPositionWithAnimation(l)}catch{}}}}};h(w,"MAX_HEALTH_POINTS",5);let p=w;function E(a,o){return Math.floor(Math.random()*(o-a+1))+a}let P;function R(){var a,o;(a=document.querySelector("#globalContainer"))==null||a.insertAdjacentHTML("beforeend",`
        <div id="stage" class="relative h-full overflow-hidden"></div>
    `),J(),tt(),setTimeout(()=>{P=requestAnimationFrame(t);function t(){m.forEach(s=>s.update()),P=requestAnimationFrame(t)}},200),(o=document.querySelector("#titleScreen"))==null||o.classList.add("closed")}function G(){var o;[...m].forEach(t=>t.destroy()),P&&cancelAnimationFrame(P),(o=document.querySelector("#stage"))==null||o.remove()}function tt(){const a=document.querySelector("#stage"),o=13,t={min:66,max:a.clientWidth-66},s={min:100,max:a.clientHeight-100},e={width:56,height:120};for(let i=0;i<o;i++)try{new v(56,120,{x:E(t.min+e.width,t.max-e.width),y:E(s.min+e.height,s.max-e.height)},{domElementClasses:["rock"]})}catch{}setInterval(()=>{const i=m.filter(r=>r instanceof p).length,n=2;try{for(let r=0;r<n-i;r++)new p({x:E(62,window.innerWidth-62),y:E(92,window.innerHeight-92)})}catch{}},1e3)}const L=document.querySelector("#startGameButton");L==null||L.addEventListener("click",()=>{R()});const C=document.querySelector("#restartButton");C==null||C.addEventListener("click",()=>{G(),R()});