<script type="ts">
  import type { RelativeDirection } from '../lib/geometry';

  export let navigate: (relativeDirection: RelativeDirection) => Promise<void>;
</script>

<div class="container">
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
  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .arrow {
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    user-select: none;
    touch-action: manipulation;
  }
  
  .arrow:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
  
  .arrow:active {
    background-color: rgba(255, 255, 255, 0.9);
  }

  .up {
    top: 36px;
    left: 50%;
  }

  .down {
    top: calc(100% - 36px);
    left: 50%;
  }

  .left {
    top: 50%;
    left: 36px;
  }

  .right {
    top: 50%;
    left: calc(100% - 36px);
  }
</style>
