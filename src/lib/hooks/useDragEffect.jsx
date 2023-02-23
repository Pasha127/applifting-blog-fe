import React, { useEffect, useRef } from "react";

function useDragEffect(id){
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const isClicked = useRef(false);
    const coordinates = useRef({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    })
useEffect(()=>{
    if(window.innerWidth > 390){
    const target = document.getElementById(id);
    if (!target) throw new Error("No element with id:", id );

    const container = target.parentElement;
    if (!container) throw new Error("No element with id:", id);

    const onMouseDown = (e) => {
        isClicked.current = true;
        coordinates.current.lastX =  /* (vw *.5) - */ target.offsetLeft;
        coordinates.current.lastY =  /* (vh *.5) - */ target.offsetTop;
        coordinates.current.startX = /* (vw *.5) - */ e.clientX;
        coordinates.current.startY = /* (vh *.5) - */ e.clientY;
    }
    
    const onMouseUp = (e) => {
        isClicked.current = false;
        coordinates.current.lastX =  /* (vw *.5) - */ target.offsetLeft;
        coordinates.current.lastY =  /* (vh *.5) - */ target.offsetTop;
    }
    const onMouseMove = (e) => {
        if (!isClicked.current) return;
        
        const nextX = e.clientX - coordinates.current.startX + coordinates.current.lastX;
        const nextY = e.clientY - coordinates.current.startY + coordinates.current.lastY;
        
        target.style.top = `calc(${(nextY/vh)*100}vh)`;
        target.style.left = `calc(${(nextX/vw)*100}vw)`;
    }
    
    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);
  
    const cleanup = () => {
        target.removeEventListener('mousedown', onMouseDown);
        target.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseUp);
    }
    if(coordinates.current.lastX > vw || coordinates.current.lastY > vh || coordinates.current.lastX < 0 || coordinates.current.lastY < 0){
        const nextX  =  (vw/2);
        const nextY  =  (vh/2);
        coordinates.current.lastX = (vw/2);
        coordinates.current.lastY = (vh/2);
        target.style.top = `calc(${(nextY/vh)*100}vh)`;
        target.style.left = `calc(${(nextX/vw)*100}vw)`;

    }
    return cleanup;}
},[id])
}

export default useDragEffect;