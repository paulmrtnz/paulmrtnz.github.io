require "minitest/autorun"
require_relative "test_helper"

# Guards against the exact class of bug found during manual review:
# FR and EN content drifting out of sync (extra/missing projects, mismatched
# featured flags) since nothing in Jekyll enforces parity between languages.
class DataParityTest < Minitest::Test
  LANGS = %w[fr en].freeze

  def setup
    @projects = LANGS.to_h { |lang| [lang, load_yaml("_data/#{lang}/projects.yml")] }
    @profiles = LANGS.to_h { |lang| [lang, load_yaml("_data/#{lang}/profile.yml")] }
  end

  def test_same_number_of_projects_per_language
    counts = @projects.transform_values(&:size)
    assert_equal counts["fr"], counts["en"],
      "FR has #{counts['fr']} projects but EN has #{counts['en']} " \
      "(commented-out entries in projects.yml must match on both sides)"
  end

  def test_featured_flags_match_by_position
    fr_featured = @projects["fr"].map { |p| !!p["featured"] }
    en_featured = @projects["en"].map { |p| !!p["featured"] }
    assert_equal fr_featured, en_featured,
      "featured flags differ between FR and EN projects.yml (compared by list position)"
  end

  def test_every_project_has_required_fields
    LANGS.each do |lang|
      @projects[lang].each do |project|
        %w[titre date description tags liens].each do |field|
          refute_nil project[field],
            "#{lang}/projects.yml: project #{project['titre'].inspect} is missing '#{field}'"
        end
      end
    end
  end

  def test_project_links_have_url_and_label
    LANGS.each do |lang|
      @projects[lang].each do |project|
        Array(project["liens"]).each do |lien|
          assert lien["url"], "#{lang}/projects.yml: #{project['titre']} has a lien without a url"
          assert lien["label"], "#{lang}/projects.yml: #{project['titre']} has a lien without a label"
        end
      end
    end
  end

  def test_profile_has_required_fields
    LANGS.each do |lang|
      %w[name hook description].each do |field|
        refute_nil @profiles[lang][field], "#{lang}/profile.yml is missing '#{field}'"
      end
    end
  end
end
