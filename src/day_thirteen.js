class DayThirteen {

  static execute() {
    var packet_pairs = day_thirteen_data.split('\n\n');
    var correctly_ordered = new Array();
    var divider_packets = [[[2]], [[6]]];
    var all_packets = new Array();

    all_packets = all_packets.concat(divider_packets);

    for (var i = 0; i < packet_pairs.length; i++) {
      var packets = packet_pairs[i].split('\n');
      var left_packet = eval(packets[0]);
      var right_packet = eval(packets[1]);

      if (this.recursive_compare(left_packet, right_packet)) {
        correctly_ordered.push(i + 1);
      }

      all_packets.push(left_packet);
      all_packets.push(right_packet);
    }

    all_packets.sort((a, b) => this.recursive_compare(b, a));
    
    return { part_one: correctly_ordered.reduce((a, b) => a + b, 0), part_two: (all_packets.indexOf(divider_packets[0]) + 1) * (all_packets.indexOf(divider_packets[1]) + 1) };
  }

  static recursive_compare(left, right) {
    var left_is_array = Array.isArray(left);
    var right_is_array = Array.isArray(right);

    if (!left_is_array && !right_is_array) {
      if (left < right) {
        return true;
      } else if (left > right) {
        return false;
      } else {
        return undefined;
      }
    } else if (left_is_array && right_is_array) {
      var limit = Math.max(left.length, right.length);

      for (var i = 0; i < limit; i++) {
        if (i > left.length - 1) {
          return true;
        } else if (i > right.length - 1) {
          return false;
        }

        var result = this.recursive_compare(left[i], right[i]);

        if (result != undefined) {
          return result;
        }
      }

      return undefined;
    } else {
      var result = null;

      if (left_is_array) {
        result = this.recursive_compare(left, [right]);
      } else {
        result = this.recursive_compare([left], right);
      }

      if (result != undefined) {
        return result;
      }
    }
  }
}
