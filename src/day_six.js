class DaySix {

  static execute() {
    var data = day_six_data;
    
    return { part_one: this.scan_message(data, 4), part_two: this.scan_message(data, 14) };
  }

  static scan_message(data, scan_length) {
    var first_marker = 0;

    for (var i = 0; i < data.length - scan_length; i++) {
      var scan_content = data.substring(i, i + scan_length);
      var match_found = false;

      for (var j = 0; j < scan_length - 1; j++) {
        var left_hand_side = scan_content.charAt(j);
        var right_hand_side = scan_content.substring(j + 1);

        match_found = right_hand_side.includes(left_hand_side);

        if (match_found) {
          break;
        }
      }

      if (!match_found) {
        first_marker = i + scan_length;

        break;
      }
    }

    return first_marker;
  }
}
