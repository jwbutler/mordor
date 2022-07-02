<script type="ts">
  export let onComplete: () => void;
</script>

<div class="intro">
  <p>
    In the old times, our people worshiped the demons of the earth. The priests made offerings to keep the favor of the demons, and mankind thrived in this land.
  </p>
  
  <p>
    Then there came a messenger from the sky.  The Messenger performed many wonders, and told the people of the coming of the heavenly race.
  </p>
  
  <p>
    Those who took up the Messenger's cause were rewarded with great gifts. The messenger armed them with weapons against which none could stand.
  </p>
  
  <p>
    The priests of the earth fought back with all their power, but they failed to raise the demons to their side when they most needed. Defeated, the priests scattered across the countryside and went into hiding.
  </p>
  
  <p>
    With none left to challenge them, the Messenger and his cult of heaven put the people to work, preparing the land for the coming of the heavenly race.
  </p>
  
  <p>
    You stand at the entrance to the catacombs of XUZH. According to legend, this was once the holiest place to the priests of the earth demons. Many believe that the secrets to summon the power of the demons can still be found here, but those who dare face the unknown terror that lurk within...
  </p>
  
  <button on:click={onComplete}>
    Enter the Catacombs
  </button>
</div>

<style>
  .intro {
    width: 100%;
    height: 100%;
    font-size: 24px;
    color: black;
    text-align: center;
  }
  
  p {
    text-align: left;
  }
  
  button {
    margin: 0 auto;
    padding: 10px;
  }
</style>
