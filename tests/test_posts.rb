require "minitest/autorun"
require "date"
require_relative "test_helper"

class PostsTest < Minitest::Test
  POSTS_DIR = File.join(SRC_ROOT, "_posts")

  def post_files
    Dir.glob(File.join(POSTS_DIR, "*.md")).sort
  end

  def front_matter(path)
    match = File.read(path)[/\A---\n(.*?)\n---/m, 1]
    refute_nil match, "#{File.basename(path)} is missing YAML front matter"
    YAML.safe_load(match, permitted_classes: [Date])
  end

  def test_at_least_one_post_exists
    refute_empty post_files, "no posts found in _posts/"
  end

  def test_filenames_follow_date_prefix_convention
    post_files.each do |path|
      filename = File.basename(path)
      assert_match(/\A\d{4}-\d{2}-\d{2}-.+\.md\z/, filename,
        "#{filename} does not follow the YYYY-MM-DD-title.md naming convention")
    end
  end

  def test_front_matter_has_title_and_date
    post_files.each do |path|
      data = front_matter(path)
      assert data["title"] && !data["title"].to_s.strip.empty?,
        "#{File.basename(path)} front matter is missing 'title'"
      refute_nil data["date"], "#{File.basename(path)} front matter is missing 'date'"
    end
  end

  def test_lang_is_fr_or_en_when_present
    post_files.each do |path|
      data = front_matter(path)
      next unless data.key?("lang")
      assert_includes %w[fr en], data["lang"],
        "#{File.basename(path)} has an unexpected 'lang' value: #{data['lang'].inspect}"
    end
  end
end
