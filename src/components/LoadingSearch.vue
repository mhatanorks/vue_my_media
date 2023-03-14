<template>
        <div class="flex justify-center">
            <div class="gray-scale w-32 h-44"></div><!-- img -->
            <div class="w-72 ml-4">
                <div class="gray-scale h-6"></div>
                <div class="gray-scale h-6"></div>
                <div class="gray-scale h-6"></div>
                <div class="mt-5">
                    <button class="gray-scale p-2 m-1 w-8 h-10 rounded-lg"></button>
                    <button class="gray-scale p-2 m-1 w-20 h-10 rounded-lg"></button>
                    <button class="gray-scale p-2 m-1 w-20 h-10 rounded-lg"></button>
                </div>
            </div>
        </div>
</template>

<style>
.gray-scale {
  background: linear-gradient(
    90deg,
    #c2c1c1,
    #e1e1e1,
    #c2c1c1
  ); /*グラデーションを定義*/
  background-size: 200% 200%; /*サイズを大きくひきのばす*/
  animation: bgGradient 1.5s ease infinite;
}
@keyframes bgGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
