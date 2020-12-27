<template>
  <svg width="200" height="200" viewBox="0 0 100 100">
    <polyline class="line-cornered stroke-still" points="0,0 100,0 100,100" stroke-width="10" fill="none"></polyline>
    <polyline class="line-cornered stroke-still" points="0,0 0,100 100,100" stroke-width="10" fill="none"></polyline>
    <polyline class="line-cornered stroke-animation" points="0,0 100,0 100,100" stroke-width="10" fill="none"></polyline>
    <polyline class="line-cornered stroke-animation" points="0,0 0,100 100,100" stroke-width="10" fill="none"></polyline>
  </svg>
</template>

<script>
export default {
name: "Preloader"
}
</script>

<style scoped>
body {
  background: #696969 !important;
}

svg {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(1);
  transform: translate(-50%, -50%) rotate(45deg) scale(1);
}

.stroke-still {
  stroke: #008ecc;
}

.stroke-animation {
  -webkit-animation: stroke-spacing 1.2s ease-in, stroke-color 4.8s linear;
  animation: stroke-spacing 1.2s ease-in, stroke-color 4.8s linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-delay: 0;
  animation-delay: 0;
  -webkit-animation-direction: normal;
  animation-direction: normal;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-play-state: running;
  animation-play-state: running;
  -webkit-transform-origin: center center;
  transform-origin: center center;
}

@-webkit-keyframes stroke-spacing {
  0% {
    stroke-dasharray: 0 200;
  }
  45% {
    stroke-dashoffset: 0;
    stroke-dasharray: 200 200;
  }
  90% {
    stroke-dashoffset: -200;
    stroke-dasharray: 200 200;
  }
  100% {
    stroke-dashoffset: -200;
    stroke-dasharray: 200 200;
  }
}

@keyframes stroke-spacing {
  0% {
    stroke-dasharray: 0 200;
  }
  45% {
    stroke-dashoffset: 0;
    stroke-dasharray: 200 200;
  }
  90% {
    stroke-dashoffset: -200;
    stroke-dasharray: 200 200;
  }
  100% {
    stroke-dashoffset: -200;
    stroke-dasharray: 200 200;
  }
}

@-webkit-keyframes stroke-color {
  0%  { stroke: #236591; }
  24% { stroke: #1d477a; }
  25% { stroke: #003f5f; }
  49% { stroke: #00273b; }
  50% { stroke: #2e5585; }
  74% { stroke: #256b99; }
  75% { stroke: #18557e; }
  99% { stroke: #216491; }
}

@keyframes stroke-color {
  0%  { stroke: #236591; }
  24% { stroke: #1d477a; }
  25% { stroke: #003f5f; }
  49% { stroke: #00273b; }
  50% { stroke: #2e5585; }
  74% { stroke: #256b99; }
  75% { stroke: #18557e; }
  99% { stroke: #216491; }
}
</style>
