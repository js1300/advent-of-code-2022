class DayTwelve {

  // TODO: refactor and apply DRY wherever possible

  static execute() {
    var rows = day_twelve_data.split('\n');
    var elevations = new Array();
    var start = {x: 0, y: 0};
    var end = {x: 0, y: 0};

    for (var i = 0; i < rows.length; i++) {
      var start_column = rows[i].indexOf("S");
      var end_column = rows[i].indexOf("E");

      if (start_column >= 0) {
        start.x = start_column;
        start.y = i;
        rows[i] = rows[i].replace("S", "a");
      }

      if (end_column >= 0) {
        end.x = end_column;
        end.y = i;
        rows[i] = rows[i].replace("E", "z");
      }

      elevations.push(rows[i].split('').map(e => e.charCodeAt(0) - 96));
    }

    var visited = Array.from({length: elevations.length}, () => Array.from({length: elevations[0].length}, () => false));
    var part_one_result = this.breadth_first_search(start, end, elevations, visited, false);

    visited = Array.from({length: elevations.length}, () => Array.from({length: elevations[0].length}, () => false));
    var part_two_result = this.breadth_first_search(end, {elevation: 1}, elevations, visited, true);
    
    return { part_one: part_one_result, part_two: part_two_result };
  }

  static breadth_first_search(start, end, elevations, visited, reversed) {
    var queue = new Array();

    queue.push({x: start.x, y: start.y, steps: 0});
    visited[start.y][start.x] = true;

    while (queue.length > 0) {
      var current = queue[0];
      
      if (current.x == end.x && current.y == end.y) {
        return current.steps;
      }

      if (Object.hasOwn(end, "elevation")) {
        if (elevations[current.y][current.x] == end.elevation) {
          return current.steps;
        }
      } else {
        if (current.x == end.x && current.y == end.y) {
          return current.steps;
        }
      }

      var possible_moves = this.calculate_possible_moves(current, elevations, visited, reversed);

      if (possible_moves.includes("L")) {
        queue.push({x: current.x - 1, y: current.y, steps: current.steps + 1});
        visited[current.y][current.x - 1] = true;
      }
      if (possible_moves.includes("R")) {
        queue.push({x: current.x + 1, y: current.y, steps: current.steps + 1});
        visited[current.y][current.x + 1] = true;
      }
      if (possible_moves.includes("U")) {
        queue.push({x: current.x, y: current.y - 1, steps: current.steps + 1});
        visited[current.y - 1][current.x] = true;
      }
      if (possible_moves.includes("D")) {
        queue.push({x: current.x, y: current.y + 1, steps: current.steps + 1});
        visited[current.y + 1][current.x] = true;
      }

      queue.shift();
    }
  }

  static calculate_possible_moves(coordinate, elevations, visited, reversed) {
    var possible_moves = ["L", "R", "U", "D"];
    var impossible_moves = new Array();

    if (coordinate.x == 0) {
      impossible_moves.push("L");
    } else if (coordinate.x == elevations[0].length - 1) {
      impossible_moves.push("R");
    }
    if (coordinate.y == 0) {
      impossible_moves.push("U");
    } else if (coordinate.y == elevations.length - 1) {
      impossible_moves.push("D");
    }

    possible_moves = possible_moves.filter(move => !impossible_moves.includes(move));
    var args = {coordinate: coordinate, visited: visited};
    possible_moves = possible_moves.filter(this.check_unvisited, args);
    args = {coordinate: coordinate, elevations: elevations, reversed: reversed};
    return possible_moves.filter(this.check_elevation_scalability, args);
  }

  static check_elevation_scalability(move) {
    var current_elevation = this["elevations"][this["coordinate"].y][this["coordinate"].x];
    var target_elevation = null;

    switch (move) {
      case "L":
        target_elevation = this["elevations"][this["coordinate"].y][this["coordinate"].x - 1];

        break;
      case "R":
        target_elevation = this["elevations"][this["coordinate"].y][this["coordinate"].x + 1];
        
        break;
      case "U":
        target_elevation = this["elevations"][this["coordinate"].y - 1][this["coordinate"].x];

        break;
      case "D":
        target_elevation = this["elevations"][this["coordinate"].y + 1][this["coordinate"].x];

        break;
    }

    if (this["reversed"]) {
      return current_elevation <= target_elevation + 1;
    } else {
      return (current_elevation + 1) >= target_elevation;
    }
  }

  static check_unvisited(move) {
    var result = true;

    switch (move) {
      case "L":
        result = this["visited"][this["coordinate"].y][this["coordinate"].x - 1];

        break;
      case "R":
        result = this["visited"][this["coordinate"].y][this["coordinate"].x + 1];
        
        break;
      case "U":
        result = this["visited"][this["coordinate"].y - 1][this["coordinate"].x];

        break;
      case "D":
        result = this["visited"][this["coordinate"].y + 1][this["coordinate"].x];

        break;
    }

    return !result;
  }
}
