class DayThree {
  
  static execute() {
    var rucksacks = day_three_data.split('\n');
    var priority_sum = 0;

    rucksacks.forEach((rucksack) => {
      var first_compartment = rucksack.slice(0, rucksack.length / 2);
      var second_compartment = rucksack.slice(rucksack.length / 2, rucksack.length);

      [...first_compartment].every((item) => {
        if (second_compartment.includes(item)) {
          priority_sum += this.retrieveItemPriority(item);

          return false;
        }

        return true;
      });
    });
    
    return { part_one: priority_sum, part_two: 0 };
  }

  static retrieveItemPriority(item) {
    var char_code = item.charCodeAt(0);

    return item.toUpperCase() === item ? char_code - 38 : char_code - 96;
  }
}
