<template>
  <transition
    appear
    appear-class="fade-enter"
    appear-active-class="fade-enter-active"
    name="fade"
    mode="out-in"
  >
    <div
      v-if="
        !documentIsSelected || (documentIsSelected && isCurrentDocumentSelected)
      "
      :class="[
        isCurrentDocumentSelected
          ? 'h-screen/90 p-3 md:p-10 w-full '
          : 'w-1/3 p-4 md:p-12',
      ]"
    >
      <div
        v-if="!isCurrentDocumentSelected"
        class="w-full hover:scale-110 transform transition-default duration-500 shadow-lg md:shadow-2xl cursor-pointer select-none"
        tabindex="1"
        @click="viewDocument"
      >
        <img :src="coverPage" class="w-full h-full" :alt="documentItem.name" />
      </div>
      <flipbook
        v-else
        class="w-full h-full justify-center flex flex-col-reverse"
        :pages="documentItem.value"
        :gloss="0.4"
        :perspective="6000"
        v-slot="flipbook"
      >
        <document-options :flipbook="flipbook"></document-options>
      </flipbook>
    </div>
  </transition>
</template>

<script>
  import Flipbook from "flipbook-vue";
  import { computed, defineComponent } from "@vue/composition-api";
  import { usePdfManager } from "../providers/provider";
  import DocumentOptions from "./DocumentOptions.vue";

  export default defineComponent({
    components: {
      Flipbook,
      DocumentOptions,
    },
    props: {
      documentItem: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const pdfManager = usePdfManager();

      const coverPage = computed(() => props.documentItem.value[1]);

      const isCurrentDocumentSelected = computed(
        () => props.documentItem.name === pdfManager.selectedDocument.value.name
      );

      const viewDocument = () => pdfManager.viewDocument(props.documentItem);
      return {
        coverPage,
        isCurrentDocumentSelected,
        documentIsSelected: pdfManager.isDocumentSelected,
        viewDocument,
        pdfManager,
      };
    },
  });
</script>
<style>
  .bounding-box {
    -webkit-box-shadow: 0px 5px 15px 5px rgba(53, 53, 53, 0.48);
    box-shadow: 0px 5px 15px 5px rgba(53, 53, 53, 0.48);
  }
  .click-to-flip {
    display: none;
  }
  .fade-enter-active {
    transition: opacity 1s;
    transform: translateY(0);
  }
  .fade-enter/* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>