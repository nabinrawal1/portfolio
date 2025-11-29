// Enhanced Neural Network with Technology Logos and Profile Frame Integration
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('neuralNetwork');
    const ctx = canvas.getContext('2d');
    
    // Performance and quality settings
    const DPR = window.devicePixelRatio || 1;
    let animationId;
    let frameAnimationId;
    
    // Set canvas size with high DPI support
    function setCanvasSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        canvas.width = width * DPR;
        canvas.height = height * DPR;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        ctx.scale(DPR, DPR);
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Color palette for a more cohesive look
    const colors = {
        background: {
            node: 'rgba(255, 255, 255, 0.6)',
            connection: 'rgba(255, 255, 255, 0.15)'
        },
        frame: {
            node: 'rgba(78, 204, 163, 0.9)',
            glow: 'rgba(78, 204, 163, 0.4)',
            connection: 'rgba(78, 204, 163, 0.5)'
        },
        outer: {
            node: 'rgba(0, 180, 216, 0.8)',
            glow: 'rgba(0, 180, 216, 0.3)',
            connection: 'rgba(0, 180, 216, 0.4)'
        },
        accent: {
            node: 'rgba(238, 108, 77, 0.8)',
            glow: 'rgba(238, 108, 77, 0.3)'
        },
        tech: {
            javascript: 'rgba(247, 223, 30, 0.9)',
            python: 'rgba(53, 114, 165, 0.9)',
            cpp: 'rgba(0, 90, 156, 0.9)',
            react: 'rgba(97, 218, 251, 0.9)'
        }
    };
    
    // Global nodes array for both background and profile
    const allNodes = [];
    
    // Technology Logo Node Class
    class TechLogoNode {
        constructor(tech) {
            this.tech = tech;
            this.type = 'tech';
            this.x = Math.random() * (canvas.width / DPR - 200) + 100;
            this.y = Math.random() * (canvas.height / DPR - 200) + 100;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = 24;
            this.baseSize = 24;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.01 + 0.005;
            this.alpha = 0;
            this.fadeDirection = 1;
            this.fadeSpeed = 0.02;
            
            // Load logo image
            this.img = new Image();
            this.img.src = this.getLogoSrc();
            this.img.onload = () => {
                this.alpha = 0.8;
            };
            
            this.color = colors.tech[tech];
            this.glowColor = this.color.replace('0.9', '0.3');
        }
        
        getLogoSrc() {
            const logos = {
                javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
                python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
                cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
                react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
            };
            return logos[this.tech];
        }
        
        update(time) {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            this.pulsePhase += this.pulseSpeed;
            
            // Boundary checking with bounce
            const margin = 50;
            if (this.x < margin || this.x > canvas.width / DPR - margin) {
                this.vx *= -0.8;
                this.x = Math.max(margin, Math.min(canvas.width / DPR - margin, this.x));
            }
            if (this.y < margin || this.y > canvas.height / DPR - margin) {
                this.vy *= -0.8;
                this.y = Math.max(margin, Math.min(canvas.height / DPR - margin, this.y));
            }
            
            // Pulsing size effect
            this.size = this.baseSize + Math.sin(this.pulsePhase) * 3;
            
            // Fade in/out effect
            this.alpha += this.fadeDirection * this.fadeSpeed;
            if (this.alpha >= 0.8) {
                this.alpha = 0.8;
                this.fadeDirection = -1;
            } else if (this.alpha <= 0.3) {
                this.alpha = 0.3;
                this.fadeDirection = 1;
            }
        }
        
        draw() {
            if (!this.img.complete) return;
            
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Glow effect
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(0, 0, this.size * 0.5, 0, 0, this.size * 1.5);
            gradient.addColorStop(0, this.glowColor);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Draw logo
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
            
            // Tech name label
            ctx.restore();
            ctx.save();
            ctx.globalAlpha = this.alpha * 0.8;
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.tech.charAt(0).toUpperCase() + this.tech.slice(1), this.x, this.y + this.size + 15);
            ctx.restore();
        }
    }
    
    // Enhanced Background Node class
    class BackgroundNode {
        constructor() {
            this.x = Math.random() * canvas.width / DPR;
            this.y = Math.random() * canvas.height / DPR;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.5 + 0.5;
            this.baseAlpha = Math.random() * 0.3 + 0.1;
            this.alpha = this.baseAlpha;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.type = 'background';
        }
        
        update(time) {
            this.x += this.vx;
            this.y += this.vy;
            
            // Soft boundary with gentle push back
            const margin = 50;
            if (this.x < -margin) this.vx = Math.abs(this.vx) * 0.5;
            if (this.x > canvas.width / DPR + margin) this.vx = -Math.abs(this.vx) * 0.5;
            if (this.y < -margin) this.vy = Math.abs(this.vy) * 0.5;
            if (this.y > canvas.height / DPR + margin) this.vy = -Math.abs(this.vy) * 0.5;
            
            // Pulsing alpha effect
            this.pulsePhase += this.pulseSpeed;
            this.alpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.background.node.replace('0.6', this.alpha.toFixed(2));
            ctx.fill();
            
            // Subtle glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(
                this.x, this.y, this.radius,
                this.x, this.y, this.radius * 2
            );
            gradient.addColorStop(0, colors.background.node.replace('0.6', (this.alpha * 0.5).toFixed(2)));
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // Create optimized number of background nodes based on screen size
    const screenArea = (canvas.width / DPR) * (canvas.height / DPR);
    const backgroundNodeCount = Math.min(100, Math.max(40, Math.floor(screenArea / 20000)));
    
    for (let i = 0; i < backgroundNodeCount; i++) {
        allNodes.push(new BackgroundNode());
    }
    
    // Create technology logo nodes
    const techNodes = ['javascript', 'python', 'cpp', 'react'];
    techNodes.forEach(tech => {
        allNodes.push(new TechLogoNode(tech));
    });
    
    // Profile Frame Animation Setup
    const profileContainer = document.querySelector('.image-container');
    const profileImg = document.querySelector('.profile-img');
    
    // Enhanced container styling
    profileContainer.style.border = 'none';
    profileContainer.style.boxShadow = 'none';
    profileContainer.style.overflow = 'visible';
    profileContainer.style.width = '300px';
    profileContainer.style.height = '300px';
    profileContainer.style.borderRadius = '50%';
    profileImg.style.width = '100%';
    profileImg.style.height = '100%';
    profileImg.style.borderRadius = '75%';
    
    // Create enhanced canvas for frame and dots
    const frameCanvas = document.createElement('canvas');
    const frameCtx = frameCanvas.getContext('2d');
    const frameDPR = window.devicePixelRatio || 1;
    
    frameCanvas.width = 400 * frameDPR;
    frameCanvas.height = 400 * frameDPR;
    frameCanvas.style.width = '400px';
    frameCanvas.style.height = '400px';
    frameCanvas.style.position = 'absolute';
    frameCanvas.style.top = '-50px';
    frameCanvas.style.left = '-50px';
    frameCanvas.style.zIndex = '2';
    frameCanvas.style.pointerEvents = 'none';
    frameCanvas.style.borderRadius = '50%';
    
    frameCtx.scale(frameDPR, frameDPR);
    
    profileContainer.style.position = 'relative';
    profileContainer.style.overflow = 'visible';
    profileContainer.appendChild(frameCanvas);
    
    // Profile position tracking
    let profileRect = profileContainer.getBoundingClientRect();
    let profileCenterX = profileRect.left + profileRect.width / 2;
    let profileCenterY = profileRect.top + profileRect.height / 2;
    
    function updateProfilePosition() {
        profileRect = profileContainer.getBoundingClientRect();
        profileCenterX = profileRect.left + profileRect.width / 2;
        profileCenterY = profileRect.top + profileRect.height / 2;
    }
    
    window.addEventListener('resize', updateProfilePosition);
    window.addEventListener('scroll', updateProfilePosition);
    
    // Enhanced Profile Node class
    class ProfileNode {
        constructor(type) {
            this.type = type;
            this.angle = Math.random() * Math.PI * 2;
            this.localX = 0;
            this.localY = 0;
            this.globalX = 0;
            this.globalY = 0;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.03 + 0.02;
            
            if (type === 'frame') {
                this.radius = 145;
                this.baseSpeed = (Math.random() * 0.01 + 0.005);
                this.speed = this.baseSpeed;
                this.size = Math.random() * 1.2 + 1;
                this.color = colors.frame.node;
                this.glowColor = colors.frame.glow;
            } else if (type === 'outer') {
                this.radius = 160 + Math.random() * 40;
                this.baseSpeed = (Math.random() * 0.02 + 0.01);
                this.speed = this.baseSpeed;
                this.size = Math.random() * 0.8 + 0.7;
                this.radialSpeed = (Math.random() - 0.5) * 0.01;
                this.targetRadius = this.radius;
                this.color = colors.outer.node;
                this.glowColor = colors.outer.glow;
            } else { // accent nodes
                this.radius = 130 + Math.random() * 30;
                this.baseSpeed = (Math.random() * 0.015 + 0.008);
                this.speed = this.baseSpeed;
                this.size = Math.random() * 0.6 + 0.5;
                this.color = colors.accent.node;
                this.glowColor = colors.accent.glow;
            }
            
            this.updateLocalPosition();
            this.updateGlobalPosition();
            allNodes.push(this);
        }
        
        updateLocalPosition() {
            this.localX = 200 + Math.cos(this.angle) * this.radius;
            this.localY = 200 + Math.sin(this.angle) * this.radius;
        }
        
        update(time) {
            this.pulsePhase += this.pulseSpeed;
            
            if (this.type === 'frame') {
                this.angle += this.speed;
            } else {
                this.angle += this.speed;
                
                // Smooth radial movement
                if (Math.abs(this.radius - this.targetRadius) > 0.1) {
                    this.radius += (this.targetRadius - this.radius) * 0.03;
                } else if (Math.random() < 0.005) {
                    this.targetRadius = this.type === 'outer' ? 
                        160 + Math.random() * 40 : 
                        130 + Math.random() * 30;
                }
            }
            
            this.updateLocalPosition();
            this.updateGlobalPosition();
        }
        
        updateGlobalPosition() {
            const containerRect = profileContainer.getBoundingClientRect();
            const scaleX = containerRect.width / 300;
            const scaleY = containerRect.height / 300;
            
            this.globalX = profileCenterX + (this.localX - 200) * scaleX;
            this.globalY = profileCenterY + (this.localY - 200) * scaleY;
        }
        
        draw() {
            // Pulsing size effect
            const pulseSize = this.size + Math.sin(this.pulsePhase) * 0.3;
            
            frameCtx.beginPath();
            frameCtx.arc(this.localX, this.localY, pulseSize, 0, Math.PI * 2);
            frameCtx.fillStyle = this.color;
            frameCtx.fill();
            
            // Enhanced glow effect
            frameCtx.beginPath();
            frameCtx.arc(this.localX, this.localY, pulseSize * 2.5, 0, Math.PI * 2);
            const gradient = frameCtx.createRadialGradient(
                this.localX, this.localY, pulseSize,
                this.localX, this.localY, pulseSize * 2.5
            );
            gradient.addColorStop(0, this.glowColor);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            frameCtx.fillStyle = gradient;
            frameCtx.fill();
        }
        
        drawOnMainCanvas() {
            const pulseSize = this.size + Math.sin(this.pulsePhase) * 0.3;
            
            ctx.beginPath();
            ctx.arc(this.globalX, this.globalY, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Glow on main canvas for better integration
            ctx.beginPath();
            ctx.arc(this.globalX, this.globalY, pulseSize * 2, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(
                this.globalX, this.globalY, pulseSize,
                this.globalX, this.globalY, pulseSize * 2
            );
            gradient.addColorStop(0, this.glowColor);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // Create profile nodes with reduced count (removed 4 dots)
    const frameNodeCount = 10; // Reduced from 12
    const outerNodeCount = 14; // Reduced from 18
    const accentNodeCount = 4; // Reduced from 6
    
    for (let i = 0; i < frameNodeCount; i++) {
        new ProfileNode('frame');
    }
    for (let i = 0; i < outerNodeCount; i++) {
        new ProfileNode('outer');
    }
    for (let i = 0; i < accentNodeCount; i++) {
        new ProfileNode('accent');
    }
    
    // Add the removed 4 dots as special background nodes with different colors
    class SpecialBackgroundNode extends BackgroundNode {
        constructor() {
            super();
            this.radius = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.4 + 0.2;
            this.pulseSpeed = Math.random() * 0.03 + 0.02;
            
            // Different colors for special nodes
            const specialColors = [
                'rgba(255, 107, 107, 0.8)',  // Coral red
                'rgba(255, 206, 107, 0.8)',  // Golden yellow
                'rgba(107, 255, 178, 0.8)',  // Mint green
                'rgba(107, 178, 255, 0.8)'   // Sky blue
            ];
            this.color = specialColors[Math.floor(Math.random() * specialColors.length)];
            this.glowColor = this.color.replace('0.8', '0.4');
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace('0.8', this.alpha.toFixed(2));
            ctx.fill();
            
            // Enhanced glow for special nodes
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(
                this.x, this.y, this.radius,
                this.x, this.y, this.radius * 3
            );
            gradient.addColorStop(0, this.glowColor.replace('0.4', (this.alpha * 0.7).toFixed(2)));
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // Add 4 special background nodes
    for (let i = 0; i < 4; i++) {
        allNodes.push(new SpecialBackgroundNode());
    }
    
    // Animation state
    let pulsePhase = 0;
    let hoverProgress = 0;
    let isHovering = false;
    let floatOffsetX = 0;
    let floatOffsetY = 0;
    let time = 0;
    
    // Enhanced connection drawing with gradients
    function drawAllConnections() {
        const connectionGroups = [];
        
        for (let i = 0; i < allNodes.length; i++) {
            for (let j = i + 1; j < allNodes.length; j++) {
                const nodeA = allNodes[i];
                const nodeB = allNodes[j];
                
                let x1, y1, x2, y2;
                
                if (nodeA.type === 'background' || nodeA.type === 'tech') {
                    x1 = nodeA.x;
                    y1 = nodeA.y;
                } else {
                    x1 = nodeA.globalX;
                    y1 = nodeA.globalY;
                }
                
                if (nodeB.type === 'background' || nodeB.type === 'tech') {
                    x2 = nodeB.x;
                    y2 = nodeB.y;
                } else {
                    x2 = nodeB.globalX;
                    y2 = nodeB.globalY;
                }
                
                const dx = x1 - x2;
                const dy = y1 - y2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                let maxDistance, opacity, lineWidth, color;
                
                if (nodeA.type === 'background' && nodeB.type === 'background') {
                    maxDistance = 120;
                    opacity = 0.15;
                    lineWidth = 0.3;
                    color = colors.background.connection;
                } else if (nodeA.type === 'tech' || nodeB.type === 'tech') {
                    maxDistance = 200;
                    opacity = 0.25;
                    lineWidth = 1;
                    color = nodeA.type === 'tech' ? 
                           colors.tech[nodeA.tech].replace('0.9', '0.3') : 
                           colors.tech[nodeB.tech].replace('0.9', '0.3');
                } else if (nodeA.type === 'frame' && nodeB.type === 'frame') {
                    maxDistance = 100;
                    opacity = 0.4;
                    lineWidth = 1.2;
                    color = colors.frame.connection;
                } else if (nodeA.type === 'outer' && nodeB.type === 'outer') {
                    maxDistance = 80;
                    opacity = 0.35;
                    lineWidth = 1;
                    color = colors.outer.connection;
                } else {
                    maxDistance = 150;
                    opacity = 0.25;
                    lineWidth = 0.8;
                    // Dynamic color based on node types
                    if ((nodeA.type === 'frame' && nodeB.type !== 'background') || 
                        (nodeB.type === 'frame' && nodeA.type !== 'background')) {
                        color = colors.frame.connection;
                    } else if ((nodeA.type === 'outer' && nodeB.type !== 'background') || 
                              (nodeB.type === 'outer' && nodeA.type !== 'background')) {
                        color = colors.outer.connection;
                    } else {
                        color = `rgba(255, 255, 255, ${opacity})`;
                    }
                }
                
                if (distance < maxDistance) {
                    const connectionOpacity = (1 - distance / maxDistance) * opacity;
                    connectionGroups.push({
                        x1, y1, x2, y2,
                        opacity: connectionOpacity,
                        lineWidth,
                        color: color.replace(/[\d.]+\)$/, `${connectionOpacity.toFixed(2)})`)
                    });
                }
            }
        }
        
        // Draw connections with proper z-ordering (thicker lines first)
        connectionGroups.sort((a, b) => b.lineWidth - a.lineWidth);
        
        connectionGroups.forEach(conn => {
            ctx.beginPath();
            ctx.moveTo(conn.x1, conn.y1);
            ctx.lineTo(conn.x2, conn.y2);
            ctx.strokeStyle = conn.color;
            ctx.lineWidth = conn.lineWidth;
            ctx.stroke();
        });
    }
    
    // Main animation loop with time parameter
    function animate(currentTime) {
        time = currentTime * 0.001; // Convert to seconds
        
        ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR);
        
        updateProfilePosition();
        
        // Update all nodes with time parameter
        allNodes.forEach(node => {
            if (node.update) node.update(time);
        });
        
        // Draw in correct order: connections first, then nodes
        drawAllConnections();
        
        allNodes.forEach(node => {
            if (node.type === 'background' || node.type === 'tech') {
                node.draw();
            } else if (node.drawOnMainCanvas) {
                node.drawOnMainCanvas();
            }
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Enhanced profile frame animation
    function animateFrame(currentTime) {
        const frameTime = currentTime * 0.001;
        pulsePhase += 0.02;
        
        // Smooth hover interpolation
        if (isHovering && hoverProgress < 1) {
            hoverProgress = Math.min(1, hoverProgress + 0.05);
        } else if (!isHovering && hoverProgress > 0) {
            hoverProgress = Math.max(0, hoverProgress - 0.05);
        }
        
        // Clear frame canvas
        frameCtx.clearRect(0, 0, 400, 400);
        
        const centerX = 200;
        const centerY = 200;
        
        // Draw profile nodes
        allNodes.forEach(node => {
            if (node.type !== 'background' && node.type !== 'tech' && node.draw) {
                node.draw();
            }
        });
        
        // Enhanced frame outline with gradient
        const outlineGradient = frameCtx.createLinearGradient(0, 0, 400, 400);
        outlineGradient.addColorStop(0, `rgba(78, 204, 163, ${0.3 + hoverProgress * 0.4})`);
        outlineGradient.addColorStop(0.5, `rgba(0, 180, 216, ${0.2 + hoverProgress * 0.3})`);
        outlineGradient.addColorStop(1, `rgba(238, 108, 77, ${0.1 + hoverProgress * 0.2})`);
        
        frameCtx.beginPath();
        frameCtx.arc(centerX, centerY, 145, 0, Math.PI * 2);
        frameCtx.strokeStyle = outlineGradient;
        frameCtx.lineWidth = 1.5 + hoverProgress;
        frameCtx.stroke();
        
        // Subtle outer glow
        frameCtx.beginPath();
        frameCtx.arc(centerX, centerY, 148, 0, Math.PI * 2);
        const glowGradient = frameCtx.createRadialGradient(
            centerX, centerY, 145,
            centerX, centerY, 160
        );
        glowGradient.addColorStop(0, 'rgba(78, 204, 163, 0.3)');
        glowGradient.addColorStop(1, 'rgba(78, 204, 163, 0)');
        frameCtx.strokeStyle = glowGradient;
        frameCtx.lineWidth = 3;
        frameCtx.stroke();
        
        // Floating animation with eased movement
        floatOffsetX = Math.sin(pulsePhase * 0.7) * (3 + hoverProgress * 2);
        floatOffsetY = Math.cos(pulsePhase * 0.5) * (2 + hoverProgress * 1.5);
        
        const scale = 1 + (hoverProgress * 0.05);
        const rotation = hoverProgress * Math.sin(pulsePhase * 0.3) * 2;
        
        profileContainer.style.transform = `
            scale(${scale}) 
            translate(${floatOffsetX}px, ${floatOffsetY}px) 
            rotate(${rotation}deg)
        `;
        
        frameAnimationId = requestAnimationFrame(animateFrame);
    }
    
    // Start enhanced animations
    animationId = requestAnimationFrame(animate);
    frameAnimationId = requestAnimationFrame(animateFrame);
    
    // Enhanced hover interactions
    profileContainer.addEventListener('mouseenter', function() {
        isHovering = true;
        allNodes.forEach(node => {
            if (node.type !== 'background' && node.type !== 'tech' && node.baseSpeed) {
                const speedMultiplier = node.type === 'frame' ? 2.5 : 
                                      node.type === 'outer' ? 3 : 2;
                node.speed = node.baseSpeed * speedMultiplier;
                node.pulseSpeed *= 1.5;
            }
        });
    });
    
    profileContainer.addEventListener('mouseleave', function() {
        isHovering = false;
        allNodes.forEach(node => {
            if (node.type !== 'background' && node.type !== 'tech' && node.baseSpeed) {
                node.speed = node.baseSpeed;
                node.pulseSpeed /= 1.5;
            }
        });
    });
    
    // Click interaction for extra effect
    profileContainer.addEventListener('click', function() {
        // Create temporary burst effect
        const burstNodes = [];
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const node = {
                localX: 200 + Math.cos(angle) * 130,
                localY: 200 + Math.sin(angle) * 130,
                globalX: profileCenterX + Math.cos(angle) * 130,
                globalY: profileCenterY + Math.sin(angle) * 130,
                size: 2,
                alpha: 1,
                drawOnMainCanvas: function() {
                    ctx.beginPath();
                    ctx.arc(this.globalX, this.globalY, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(238, 108, 77, ${this.alpha})`;
                    ctx.fill();
                }
            };
            burstNodes.push(node);
            allNodes.push(node);
            
            // Animate burst
            setTimeout(() => {
                const index = allNodes.indexOf(node);
                if (index > -1) {
                    allNodes.splice(index, 1);
                }
            }, 600);
            
            // Fade out
            let fadeInterval = setInterval(() => {
                node.alpha -= 0.05;
                node.size += 0.1;
                if (node.alpha <= 0) {
                    clearInterval(fadeInterval);
                }
            }, 30);
        }
    });
    
    // Clean up on page hide
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
            cancelAnimationFrame(frameAnimationId);
        } else {
            animationId = requestAnimationFrame(animate);
            frameAnimationId = requestAnimationFrame(animateFrame);
        }
    });
    
    // Existing navigation and UI code (keep your original implementation)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Enhanced skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    const skillSection = document.querySelector('#skills');
    
    function animateSkillBars() {
        const rect = skillSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
        
        if (isInView) {
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                bar.style.opacity = '1';
                bar.style.transition = 'width 1.5s ease-out, opacity 0.5s ease-out';
            });
        }
    }
    
    // Throttled scroll handler for performance
    let scrollTimeout;
    function throttledScrollHandler() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                animateSkillBars();
                scrollTimeout = null;
            }, 50);
        }
    }
    
    animateSkillBars();
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Enhanced navbar with blur effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.style.background = 'rgba(23, 30, 55, 1)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(23, 30, 55, 1)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});