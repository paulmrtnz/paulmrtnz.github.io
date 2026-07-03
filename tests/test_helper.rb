require "yaml"

SRC_ROOT = File.expand_path("../src", __dir__)

def load_yaml(relative_path)
  YAML.load_file(File.join(SRC_ROOT, relative_path))
end
