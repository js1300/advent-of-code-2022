class DayNine {

  static execute() {
    var motions = day_nine_data.split('\n');
    var head_coordinate = { x: 0, y: 0};
    var tail_coordinate = { x: 0, y: 0};
    var coordinate_log = new Array();

    motions.forEach((motion) => {
      var motion_properties = motion.split(" ");
      var direction = motion_properties[0];
      var steps = parseInt(motion_properties[1]);

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

        this.updateTailPosition(head_coordinate, tail_coordinate);
        
        var tail_coordinate_string = tail_coordinate.x + "," + tail_coordinate.y;
        if (!coordinate_log.includes(tail_coordinate_string)) {
          coordinate_log.push(tail_coordinate_string);
        }
      }
    });

    return { part_one: coordinate_log.length, part_two: 0 };
  }

  static updateTailPosition(head_coordinate, tail_coordinate) {
    if (head_coordinate.y - tail_coordinate.y > 1) {
      if (head_coordinate.x != tail_coordinate.x) {
        tail_coordinate.x = head_coordinate.x;
      }
      tail_coordinate.y += 1;
    } else if (tail_coordinate.y - head_coordinate.y > 1) {
      if (head_coordinate.x != tail_coordinate.x) {
        tail_coordinate.x = head_coordinate.x;
      }
      tail_coordinate.y -= 1;
    } else if (head_coordinate.x - tail_coordinate.x > 1) {
      if (head_coordinate.y != tail_coordinate.y) {
        tail_coordinate.y = head_coordinate.y;
      }
      tail_coordinate.x += 1;
    } else if (tail_coordinate.x - head_coordinate.x > 1) {
      if (head_coordinate.y != tail_coordinate.y) {
        tail_coordinate.y = head_coordinate.y;
      }
      tail_coordinate.x -= 1;
    }
  }
}
