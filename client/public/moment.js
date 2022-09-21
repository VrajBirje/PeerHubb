


document.querySelector('body').addEventListener('mousemove',eyeball);
  function eyeball(){
  var eye = document.querySelectorAll('.eye');
  eye.forEach(function(eye){
  let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
  let y = (eye.getBoundingClientRect().top) + (eye.clientWidth / 2);
  let radian = Math.atan2(event.pageX - x, event.pageY - y);
  let rot = (radian * (180 / Math.PI) * -1) + 0;
  eye.style.transform = "rotate("+ rot +"deg)";
  })
  }

  const hamburger = document.getElementById('hamburger')
  const navLinks = document.querySelector(".navlinks");
  const links = document.querySelectorAll(".navlinks li");
  console.log("Ham "+hamburger)
  if(hamburger){
  hamburger.addEventListener("click", ()=>{
     //Animate Links
     console.log("Hey")
      navLinks.classList.toggle("open");
      links.forEach(link => {
          link.classList.toggle("fade");
      });
  
      //Hamburger Animation
      hamburger.classList.toggle("toggle");
  });

  var navigation = responsiveNav(".nav-collapse", {
    animate: true,                    // Boolean: Use CSS3 transitions, true or false
    transition: 284,                  // Integer: Speed of the transition, in milliseconds
    label: "Menu",                    // String: Label for the navigation toggle
    insert: "before",                  // String: Insert the toggle before or after the navigation
    customToggle: "",                 // Selector: Specify the ID of a custom toggle
    closeOnNavClick: false,           // Boolean: Close the navigation when one of the links are clicked
    openPos: "relative",              // String: Position of the opened nav, relative or static
    navClass: "nav-collapse",         // String: Default CSS class. If changed, you need to edit the CSS too!
    navActiveClass: "js-nav-active",  // String: Class that is added to <html> element when nav is active
    jsClass: "js",                    // String: 'JS enabled' class which is added to <html> element
    init: function(){},               // Function: Init callback
    open: function(){},               // Function: Open callback
    close: function(){}               // Function: Close callback
  });

}


  
