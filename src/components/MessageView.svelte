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

<div class="border">
  <textarea
    disabled
    bind:this={component}
  >{messages.join('\n')}</textarea>
</div>

<style>
  textarea {
    font-family: monospace;
    width: 100%;
    height: 96px;
    resize: none;
    overflow-y: auto;
    border: none;
  }
  
  textarea:disabled {
    color: black;
  }
  
  .border {
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
  }
  
  @media (max-width: 767px) {
    .border {
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
