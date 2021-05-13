<template>
  <div id="app" class="font-sans w-full h-screen overflow-hidden">
    <div class="flex flex-col h-screen w-full justify-between">
      <HeaderBar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    provide,
  } from "@vue/composition-api";
  import HeaderBar from "./components/HeaderBar.vue";
  import { withPdfManager } from "./providers/withPdfManager";
  import { PdfManagerInjectionKey } from "./providers/types/PdfManagerInjectionKey";
  export default defineComponent({
    components: {
      HeaderBar,
    },
    setup() {
      const pdfManager = withPdfManager();
      provide(PdfManagerInjectionKey, pdfManager);

      onMounted(() => {
        pdfManager.prepareDocuments().catch((e) => console.log(e));
      });
    },
  });
</script>
<style>
  @media (max-width: 481px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(221, 221, 221, 0.3);
    box-shadow: inset 0 0 6px rgba(209, 209, 209, 0.3);
    background-color: #ffffff;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(128, 128, 128);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(110, 110, 110);
  }
</style>