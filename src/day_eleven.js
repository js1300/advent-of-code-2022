class DayEleven {

  static execute() {
    var monkey_data_list = day_eleven_data.split('\n\n');

    var monkeys = this.parse_monkeys(monkey_data_list);
    var monkey_business_part_one = this.calculate_monkey_business(monkeys, 20, 3);

    monkeys = this.parse_monkeys(monkey_data_list);
    var monkey_business_part_two = this.calculate_monkey_business(monkeys, 10000, 1);

    return { part_one: monkey_business_part_one, part_two: monkey_business_part_two };
  }

  static parse_monkeys(monkey_data_list) {
    var monkeys = new Array();

    monkey_data_list.forEach((monkey_data) => {
      var monkey_data_lines = monkey_data.split('\n');
      var monkey = {};
      var operation = {};
      var test = {};

      monkey["starting_items"] = monkey_data_lines[1].substring(16).split(', ').map(Number);
      var operation_data = monkey_data_lines[2].substring(21).split(' ');
      operation["operator"] = operation_data[0];
      operation["variable"] = operation_data[1] == "old" ? 0 : parseInt(operation_data[1]);
      monkey["operation"] = operation;

      test["divisor"] = parseInt(monkey_data_lines[3].substring(19));
      test["true_outcome"] = parseInt(monkey_data_lines[4].substring(27));
      test["false_outcome"] = parseInt(monkey_data_lines[5].substring(28));
      monkey["test"] = test;

      monkey["total_inspected"] = 0;

      monkeys.push(monkey);
    });

    return monkeys;
  }

  static calculate_monkey_business(monkeys, rounds, worry_reduction_factor) {
    var divisors_least_common_multiple = monkeys.map((monkey) => monkey.test.divisor).reduce((a, b) => a * b, 1);

    for (var i = 0; i < rounds; i++) {
      monkeys.forEach((monkey) => {
        monkey.starting_items.forEach((item) => {
          var new_item = 0;
          var variable = monkey.operation.variable == 0 ? item : monkey.operation.variable;

          switch (monkey.operation.operator) {
            case "+":
              new_item = item + variable;

              break;
            case "*":
              new_item = item * variable;

              break;
          }

          new_item = new_item % divisors_least_common_multiple;

          monkey.total_inspected += 1;

          new_item = Math.floor(new_item / worry_reduction_factor);

          if (new_item % monkey.test.divisor == 0) {
            monkeys[monkey.test.true_outcome].starting_items.push(new_item);
          } else {
            monkeys[monkey.test.false_outcome].starting_items.push(new_item);
          }
        });

        monkey.starting_items = new Array();
      });
    }

    monkeys.sort((a, b) => b.total_inspected - a.total_inspected);
    
    return monkeys[0].total_inspected * monkeys[1].total_inspected;
  }
}
