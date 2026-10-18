function createFarmControls({canvas, keys, isActive, look, actions, lockChanged}) {
  const movement = new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','ShiftLeft','ShiftRight','Space']);
  const keyboard = new Set(), heldButtons = new Map();
  const touchControls = document.querySelector('#touchControls');
  let lookPointer = null;

  function updateKey(code) {
    keys[code] = keyboard.has(code) || [...heldButtons.values()].includes(code);
  }
  function reset() {
    keyboard.clear();heldButtons.clear();lookPointer=null;
    for(const code of Object.keys(keys))keys[code]=false;
    touchControls.querySelectorAll('.pressed').forEach(button=>button.classList.remove('pressed'));
  }
  function requestPointerLock() {
    if(!isActive() || !matchMedia('(pointer: fine)').matches || document.pointerLockElement===canvas)return;
    // Browsers can reject capture after Escape; dragging remains available.
    try { canvas.requestPointerLock?.()?.catch(()=>{}); } catch {}
  }
  function sync() {
    reset();
    touchControls.hidden=!isActive();
    if(isActive()&&document.activeElement?.closest('.overlay.hidden')){
      canvas.tabIndex=0;canvas.focus({preventScroll:true});
    }
    if(!isActive()&&document.pointerLockElement===canvas)document.exitPointerLock?.();
  }
  function editing(target) {
    return target instanceof Element && (target.isContentEditable || target.closest('input,textarea,select'));
  }
  addEventListener('keydown',event=>{
    if(event.code==='Escape'){
      if(!event.repeat){reset();actions.escape();}
      return;
    }
    if(editing(event.target) || event.ctrlKey || event.metaKey || event.altKey)return;
    if(event.code==='KeyB'){
      event.preventDefault();if(!event.repeat){reset();actions.catalog();}return;
    }
    if(!isActive())return;
    if(movement.has(event.code)){
      if(event.code==='Space'&&event.target.closest?.('button'))return;
      event.preventDefault();
      if(event.repeat&&event.code==='Space')return;
      keyboard.add(event.code);updateKey(event.code);return;
    }
    const action={KeyE:'interact',KeyQ:'water',KeyF:'cowHelp',KeyG:'cowPet'}[event.code];
    if(action){event.preventDefault();if(!event.repeat)actions[action]();}
  });
  addEventListener('keyup',event=>{keyboard.delete(event.code);updateKey(event.code);});
  addEventListener('blur',reset);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  document.addEventListener('focusin',event=>{if(editing(event.target))reset();});
  document.addEventListener('pointerlockchange',()=>{
    const locked=document.pointerLockElement===canvas;
    lockChanged(locked);reset();
  });
  canvas.addEventListener('pointerdown',event=>{
    if(!isActive() || lookPointer || (event.pointerType==='mouse'&&event.button!==0))return;
    if(document.pointerLockElement===canvas)return;
    lookPointer={id:event.pointerId,type:event.pointerType,x:event.clientX,y:event.clientY,distance:0};
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove',event=>{
    if(!isActive())return;
    if(document.pointerLockElement===canvas){
      if(event.pointerType==='mouse')look(event.movementX,event.movementY,.0022);
      return;
    }
    if(lookPointer?.id!==event.pointerId)return;
    const dx=event.clientX-lookPointer.x,dy=event.clientY-lookPointer.y;
    lookPointer.distance+=Math.hypot(dx,dy);
    lookPointer.x=event.clientX;lookPointer.y=event.clientY;
    look(dx,dy,.004);
  });
  canvas.addEventListener('pointerup',event=>{
    if(lookPointer?.id!==event.pointerId)return;
    const tap=lookPointer.distance<6,type=lookPointer.type;lookPointer=null;
    if(!isActive() || !tap)return;
    if(type==='touch'||type==='pen')actions.interact();else requestPointerLock();
  });
  for(const eventName of ['pointercancel','lostpointercapture'])canvas.addEventListener(eventName,event=>{
    if(lookPointer?.id===event.pointerId)lookPointer=null;
  });
  for(const button of touchControls.querySelectorAll('[data-control]')){
    const code=button.dataset.control;
    button.addEventListener('pointerdown',event=>{
      if(!isActive())return;
      event.preventDefault();button.setPointerCapture(event.pointerId);
      heldButtons.set(event.pointerId,code);button.classList.add('pressed');updateKey(code);
    });
    const release=event=>{
      if(!heldButtons.has(event.pointerId))return;
      heldButtons.delete(event.pointerId);updateKey(code);
      if(![...heldButtons.values()].includes(code))button.classList.remove('pressed');
    };
    for(const eventName of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(eventName,release);
  }
  touchControls.querySelector('[data-action="interact"]').addEventListener('click',()=>{if(isActive())actions.interact();});
  touchControls.addEventListener('contextmenu',event=>event.preventDefault());
  const observer=new MutationObserver(sync);
  document.querySelectorAll('.overlay').forEach(overlay=>observer.observe(overlay,{attributes:true,attributeFilter:['class']}));
  sync();
  return {reset,requestPointerLock};
}
