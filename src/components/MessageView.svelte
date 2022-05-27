<script type="ts">
  export let messages: string[];
  let scrollToBottom = true;
  let component: Element;
  let lastMessageIndex = 0;
  $: {
    if (component) {
      if (scrollToBottom) {
        lastMessageIndex = messages.length - 1;
      }
    }
  }
  const onScroll = () => {
    scrollToBottom = (component.scrollTop >= component.scrollHeight - component.clientHeight);
  };
  
  let lastFourMessages: string[];
  $: {
    let startIndex = Math.max(0, lastMessageIndex - 3);
    lastFourMessages = messages.slice(startIndex, startIndex + 4);
  }
</script>

<textarea
  readonly
  bind:this={component}
  on:scroll={onScroll}
>{lastFourMessages.join('\n')}</textarea>

<style>
  textarea {
    font-family: monospace;
    width: 100%;
    height: 72px;
    resize: none;
  }
</style>
