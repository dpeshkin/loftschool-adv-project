(function(){

  const menuButton = document.querySelector('.menu');
  menuButton.addEventListener('click', function() {
    const   fsNav = document.querySelector('.fs-nav'),
      active = 'fs-nav_active';
    fsNav.classList.toggle(active);
    document.body.style.overflow = (document.body.style.overflow === 'hidden' ? '' : 'hidden');
    // var svgId = this.firstElementChild.firstElementChild.getAttribute('xlink:href');
    // var ndx = svgId.indexOf('#');
    // var clearAttr = svgId.slice(0,ndx+1);
    // var newAttr = clearAttr+'in';
    // var svg = this.firstElementChild.firstElementChild;
    // svg.removeAttribute('xlink:href');
    // svg.setAttribute('xlink:href', newAttr);

    // console.log(newAttr);
  });

}());