class DayOne {
  
  static executePartOne() {
    var elves = day_one_data.split('\n\n');
    var calories = new Array();

    elves.forEach((elf) => {
      calories.push(elf.split('\n').reduce((a, b) => parseInt(a) + parseInt(b), 0));
    });

    calories.sort().reverse();

    return calories[0];
  }

}
