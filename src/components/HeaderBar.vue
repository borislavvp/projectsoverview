<template>
  <div
    class="flex w-full justify-between items-center py-5 md:py-3 z-10 shadow-md md:shadow-xl relative"
  >
    <div
      class="px-4 md:px-16 flex flex-wrap w-full justify-between items-center"
    >
      <span
        class="text-gray-800 relative font-medium md:font-light tracking-widest text-lg md:text-5xl flex-shrink-0 select-none"
        >ILIYANA TOSHEVA
        <span
          class="text-base -mt-2 -mr-3 md:text-lg font-semibold absolute right-0 top-0 md:mt-2 md:-mr-3"
          >&copy;</span
        >
      </span>

      <socials></socials>
    </div>
    <div v-if="fetching" class="absolute w-full top-0 h-1">
      <div
        class="overflow-hidden h-full mb-4 text-xs flex shadow-lg bg-gray-400"
      >
        <div
          :style="{ width: loadingProgress + '%' }"
          class="shadow-none transition-default duration-500 flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-gray-700 to-teal-500"
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