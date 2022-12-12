class DayTwelve {

  // TODO: refactor and apply DRY wherever possible

  static execute() {
    var rows = day_twelve_data.split('\n');
    var elevations = new Array();
    var start = {x: 0, y: 0};
    var end = {x: 0, y: 0};
    var active_paths = new Array();
    var wrong_paths = new Array();
    var completed_paths = new Array();

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

    active_paths.push({id: this.uuidv4(), x: start.x, y: start.y, steps: new Array()});
    var path_ids_to_remove = new Array();
    var new_active_paths = new Array();

    while (active_paths.length > 0) {
      active_paths.forEach((path) => {
        var possible_moves = ["L", "R", "U", "D"];
        var impossible_moves = new Array();

        if (path.x == 0) {
          impossible_moves.push("L");
        } else if (path.x == rows[0].length - 1) {
          impossible_moves.push("R");
        }
        if (path.y == 0) {
          impossible_moves.push("U");
        } else if (path.y == rows.length - 1) {
          impossible_moves.push("D");
        }

        possible_moves = possible_moves.filter(move => !impossible_moves.includes(move));
        var args = {path: path, elevations: elevations};
        possible_moves = possible_moves.filter(this.check_elevation_scalability, args);

        if (possible_moves.length > 0) {
          if (possible_moves.length > 1) {
            for (var i = 1; i < possible_moves.length; i++) {
              var new_path = JSON.parse(JSON.stringify(path));
              new_path.id = this.uuidv4();

              this.make_move(new_path, possible_moves[i]);
              var coordinate = new_path.x + "," + new_path.y;
              
              if (new_path.steps.includes(coordinate)) {
                wrong_paths.push(new_path);
              } else {
                new_path.steps.push(coordinate);

                if (new_path.x == end.x && new_path.y == end.y) {
                  completed_paths.push(new_path);
                } else {
                  new_active_paths.push(new_path);
                }
              }
            }
          }

          this.make_move(path, possible_moves[0]);
          var coordinate = path.x + "," + path.y;
              
          if (path.steps.includes(coordinate)) {
            wrong_paths.push(path);
            path_ids_to_remove.push(path.id);
          } else {
            path.steps.push(coordinate);

            if (path.x == end.x && path.y == end.y) {
              completed_paths.push(path);
              path_ids_to_remove.push(path.id);
            }
          }
        } else {
          wrong_paths.push(path);
          path_ids_to_remove.push(path.id);
        }
      });

      active_paths = active_paths.filter(path => !path_ids_to_remove.includes(path.id));
      path_ids_to_remove = new Array();
      
      active_paths = active_paths.concat(new_active_paths);
      new_active_paths = new Array();

      console.log("********************");
      console.log("Active paths: " + active_paths.length);
      console.log("Wrong paths: " + wrong_paths.length);
      console.log("Completed paths: " + completed_paths.length);
    }

    completed_paths.sort((a, b) => a.steps - b.steps);

    return { part_one: completed_paths.length > 0 ? completed_paths[0].steps.length : 0, part_two: 0 };
  }

  static check_elevation_scalability(move) {
    var current_elevation = this["elevations"][this["path"].y][this["path"].x];
    var target_elevation = null;

    switch (move) {
      case "L":
        target_elevation = this["elevations"][this["path"].y][this["path"].x - 1];

        break;
      case "R":
        target_elevation = this["elevations"][this["path"].y][this["path"].x + 1];
        
        break;
      case "U":
        target_elevation = this["elevations"][this["path"].y - 1][this["path"].x];

        break;
      case "D":
        target_elevation = this["elevations"][this["path"].y + 1][this["path"].x];

        break;
    }

    return (current_elevation + 1) >= target_elevation;
  }

  static make_move(path, move) {
    switch (move) {
      case "L":
        path.x -= 1;

        break;
      case "R":
        path.x += 1;

        break;
      case "U":
        path.y -= 1;

        break;
      case "D":
        path.y += 1;

        break;
    }
  }

  static uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}
