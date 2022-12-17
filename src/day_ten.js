class DayTen {

  static execute() {
    var lines = day_ten_data.split('\n');
    var register = 1;
    var cycle_count = 1;
    var featured_cycles = [20, 60, 100, 140, 180, 220];
    var total_signal_strength = 0;
    // TODO: rename this...
    var output = ["", "", "", "", "", ""];

    lines.forEach((line) => {
      cycle_count += 1;
      total_signal_strength += this.calculate_signal_strength(register, cycle_count, featured_cycles);

      if (line.startsWith("addx")) {
        register += parseInt(line.split(" ")[1]);

        cycle_count += 1;
        total_signal_strength += this.calculate_signal_strength(register, cycle_count, featured_cycles);
      }
    });

    register = 1;
    cycle_count = 1;

    // TODO: the first column seems to be missing - RFKZCPEF
    lines.forEach((line) => {
      this.draw_pixel(register, cycle_count, output);
      cycle_count += 1;
      
      if (line.startsWith("addx")) {
        register += parseInt(line.split(" ")[1]);

        this.draw_pixel(register, cycle_count, output);
        cycle_count += 1;
      }
    });

    output.forEach((output_line) => {
      console.log(output_line);
    });

    return { part_one: total_signal_strength, part_two: "See console output!" };
  }

  static calculate_signal_strength(register, cycle_count, featured_cycles) {
    if (featured_cycles.includes(cycle_count)) {
      return cycle_count * register;
    }

    return 0;
  }

  static draw_pixel(register, cycle_count, output) {
    var zero_based_register = register - 1;
    var zero_based_cycle_count = cycle_count - 1;
    var output_row = parseInt(zero_based_cycle_count / 40);
    var output_column = zero_based_cycle_count % 40;
    var pixel = ".";

    if (output_column >= zero_based_register - 1 && output_column <= zero_based_register + 1) {
      pixel = "#";
    }

    output[output_row] += pixel;
  }
}
