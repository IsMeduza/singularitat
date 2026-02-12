/* Preloader bàsic - MaxSM */
class Preloader {
    preloader = document.getElementById( 'preloader' );
    ctx = this.preloader.getContext( '2d' );
    cw = this.preloader.width;
    ch = this.preloader.height;

    active = true;
    rotation = 0;
    fadeOut = 0;
    isHiding = false;

    constructor() {
        window.preloader = this;
        this.init();
        this.animate();
    }

    init() {
        this.resize();
        window.addEventListener( 'resize', () => this.resize() );
    }

    resize() {
        this.preloader.width = window.innerWidth;
        this.preloader.height = window.innerHeight;
        this.cw = this.preloader.width;
        this.ch = this.preloader.height;
    }

    animate() {
        if ( !this.active && this.fadeOut >= 1 ) return;

        this.ctx.clearRect( 0, 0, this.cw, this.ch );

        // Fons amb fade
        this.ctx.fillStyle = `rgba(0, 0, 0, ${1 - this.fadeOut})`;
        this.ctx.fillRect( 0, 0, this.cw, this.ch );

        // Loading animat amb fade
        if ( this.fadeOut < 1 ) {
            const opacity = 1 - this.fadeOut;
            this.ctx.save();
            this.ctx.translate( this.cw / 2, this.ch / 2 );
            this.ctx.globalAlpha = opacity;

            // Cercle exterior animat
            this.ctx.strokeStyle = '#ff8c00';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc( 0, 0, 40, 0, Math.PI * 2 );
            this.ctx.stroke();

            // Cercle interior que gira
            this.ctx.save();
            this.ctx.rotate( this.rotation );
            this.ctx.strokeStyle = '#ffa500';
            this.ctx.lineWidth = 4;
            this.ctx.beginPath();
            this.ctx.arc( 0, 0, 30, 0, Math.PI * 1.8 );
            this.ctx.stroke();
            this.ctx.restore();

            // Punts que giren
            for ( let i = 0; i < 3; i++ ) {
                this.ctx.save();
                this.ctx.rotate( this.rotation + ( i * Math.PI * 2 / 3 ) );
                this.ctx.fillStyle = '#ff8c00';
                this.ctx.beginPath();
                this.ctx.arc( 35, 0, 3, 0, Math.PI * 2 );
                this.ctx.fill();
                this.ctx.restore();
            }

            // Centre brillant
            const pulse = Math.sin( this.rotation * 2 ) * 0.3 + 0.7;
            this.ctx.fillStyle = `rgba(255, 140, 0, ${pulse * opacity})`;
            this.ctx.beginPath();
            this.ctx.arc( 0, 0, 8, 0, Math.PI * 2 );
            this.ctx.fill();

            this.ctx.restore();

            this.rotation += 0.08;
        }

        // Animació de fade-out
        if ( this.isHiding ) {
            this.fadeOut += 0.02;
            if ( this.fadeOut >= 1 ) {
                this.preloader.style.display = 'none';
                return;
            }
        }

        requestAnimationFrame( () => this.animate() );
    }

    hidePreloader() {
        this.active = false;
        this.isHiding = true;
    }
}

const preloader = new Preloader();
