// Opening Animation for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Animation timing variables
  const globeAnimationDuration = 2000; // ms
  const arcsAnimationDuration = 1500; // ms
  const logoAnimationDuration = 1500; // ms
  const taglineAnimationDuration = 1000; // ms
  const swipeIndicatorDelay = 5000; // ms
  
  // Initialize the globe animation
  initGlobeAnimation();
  
  // Sequence the animations
  setTimeout(() => animateArcs(), globeAnimationDuration * 0.5);
  setTimeout(() => animateLogo(), globeAnimationDuration + arcsAnimationDuration * 0.5);
  setTimeout(() => animateTagline(), globeAnimationDuration + arcsAnimationDuration + logoAnimationDuration * 0.5);
  setTimeout(() => showSwipeIndicator(), globeAnimationDuration + arcsAnimationDuration + logoAnimationDuration + taglineAnimationDuration);
});

function initGlobeAnimation() {
  const globeContainer = document.getElementById('globe-container');
  
  // Create the globe using Three.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  globeContainer.appendChild(renderer.domElement);
  
  // Create globe geometry
  const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
  
  // Create globe material with custom shader to highlight Korea
  const globeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      globeTexture: { value: new THREE.TextureLoader().load('assets/world-map.png') },
      koreaPosition: { value: new THREE.Vector3(0.8, 0.5, 0.2) }, // Approximate position of Korea on the sphere
      highlightColor: { value: new THREE.Color(0x60C1A3) }, // Mint color for Korea
      highlightRadius: { value: 0.1 } // Size of highlight
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D globeTexture;
      uniform vec3 koreaPosition;
      uniform vec3 highlightColor;
      uniform float highlightRadius;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec4 texColor = texture2D(globeTexture, vUv);
        
        // Calculate distance from current position to Korea position
        float dist = distance(normalize(vPosition), normalize(koreaPosition));
        
        // Highlight Korea
        if (dist < highlightRadius) {
          // Blend between texture color and highlight color based on distance
          float blendFactor = 1.0 - (dist / highlightRadius);
          gl_FragColor = mix(texColor, vec4(highlightColor, 1.0), blendFactor);
        } else {
          gl_FragColor = texColor;
        }
      }
    `
  });
  
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);
  
  camera.position.z = 10;
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the globe slowly
    globe.rotation.y += 0.005;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Make globe responsive
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animateArcs() {
  const arcsContainer = document.getElementById('arcs-container');
  
  // Define source points around the globe
  const sourcePoints = [
    { x: '10%', y: '20%' }, // North America
    { x: '15%', y: '60%' }, // South America
    { x: '45%', y: '25%' }, // Europe
    { x: '48%', y: '45%' }, // Africa
    { x: '75%', y: '65%' }, // Australia
    { x: '65%', y: '30%' }  // Central Asia
  ];
  
  // Korea destination point (center of the highlighted area)
  const koreaPoint = { x: '80%', y: '35%' };
  
  // Create and animate arcs
  sourcePoints.forEach((source, index) => {
    const arc = document.createElement('div');
    arc.className = 'arc';
    arcsContainer.appendChild(arc);
    
    // Set arc path using SVG
    const svgArc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgArc.setAttribute('width', '100%');
    svgArc.setAttribute('height', '100%');
    svgArc.style.position = 'absolute';
    svgArc.style.top = '0';
    svgArc.style.left = '0';
    svgArc.style.pointerEvents = 'none';
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Calculate control point for curved arc
    const controlX = (parseFloat(source.x) + parseFloat(koreaPoint.x)) / 2;
    const controlY = Math.min(parseFloat(source.y), parseFloat(koreaPoint.y)) - 20;
    
    const pathData = `M ${source.x} ${source.y} Q ${controlX}% ${controlY}% ${koreaPoint.x} ${koreaPoint.y}`;
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'white');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-dasharray', '1000');
    path.setAttribute('stroke-dashoffset', '1000');
    
    svgArc.appendChild(path);
    arcsContainer.appendChild(svgArc);
    
    // Animate the arc
    setTimeout(() => {
      path.style.transition = `stroke-dashoffset ${arcsAnimationDuration}ms ease-out`;
      path.style.strokeDashoffset = '0';
    }, index * 200); // Stagger the animations
  });
}

function animateLogo() {
  const logoContainer = document.getElementById('logo-container');
  const logoText = "Konnect";
  
  // Clear any existing content
  logoContainer.innerHTML = '';
  
  // Create and animate each letter
  [...logoText].forEach((letter, index) => {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = letter;
    letterSpan.className = 'logo-letter';
    letterSpan.style.opacity = '0';
    letterSpan.style.transform = 'translateY(20px)';
    letterSpan.style.color = '#FF6B00'; // Vibrant orange
    letterSpan.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
    letterSpan.style.transitionDelay = `${index * 0.1}s`;
    
    logoContainer.appendChild(letterSpan);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      letterSpan.style.opacity = '1';
      letterSpan.style.transform = 'translateY(0)';
    }, 50);
  });
}

function animateTagline() {
  const taglineElement = document.getElementById('tagline');
  
  taglineElement.textContent = "Your Home Away From Home";
  taglineElement.style.opacity = '0';
  
  // Trigger fade-in animation
  setTimeout(() => {
    taglineElement.style.transition = `opacity ${taglineAnimationDuration}ms ease`;
    taglineElement.style.opacity = '1';
  }, 50);
}

function showSwipeIndicator() {
  const swipeIndicator = document.getElementById('swipe-indicator');
  
  swipeIndicator.style.opacity = '0';
  swipeIndicator.style.display = 'flex';
  
  // Fade in the swipe indicator
  setTimeout(() => {
    swipeIndicator.style.transition = 'opacity 0.5s ease';
    swipeIndicator.style.opacity = '1';
  }, 50);
  
  // Set up swipe detection
  setupSwipeDetection();
}

function setupSwipeDetection() {
  const splashScreen = document.getElementById('splash-screen');
  let startY, endY;
  
  splashScreen.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });
  
  splashScreen.addEventListener('touchend', (e) => {
    endY = e.changedTouches[0].clientY;
    handleSwipe();
  });
  
  // For desktop/testing
  splashScreen.addEventListener('mousedown', (e) => {
    startY = e.clientY;
  });
  
  splashScreen.addEventListener('mouseup', (e) => {
    endY = e.clientY;
    handleSwipe();
  });
  
  function handleSwipe() {
    const diffY = startY - endY;
    
    // If swiped up more than 50px
    if (diffY > 50) {
      // Transition to onboarding
      transitionToOnboarding();
    }
  }
}

function transitionToOnboarding() {
  const splashScreen = document.getElementById('splash-screen');
  const onboardingScreen = document.getElementById('onboarding-screen');
  
  // Animate splash screen out
  splashScreen.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  splashScreen.style.transform = 'translateY(-100%)';
  splashScreen.style.opacity = '0';
  
  // Show onboarding screen
  setTimeout(() => {
    splashScreen.style.display = 'none';
    onboardingScreen.style.display = 'block';
    
    // Initialize onboarding
    initOnboarding();
  }, 500);
}

// This function will be called when transitioning to onboarding
function initOnboarding() {
  // Show language selection as first step
  showLanguageSelection();
}
