class DayEight {

  static execute() {
    var rows = day_eight_data.split('\n');
    var trees = new Array();
    var visible_tree_count = 0;

    rows.forEach((row) => {
      trees.push(row.split('').map(Number));
    });

    visible_tree_count += (trees.length * 2) + (trees[0].length * 2) - 4;
    
    for (var i = 1; i < trees.length - 1; i++) {
      for (var j = 1; j < trees[0].length - 1; j++) {
        if (this.isTreeVisible(i, j, trees)) {
          visible_tree_count += 1;
        }
      }
    }

    return { part_one: visible_tree_count, part_two: 0 };
  }

  static isTreeVisible(row, column, trees) {
    var trees_to_the_left = trees[row].slice(0, column);
    var trees_to_the_right = trees[row].slice(column + 1, trees[0].length);

    var trees_to_the_top = new Array();
    for (var i = 0; i < row; i++) {
      trees_to_the_top.push(trees[i][column]);
    }

    var trees_to_the_bottom = new Array();
    for (var i = row + 1; i < trees[0].length; i++) {
      trees_to_the_bottom.push(trees[i][column]);
    }

    var tallest_neighbour_trees = [trees_to_the_left.sort().reverse()[0], trees_to_the_right.sort().reverse()[0], trees_to_the_top.sort().reverse()[0], trees_to_the_bottom.sort().reverse()[0]];

    return trees[row][column] > tallest_neighbour_trees.sort()[0];
  }
}
