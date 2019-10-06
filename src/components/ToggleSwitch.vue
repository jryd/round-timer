<template>
  <label
    @click.prevent="$emit('checkedChange', !checked)"
    class="flex items-center cursor-pointer"
  >
    <div
      class="relative w-10 h-6 transition-all flex items-center rounded-full border-2"
      :class="containerClasses"
    >
      <div
        class="absolute w-4 h-4 transition-all rounded-full mx-1"
        :class="pillClasses"
      ></div>

      <input
        class="absolute opacity-0 pointer-events-none"
        type="checkbox"
        :name="name"
        :checked="checked"
        @focus="focused = true"
        @blur="focused = false"
        @change="$emit('checkedChange', $event.target.checked)"
      />
    </div>

    <div class="inline-block pl-2 lh-10 text-sm 600">
      <slot />
    </div>
  </label>
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "checkedChange"
  },
  props: {
    checked: Boolean,
    name: String,
    readonly: Boolean
  },
  data() {
    return {
      focused: false
    };
  },
  computed: {
    containerClasses() {
      return {
        "border-grey-400": !this.checked && !this.focused,
        "border-grey-600": !this.checked && this.focused,
        "border-green-500": this.checked && !this.focused,
        "border-green-700": this.checked && this.focused
      };
    },
    pillClasses() {
      return {
        "bg-gray-400": !this.checked,
        "bg-green-500": this.checked,
        "left-0": !this.checked,
        "right-0": this.checked
      };
    }
  }
};
</script>
