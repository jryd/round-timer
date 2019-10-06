<template>
    <div class="fixed inset-0 bg-black flex items-center justify-center font-timer">
        <div class="timer-container flex justify-center">
            <countdown class="font-medium timer-counter text-white"
                :time="(timer.timePerRound.minutes * 60 + timer.timePerRound.seconds) * 1000"
                @end="$emit('timerended')"
                @progress="handleCountdownProgress">
                <template slot-scope="props">{{ props.totalMinutes }} :
                {{ props.seconds.toString().padStart(2, "0") }}</template>
            </countdown>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      timer: {
        type: Object,
        required: true,
      }
    },
    data() {
        return {
          soundAlerts: []
        }
    },
    created() {
        this.timer.soundAlerts.forEach(alert => {
            this.soundAlerts.push({
                secondsRemainingToSoundAt: alert.minutes * 60 + alert.seconds,
                chimes: 1
            })
        })
        this.soundAlerts.sort((a,b) => a.secondsRemainingToSoundAt - b.secondsRemainingToSoundAt)
    },
    methods: {
    handleCountdownProgress(data) {
      if (this.soundAlerts.length > 0 && this.soundAlerts[0].secondsRemainingToSoundAt >= data.totalSeconds) {
        this.chime(1)
        this.soundAlerts.splice(0,1)
      }
    },
      chime(times) {
        const audio = new Audio("/chime-2x.mp3");
        audio.loop = true
        audio.addEventListener('playing', () => {
            if (times-- == 0) {
                audio.pause()
            } else {
                console.log('chiming')
            }
        })
        audio.play()
      },
    }
  }
</script>

<style scoped>
    .timer-counter {
        font-size: 17vw;
    }
</style>