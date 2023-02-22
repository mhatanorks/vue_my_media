<!-- temp -->
<script></script>
<template></template>
<style></style>


切り替えタブ
<script>
import { ref } from "vue";
const activeButton = ref("");

function showInfo(buttonName: any) {
  activeButton.value = buttonName;
}
</script>
<template>
  <div>
    <button @click="showInfo('button1')">Button 1</button>
    <button @click="showInfo('button2')">Button 2</button>
    <button @click="showInfo('button3')">Button 3</button>
    <button @click="showInfo('button4')">Button 4</button>
    <div v-if="activeButton === 'button1'">Button 1 info here</div>
    <div v-if="activeButton === 'button2'">Button 2 info here</div>
    <div v-if="activeButton === 'button3'">Button 3 info here</div>
    <div v-if="activeButton === 'button4'">Button 4 info here</div>
  </div>
</template>

<style></style>
