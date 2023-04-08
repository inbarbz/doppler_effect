// Define a custom AudioWorklet processor

registerProcessor(
  "sine-wave-processor",
  class extends AudioWorkletProcessor {
    // Define a constructor for the processor
    constructor() {
      super();
      this.phase = 0;
      this.sampleRate = 48000;
    }

    // Define a static getter for the processor's parameter descriptors
    static get parameterDescriptors() {
      return [
        {
          name: "frequency",
          defaultValue: 400,
          minValue: 20,
          maxValue: 20000,
          automationRate: "a-rate",
        },
      ];
    }

    // Define a process function for the processor
    process(inputs, outputs, parameters) {
      // Get the sample rate from the AudioWorklet's context
      // if (this.sampleRate !== this.context.sampleRate) {
      //   this.sampleRate = this.context.sampleRate;
      // }

      // Get the frequency parameter value from the AudioWorklet's parameters object
      const frequency = parameters.frequency[0];

      // Calculate the phase increment based on the frequency and sample rate
      const phaseIncrement = (2 * Math.PI * frequency) / this.sampleRate;

      // Loop through the output channels and samples
      for (let channel = 0; channel < outputs[0].length; ++channel) {
        for (let i = 0; i < outputs[0][channel].length; ++i) {
          // Calculate the current sample value
          const sample = Math.sin(this.phase);

          // Increment the phase by the phase increment
          this.phase += phaseIncrement;

          // Wrap the phase value between 0 and 2π
          if (this.phase >= 2 * Math.PI) {
            this.phase -= 2 * Math.PI;
          }

          // Write the sample value to the output buffer
          outputs[0][channel][i] = sample;
        }
      }

      // Return true to indicate that the processor is still running
      return true;
    }
  }
);
