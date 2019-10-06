<template>
    <div class="bg-white shadow-lg rounded-lg p-8" style="min-width:32.5rem">
        <h1 class="text-gray-800 text-3xl leading-normal mb-2">Round Timer</h1>

        <hr class="h-px bg-gray-200 w-full mb-6" />

        <!-- <div class="mb-4">
                <label class="uppercase text-gray-500 tracking-wider text-xs block mb-2">Rounds</label>
                <input type="number" class="bg-gray-300 p-2 rounded-sm focus:outline-none w-16 " v-model.number="timer.rounds.current" /> <span class="uppercase text-gray-500 text-xs mx-2">of</span> <input autofocus class="bg-gray-300 p-2 rounded-sm focus:outline-none w-16 " type="number" v-model.number="timer.rounds.total" />
        </div>-->
        <div class="mb-4">
            <label class="uppercase text-gray-500 tracking-wider text-xs block mb-2"
                >Time per round</label
            >
            <div class="flex justify-start">
                <div class="bg-gray-300 p-2 rounded-sm flex items-center mr-2 w-24">
                    <input
                        type="number"
                        class="appearance-none focus:outline-none bg-gray-300 flex-grow w-full"
                        v-model.number="timer.timePerRound.minutes"
                    />
                    <p class="ml-2 font-semibold">mins</p>
                </div>
                <div class="bg-gray-300 p-2 rounded-sm flex items-center w-24">
                    <input
                        type="number"
                        class="appearance-none focus:outline-none bg-gray-300 flex-grow w-full"
                        v-model.number="timer.timePerRound.seconds"
                    />
                    <p class="ml-2 font-semibold">secs</p>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <label class="uppercase text-gray-500 tracking-wider text-xs block mb-2"
                >Sound alerts</label
            >
            <p v-if="!timer.soundAlerts.length">No sound alerts added.</p>
            <div v-else
                 v-for="(alert,index) in orderedAlerts" :key="index"
                 class="flex items-center border-b py-3 border-gray-300"
                 :class="{ 'border-t': index === 0 }">
                <div class="bg-gray-600 rounded-full  text-white w-8 h-8 flex items-center justify-center mr-4">
                  {{ index + 1 }}
                </div>

                <div class="mr-4 flex items-center">
                    Sounding at
                    <span v-if="!alert.editing" class="font-semibold mx-1 py-2">{{ alert.minutes }}</span>
                    <div v-else class="bg-gray-300 p-2 rounded-sm flex items-center mr-2 w-12 mx-1">
                        <input
                            type="number"
                            class="appearance-none focus:outline-none bg-gray-300 flex-grow w-full"
                            v-model.number="alert.minutes"
                        />
                    </div>
                    minutes and
                    <span v-if="!alert.editing" class="font-semibold mx-1 py-2">{{ alert.seconds }}</span>
                    <div v-else class="bg-gray-300 p-2 rounded-sm flex items-center mr-2 w-12 mx-1">
                        <input
                            type="number"
                            class="appearance-none focus:outline-none bg-gray-300 flex-grow w-full"
                            v-model.number="alert.seconds"
                        />
                    </div>
                    seconds
                </div>

                <div v-if="!isEditingASoundAlert"
                     @click.prevent="editAlert(index)"
                     class="cursor-pointer text-brown-200 hover:text-brown-600">
                    <Icon name="Edit"
                          class="cursor-pointer w-5 h-5 mr-2 text-brown-200 hover:text-brown-600" />
                </div>
                <div v-if="!isEditingASoundAlert"
                     @click.prevent="removeAlert(index)"
                     class="cursor-pointer text-brown-200 hover:text-red-600">
                    <Icon name="Delete"
                          class="cursor-pointer w-5 h-5 mr-2 text-brown-200 hover:text-red-600" />
                </div>

                <div v-if="alert.editing"
                     @click.prevent="alert.editing = false"
                     class="cursor-pointer text-brown-200 hover:text-red-600">
                    <Icon name="Save"
                          class="cursor-pointer w-5 h-5 mr-2 text-brown-200 hover:text-brown-600" />
                </div>
            </div>
            <PillButtonOutline class="mt-4 flex items-center" @click="addAlert">
                <Icon name="Plus" class="inline pr-2" />
                Add alert
            </PillButtonOutline>
        </div>
        <div class="flex justify-end">
            <button
                class="focus:outline-none border-b-4 text-white font-bold py-2 px-4 border-b-4 rounded"
                :class="{
                'bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500': complete,
                'bg-gray-500 border-gray-700 cursor-not-allowed': !complete
                }"
                @click="toggleTimer"
            >
                {{ submitText }}
            </button>
        </div>
        <TimerOverlay class="z-50" v-if="running"
            :timer="timer"
            @timerended="running = false" />
    </div>
