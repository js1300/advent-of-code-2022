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

    var groups = this.groupRucksacks(rucksacks, 3);
    var group_priority_sum = 0;

    groups.forEach((group) => {
      [...group[0]].every((item) => {
        if (group[1].includes(item) && group[2].includes(item)) {
          group_priority_sum += this.retrieveItemPriority(item);

          return false;
        }

        return true;
      });
    });
    
    return { part_one: priority_sum, part_two: group_priority_sum };
  }

  static retrieveItemPriority(item) {
    var char_code = item.charCodeAt(0);

    return item.toUpperCase() === item ? char_code - 38 : char_code - 96;
  }

  static groupRucksacks(rucksacks, group_size) {
    var groups = new Array();

    for (var i = 0; i < rucksacks.length; i += group_size) {
      groups.push(rucksacks.slice(i, i + group_size));
    }

    return groups;
  }
}
