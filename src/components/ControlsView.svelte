<script type="ts">
  import type { CompassDirection, RelativeDirection } from '../types/geometry';

  export let navigate: (relativeDirection: RelativeDirection) => Promise<void>;
</script>

<div class="circle">
  <button class="arrow up" on:click={navigate('forward')}>
    ↑
  </button>
  <button class="arrow down" on:click={navigate('backward')}>
    ↓
  </button>
  <button class="arrow left" on:click={navigate('left')}>
    ←
  </button>
  <button class="arrow right" on:click={navigate('right')}>
    →
  </button>
</div>

<style>
  .circle {
    border: 1px solid black;
    border-radius: 100%;
    position: relative;
    width: 128px;
    height: 128px;
    margin: 0 auto;
  }

  .arrow {
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    font-size: 32px;
    border: none;
    border-radius: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37.5%;
    height: 37.5%;
    user-select: none;
  }
  
  .arrow:hover {
    background-color: #f8f8f8;
  }
  
  .arrow:active {
    background-color: #f0f0f0;
  }

  .up {
    top: 25%;
    left: 50%;
  }

  .down {
    top: 75%;
    left: 50%;
  }

  .left {
    top: 50%;
    left: 25%;
  }

  .right {
    top: 50%;
    left: 75%;
  }
</style>
