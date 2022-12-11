class DayNine {

  static execute() {
    var motions = day_nine_data.split('\n');
    var knot_coordinates = null;
    var coordinate_log_one = new Array();
    var coordinate_log_two = new Array();

    knot_coordinates = [{ x: 0, y: 0}, { x: 0, y: 0}];

    motions.forEach((motion) => {
      this.moveRope(motion, knot_coordinates, coordinate_log_one);
    });

    knot_coordinates = [{ x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}, { x: 0, y: 0}];
    
    motions.forEach((motion) => {
      this.moveRope(motion, knot_coordinates, coordinate_log_two);
    });

    return { part_one: coordinate_log_one.length, part_two: coordinate_log_two.length };
  }

  static moveRope(motion, knot_coordinates, coordinate_log) {
    var motion_properties = motion.split(" ");
    var direction = motion_properties[0];
    var steps = parseInt(motion_properties[1]);
    var head_coordinate = knot_coordinates[0];

    for (var i = 0; i < steps; i++) {
      // TODO: swap the switch for a mapping?
      switch (direction) {
        case "L":
          head_coordinate.x -= 1;
          
          break;
        case "R":
          head_coordinate.x += 1;
          
          break;
        case "U":
          head_coordinate.y += 1;

          break;
        case "D":
          head_coordinate.y -= 1;

          break;
      }

      for (var j = 0; j < knot_coordinates.length - 1; j++) {
        this.updateKnotPositions(knot_coordinates[j], knot_coordinates[j + 1]);
      }
      
      var tail_coordinate = knot_coordinates[knot_coordinates.length - 1];
      var tail_coordinate_string = tail_coordinate.x + "," + tail_coordinate.y;
      if (!coordinate_log.includes(tail_coordinate_string)) {
        coordinate_log.push(tail_coordinate_string);
      }
    }
  }

  // TODO: rename these arguments
  // TODO: refactor/DRY
  static updateKnotPositions(head_coordinate, tail_coordinate) {
    if (head_coordinate.y - tail_coordinate.y > 1) {
      if (head_coordinate.x > tail_coordinate.x) {
        tail_coordinate.x += 1;
      } else if (head_coordinate.x < tail_coordinate.x) {
        tail_coordinate.x -= 1;
      }
      tail_coordinate.y += 1;
    } else if (tail_coordinate.y - head_coordinate.y > 1) {
      if (head_coordinate.x > tail_coordinate.x) {
        tail_coordinate.x += 1;
      } else if (head_coordinate.x < tail_coordinate.x) {
        tail_coordinate.x -= 1;
      }
      tail_coordinate.y -= 1;
    } else if (head_coordinate.x - tail_coordinate.x > 1) {
      if (head_coordinate.y > tail_coordinate.y) {
        tail_coordinate.y += 1;
      } else if (head_coordinate.y < tail_coordinate.y) {
        tail_coordinate.y -= 1;
      }
      tail_coordinate.x += 1;
    } else if (tail_coordinate.x - head_coordinate.x > 1) {
      if (head_coordinate.y > tail_coordinate.y) {
        tail_coordinate.y += 1;
      } else if (head_coordinate.y < tail_coordinate.y) {
        tail_coordinate.y -= 1;
      }
      tail_coordinate.x -= 1;
    }
  }
}
