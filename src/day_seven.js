class DaySeven {

  static execute() {
    var lines = day_seven_data.split('\n');
    var current_folder_path = "";
    var folder_paths = [""];
    var folder_sizes = [0];
    var file_paths = [];

    lines.forEach((line) => {
      if (line.startsWith("$")) {
        var command_type = line.slice(2);

        if (command_type.startsWith("cd")) {
          var command_value = command_type.slice(3);

          if (command_value.startsWith("..")) {
            current_folder_path = current_folder_path.substring(0, current_folder_path.lastIndexOf("/"));
          } else if (command_value.startsWith("/")) {
            current_folder_path = "";
          } else {
            current_folder_path += "/" + command_value;
            this.addPath(current_folder_path, folder_paths, folder_sizes);
          }
        }
      } else {
        if (line.startsWith("dir")) {
          this.addPath(current_folder_path + "/" + line.split(" ")[1], folder_paths, folder_sizes);
        } else {
          this.recursivelyAddSize(line.split(" ")[1], parseInt(line.split(" ")[0]), current_folder_path, folder_paths, folder_sizes, file_paths);
        }
      }
    });

    var smaller_folders = folder_sizes.filter(element => element <= 100000);

    var required_space = 30000000 - (70000000 - folder_sizes[0]);
    var larger_folders = folder_sizes.filter(element => element >= required_space);
    larger_folders.sort((a, b) => a - b);

    return { part_one: smaller_folders.reduce((a, b) => a + b, 0), part_two: larger_folders[0] };
  }

  static addPath(folder_path, folder_paths, folder_sizes) {
    if (!folder_paths.includes(folder_path)) {
      folder_paths.push(folder_path)
      folder_sizes.push(0);
    }
  }

  static recursivelyAddSize(file_name, file_size, folder_path, folder_paths, folder_sizes, file_paths) {
    var full_file_path = folder_path + "/" + file_name;

    if (!file_paths.includes(full_file_path)) {
      var working_folder_path = folder_path;

      while (working_folder_path.includes("/")) {
        var path_index = folder_paths.indexOf(working_folder_path);
        folder_sizes[path_index] += file_size;
        working_folder_path = working_folder_path.substring(0, working_folder_path.lastIndexOf("/"));
      }
      folder_sizes[0] += file_size;

      file_paths.push(full_file_path);
    }
  }
}