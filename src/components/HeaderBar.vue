<template>
  <div
    class="flex w-full justify-between items-center py-5 md:py-3 z-10 shadow-md md:shadow-xl relative"
  >
    <div
      class="px-4 md:px-16 flex flex-wrap w-full justify-between items-center"
    >
      <span
        class="text-gray-800 font-medium md:font-light tracking-widest text-lg md:text-5xl flex-shrink-0 select-none"
        >ILIYANA TOSHEVA</span
      >
      <socials></socials>
    </div>
    <div v-if="fetching" class="absolute w-full bottom-0 h-2">
      <div
        class="overflow-hidden h-full mb-4 text-xs flex shadow-lg bg-gray-400"
      >
        <div
          :style="{ width: loadingProgress + '%' }"
          class="shadow-none transition-default duration-500 flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-700"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/composition-api";
  import { usePdfManager } from "../providers/provider";
  import Socials from "./Socials.vue";
  export default defineComponent({
    components: { Socials },
    setup() {
      const pdfManager = usePdfManager();
      return {
        fetching: pdfManager.fetching,
        loadingProgress: pdfManager.documentsLoaded,
      };
    },
  });
</script>

<style>
</style>