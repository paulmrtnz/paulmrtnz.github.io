require "minitest/autorun"
require_relative "test_helper"

class I18nParityTest < Minitest::Test
  def setup
    @fr = load_yaml("_data/i18n/fr.yml")
    @en = load_yaml("_data/i18n/en.yml")
  end

  def test_same_keys_in_both_languages
    assert_equal @fr.keys.sort, @en.keys.sort,
      "i18n keys differ between fr.yml and en.yml"
  end

  def test_months_arrays_have_twelve_entries
    assert_equal 12, @fr["months"].size, "fr.yml months should have 12 entries"
    assert_equal 12, @en["months"].size, "en.yml months should have 12 entries"
  end

  def test_no_blank_string_values
    [@fr, @en].each do |data|
      data.each do |key, value|
        next if value.is_a?(Array)
        refute value.nil? || value.to_s.strip.empty?, "i18n key '#{key}' has a blank value"
      end
    end
  end
end
