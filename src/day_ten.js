class DayTen {

  static execute() {
    var lines = day_ten_data.split('\n');
    var register = 1;
    var cycle_count = 1;
    var featured_cycles = [20, 60, 100, 140, 180, 220];
    var total_signal_strength = 0;

    lines.forEach((line) => {
      if (line.startsWith("noop")) {
        cycle_count += 1;
        total_signal_strength += this.calculate_signal_strength(register, cycle_count, featured_cycles);
      } else if (line.startsWith("addx")) {
        cycle_count += 1;
        total_signal_strength += this.calculate_signal_strength(register, cycle_count, featured_cycles);

        register += parseInt(line.split(" ")[1]);

        cycle_count += 1;
        total_signal_strength += this.calculate_signal_strength(register, cycle_count, featured_cycles);
      }
    });
    
    return { part_one: total_signal_strength, part_two: 0 };
  }

  static calculate_signal_strength(register, cycle_count, featured_cycles) {
    if (featured_cycles.includes(cycle_count)) {
      return cycle_count * register;
    }

    return 0;
  }
}