</template>

<script>
  import ToggleSwitch from "./ToggleSwitch"
  import Icon from "./Icon"
  import PillButtonOutline from "./PillButtonOutline"
  import TimerOverlay from "./TimerOverlay"

  export default {
    components: {
      ToggleSwitch,
      Icon,
      PillButtonOutline,
      TimerOverlay
    },
    data() {
      return {
        timer: {
          rounds: {
            current: 1,
            total: null
          },
          timePerRound: {
            minutes: null,
            seconds: null
          },
          soundAlerts: [
              {
                minutes: 2,
                seconds: 0,
                editing: false,
              }
          ]
        },
        running: false
      };
    },
    computed: {
      orderedAlerts() {
        return this.timer.soundAlerts.sort((a,b) => {
            const aTime = (a.minutes * 60) + a.seconds
            const bTime = (b.minutes * 60) + b.seconds
            if (aTime > bTime) return -1
            if (aTime === bTime) return 0
            return 1
        })
      },
      complete() {
        return (
          this.timer.rounds.current !== null &&
          this.timer.rounds.current !== '' &&
          this.timer.rounds.current > 0 &&
          this.timer.rounds.total !== null &&
          this.timer.rounds.total !== '' &&
          this.timer.rounds.total > 0 &&
          this.timer.rounds.current <= this.timer.rounds.total &&
          this.timer.timePerRound !== null &&
          this.timer.timePerRound !== "" &&
          (!this.timer.soundAlert.enabled ||
            (this.timer.soundAlert.enabled &&
              this.timer.soundAlert.time !== null &&
              this.timer.soundAlert.time >= 0))
        );
      },
      submitText() {
        return this.running ? "Stop" : "Start";
      },
      isEditingASoundAlert() {
        return this.timer.soundAlerts.some((alert) => alert.editing)
      }
    },
    methods: {
      handleCountdownProgress(data) {
        if (this.timer.soundAlert.enabled) {
          let remainingSecondsToSoundAlert =
            this.timer.soundAlert.time.minutes * 60 +
            this.timer.soundAlert.time.seconds;
          if (data.totalSeconds === remainingSecondsToSoundAlert) {
              this.chime(1)
          }
        }
      },
      toggleTimer() {
        this.running = !this.running;
      },
    //   chime(times) {
    //     const audio = new Audio("/chime-2x.mp3");
    //     audio.loop = true
    //     audio.addEventListener('playing', () => {
    //         if (times-- == 0) {
    //             audio.pause()
    //         } else {
    //             console.log('chiming')
    //         }
    //     })
    //     audio.play()
    //   },
      addAlert() {
          this.timer.soundAlerts.push({
              minutes: 2,
              seconds: 0,
              editing: false,
          })
      },
      editAlert(index) {
        console.log(`editing item at ${index} position`)
        console.log(this.orderedAlerts[index])
        this.orderedAlerts[index].editing = true
      },
      removeAlert(index) {
        console.log(`removing item at ${index} position`)
        console.log(this.orderedAlerts[index])
        this.orderedAlerts.splice(index,1)
      },
    }
  }
</script>