function initialize(){
  console.log('I AM ALIVE')
		var options = {scrollWheelZoom: false, dragging: false, tilting: true}
        earth = new WE.map('globecontainer', options);
        earth.setView([46.8011, 8.2266], 3);
        WE.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(earth);
    
        // Start a simple rotation animation
        var before = null;
        requestAnimationFrame(function animate(now) {
            var c = earth.getPosition();
            var elapsed = before? now - before: 0;
            before = now;
            earth.setCenter([c[0], c[1] + 0.5*(elapsed/30)]);
            requestAnimationFrame(animate);
      		});

}