<template>
    <Button @click.prevent="$emit('click')"
            class="rounded-full font-condensed leading-loose px-6 py-2 border border-yellow-400 font-bold whitespace-no-wrap hover:bg-yellow-300 hover:border-transparent focus:bg-yellow-300 focus:border-transparent focus:outline-none active:bg-yellow-300 active:border-transparent">
        <slot/>
        <template v-if="icon !== ''">
            <svg v-if="icon === 'plus'" class="align-middle -mt-1 ml-2" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    <polygon id="plus-a"
                             points="21 10.444 12.556 10.444 12.556 2 10.444 2 10.444 10.444 2 10.444 2 12.556 10.444 12.556 10.444 21 12.556 21 12.556 12.556 21 12.556"/>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <mask id="plus-b" fill="#fff">
                        <use xlink:href="#plus-a"/>
                    </mask>
                    <g fill="#2A1D03" mask="url(#plus-b)">
                        <rect width="24" height="24"/>
                    </g>
                </g>
            </svg>
        </template>
    </Button>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: ''
      }
    }
  }
</script>
