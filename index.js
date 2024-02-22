let isAnimating = false;
let pullDeltaX = 0; // cantidad de arrastre
const TRESHOLD_VALUE = 75;



const startDrag = (event)=>{

    if(isAnimating) return;
    // closest(); Busca el elemento mas cercano que le mando como parametro
    const initialCard = event.target.closest("article");
    if(!initialCard) return;
    // capturamos el punto inicial del touch
    const startPoint = event.screenX ?? event.touches[0].pageX;
    // desktop
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onEnd)

    //mobile o tochscreens
    document.addEventListener("touchmove", onMove, {passive: true})
    document.addEventListener("touchend", onEnd, {passive: true})

    function onMove(event)  {
        const currentX = event.screenX ?? event.touches[0].pageX;
        pullDeltaX = currentX - startPoint;
        console.log(pullDeltaX)
        if(pullDeltaX === 0) return; // No se recorrdio nada
        isAnimating = true
        const deg = pullDeltaX / 12;
        initialCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
        initialCard.style.cursor = "grabbing"
        const opacityValue = Math.abs(pullDeltaX) / 100;

        const goRight = pullDeltaX > 0;

        const choiceChange = goRight ? 
        initialCard.querySelector(".choice.nope") :
        initialCard.querySelector(".choice.like");

        choiceChange.style.opacity = opacityValue;


    }
    
    function onEnd (event) {
        document.removeEventListener("mousemove", onMove)
        document.removeEventListener("mouseup", onEnd)
    
        //mobile o tochscreens
        document.removeEventListener("touchmove", onMove, {passive: true})
        document.removeEventListener("touchend", onEnd, {passive: true})

        const target = Math.abs(pullDeltaX) >= TRESHOLD_VALUE;
        
        if(target){
            const toRight = pullDeltaX >= 0;
            const toLeft = !toRight;
        initialCard.classList.add(toRight ? "go-right" : "go-left")
        initialCard.addEventListener("transitionend", ()=> {

            initialCard.remove()
        }, { once: true})
        }else{
            initialCard.classList.add("reset");
            initialCard.classList.remove("go-right", "go-left"); 

            initialCard.querySelectorAll('.choice').forEach(choice => {
                choice.style.opacity = 0
              })
            
        }
        initialCard.addEventListener("transitionend", ()=>{
            initialCard.removeAttribute("style")
            initialCard.classList.remove("reset")
            pullDeltaX = 0;
            isAnimating = false
        }) 
              // reset the choice info opacity
      initialCard
      .querySelectorAll(".choice")
      .forEach((el) => (el.style.opacity = 0));
  }
      

    
        
    }


  





document.addEventListener("mousedown", startDrag);
document.addEventListener("touchstart", startDrag, {passive: true});


