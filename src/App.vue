<template>
  <div id="app" class="select-none font-sans w-full h-screen overflow-hidden">
    <img
      src="./assets/background.png"
      class="object-cover absolute w-full h-full transform rotate-180"
      style="z-index: -10"
    />
    <div class="flex flex-col h-screen w-full justify-between">
      <HeaderBar />
      <DocumentsList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide } from "@vue/composition-api";
import HeaderBar from "./components/HeaderBar.vue";
import DocumentsList from "./components/DocumentsList.vue";
import { withPdfManager } from "./providers/withPdfManager";
import { PdfManagerInjectionKey } from "./providers/types/PdfManagerInjectionKey";
export default defineComponent({
  components: {
    HeaderBar,
    DocumentsList,
  },
  setup() {
    const pdfManager = withPdfManager();
    provide(PdfManagerInjectionKey, pdfManager);
    onMounted(() => {
      pdfManager.prepareDocuments().catch((e) => console.log("Error:", e));
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
  background-color: rgb(168, 168, 168);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(150, 150, 150);
}
</style>
