<template>
  <div id="app">
    <b-modal id="modal-search" size="lg" :hide-footer="true" :hide-header="true">
      <div class="d-flex flex-row justify-content-center align-items-center">
        <fa class="search-icon" :icon="['fas', 'search']" />
        <input
          ref="search"
          class="form-control form-control-lg"
          type="text"
          placeholder="Search ..."
          v-model="text_search"
          autofocus
        />
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";

@Component
export default class Searchbar extends Vue {
  @Ref() readonly search!: HTMLInputElement;

  text_search: string = "";
  showModal: boolean = false;

  created() {}

  mounted() {
    window.addEventListener("keypress", this.onKeyUp);
  }

  destroyed() {
    window.removeEventListener("keypress", this.onKeyUp);
  }

  onKeyUp(event: KeyboardEvent) {
    console.log(event);
    if (event.key == "Enter") {

      //this will emit the current value to the father component
      if (this.showModal == true) {
        this.$bvModal.hide("modal-search");
        if(this.text_search != "" && this.text_search != undefined){
            this.$emit('onSearch', this.text_search);
        }
      }

      //This will reset the input value and focus it
      if (this.showModal == false) {
        this.$bvModal.show("modal-search");
        this.text_search = "";
        setTimeout(() => {
          this.$nextTick(() => this.search.focus());
        }, 100);
      }

      this.showModal = !this.showModal;
    }
  }
}
</script>

<style lang="scss">
.search-icon {
  margin-left: 1rem;
  font-size: 1.5rem;
  color: gray;
}

.form-control {
  border-color: transparent;

  &:focus {
    box-shadow: none;
    border-color: transparent;
  }
}
</style>