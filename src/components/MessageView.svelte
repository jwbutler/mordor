<script type="ts">
  export let messages: string[];
  let scrollToBottom = true;
  let component: Element;
  $: {
    if (component) {
      if (scrollToBottom) {
        // This is a dumb hack born of trial-and-error
        setTimeout(
          () => { component.scrollTop = component.scrollHeight - component.clientHeight; },
          0
        );
      }
    }
  }
  const onScroll = () => {
    scrollToBottom = (component.scrollTop >= component.scrollHeight - component.clientHeight);
  };
</script>

<textarea
  readonly
  bind:this={component}
  on:scroll={onScroll}
  on:change={() => console.log('change')}
>{messages.join('\n')}</textarea>

<style>
  textarea {
    font-family: monospace;
    width: 100%;
    height: 80px;
    overflow-y: scroll;
    resize: none;
  }
</style>
