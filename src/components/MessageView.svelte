<script type="ts">
  export let messages: string[];
  let component: Element;
  
  $: {
    messages;
    if (component) {
      component.scrollTop = component.scrollHeight;
    }
  }
</script>

<div class="container">
  <textarea
    disabled
    bind:this={component}
  >{messages.join('\n')}</textarea>
</div>

<style>
  textarea {
    font-family: monospace;
    width: 100%;
    height: 100%;
    resize: none;
    overflow-y: auto;
    border: none;
  }
  
  textarea:disabled {
    color: black;
  }
  
  .container {
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    width: 640px;
    height: 140px;
  }
  
  @media (max-width: 767px) {
    .container {
      border-radius: 0;
    }
    @media (orientation: portrait) {
      textarea {
        height: 48px;
      }
    }

    @media (orientation: landscape) {
      textarea {
        height: 100%;
      }
    }
  }
</style>
