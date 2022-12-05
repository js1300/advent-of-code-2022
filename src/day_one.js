class DayOne {
  
  static execute() {
    var elves = day_one_data.split('\n\n');
    var calories = new Array();

    elves.forEach((elf) => {
      calories.push(elf.split('\n').reduce((a, b) => parseInt(a) + parseInt(b), 0));
    });

    calories.sort().reverse();

    return { part_one: calories[0], part_two: calories.slice(0, 3).reduce((a, b) => a + b, 0) };
  }

}
