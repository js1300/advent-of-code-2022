class DayFour {

  static execute() {
    var pairs = day_four_data.split('\n');
    var redundancy_count = 0;

    pairs.forEach((pair) => {
      var elves = pair.split(",");
      var elf_one_bounds = elves[0].split("-");
      var elf_two_bounds = elves[1].split("-");
      var elf_one_lower = parseInt(elf_one_bounds[0]);
      var elf_one_upper = parseInt(elf_one_bounds[1]);
      var elf_two_lower = parseInt(elf_two_bounds[0]);
      var elf_two_upper = parseInt(elf_two_bounds[1]);
      
      if ((elf_one_lower <= elf_two_lower && elf_one_upper >= elf_two_upper) || (elf_two_lower <= elf_one_lower && elf_two_upper >= elf_one_upper)) {
        redundancy_count += 1;
      }
    });

    return { part_one: redundancy_count, part_two: 0 };
  }
}