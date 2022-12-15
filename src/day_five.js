class DayFive {

  static execute() {
    var data = day_five_data.split('\n\n');
    var stack_data = data[0];
    var move_data = data[1];
    var stacks = this.parse_stacks(stack_data);
    var moves = this.parse_moves(move_data);

    moves.forEach((move) => {
      for (var i = 0; i < move[0]; i++) {
        var crate = stacks[move[1] - 1].pop();
        stacks[move[2] - 1].push(crate);
      }
    });

    var part_one_message = "";

    stacks.forEach((stack) => {
      part_one_message += stack[stack.length - 1];
    });

    return { part_one: part_one_message, part_two: 0 };
  }

  static parse_stacks(stack_data) {
    var stack_rows = stack_data.split('\n');
    var total_stacks = (stack_rows[0].length + 1) / 4;
    var stacks = Array.from({length: total_stacks}, () => new Array());

    for (var i = stack_rows.length - 2; i >= 0; i--) {
      for (var j = 1; j < stack_rows[0].length - 1; j = j + 4) {
        var crate = stack_rows[i].charAt(j);

        if (crate != " ") {
          stacks[parseInt(j / 4)].push(crate);
        }
      }
    }

    return stacks;
  }

  static parse_moves(move_data) {
    var move_rows = move_data.split('\n');
    var moves = new Array();

    move_rows.forEach((move_row) => {
      moves.push(move_row.replace("move ", "").replace("from ", "").replace("to ", "").split(" "));
    });
    
    return moves;
  }
}
