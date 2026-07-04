require "minitest/autorun"
require_relative "test_helper"

# Guards _data/photos.yml entries (Cloudinary-backed photo gallery) against
# missing required fields, and flags the common setup mistake of adding real
# photo entries while _config.yml still has the Cloudinary placeholder cloud
# name (photos would silently 404 in production).
class PhotosTest < Minitest::Test
  def setup
    @photos = load_yaml("_data/photos.yml") || []
    @config = load_yaml("_config.yml")
  end

  def test_photos_yml_loads_as_array
    assert_kind_of Array, @photos, "_data/photos.yml should be a YAML list (or empty)"
  end

  def test_every_photo_has_required_fields
    @photos.each do |photo|
      %w[id alt].each do |field|
        refute_nil photo[field], "photos.yml: entry #{photo.inspect} is missing '#{field}'"
        refute photo[field].to_s.strip.empty?,
          "photos.yml: entry #{photo.inspect} has a blank '#{field}'"
      end
    end
  end

  def test_photo_ids_do_not_include_file_extension
    @photos.each do |photo|
      refute_match(/\.(jpe?g|png|webp|gif|avif)\z/i, photo["id"].to_s,
        "photos.yml: id #{photo['id'].inspect} should be a Cloudinary public ID without a file extension")
    end
  end

  def test_photo_ids_are_unique
    ids = @photos.map { |p| p["id"] }
    assert_equal ids.uniq, ids, "photos.yml: duplicate Cloudinary public IDs found"
  end

  def test_cloudinary_cloud_name_configured_when_photos_present
    skip "no photos defined yet" if @photos.empty?
    cloud_name = @config["cloudinary_cloud_name"]
    refute_nil cloud_name, "_config.yml is missing 'cloudinary_cloud_name'"
    refute_equal "your-cloud-name", cloud_name,
      "_data/photos.yml has entries but _config.yml still has the Cloudinary placeholder cloud name — set the real cloud name before deploying"
  end
end
