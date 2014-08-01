# == Schema Information
#
# Table name: scripts
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text
#  code        :text
#  downloads   :integer          default(0)
#  created_at  :datetime
#  updated_at  :datetime
#  short_desc  :text             not null
#  user_id     :integer          not null

class Script < ActiveRecord::Base
  validates :title, presence: true
  validates :user_id, presence: true
  validates :code, presence: true
  validates :short_desc, length: { maximum: 140, allow_nil: true }

  has_many(:tag_joins)
  has_many(:tags,
    through: :tag_joins,
    source: :tag)

  belongs_to(:owner,
    class_name: "User",
    primary_key: :id,
    foreign_key: :user_id)

  PREPOSITIONS = ["and", "as", "at", "but", "by", "for", "in", "into", "like", "more", "of", "off", "on", "onto", "per", "to", "up", "via", "with", "within"]

  def isOwner?(aUser)
    user_id == aUser.id
  end

  def build_tags!
    # Destroy all previous links to tags so we can rebuild it all.
    tag_joins.destroy_all

    combined_tags = Hash.new(0)
    all_tags = tag_script_data(title, TagJoin.score(:title)) + 
               tag_script_data(short_desc, TagJoin.score(:short_desc)) +
               tag_script_data(description, TagJoin.score(:description))

    all_tags.each{|tag_name, score| combined_tags[tag_name] += score}

    # Add author name
    combined_tags[owner.username] = TagJoin.score(:author)

    combined_tags.each do |key, val|
      key_tag = Tag.find_by_tag_name(key)
      unless(key_tag)
        key_tag = Tag.create({tag_name: key})
      end

      TagJoin.create({script_id: id, tag_id: key_tag.id, value: val})
    end
  end

  private
  def validTag?(word)
    if word.length > 1
      unless PREPOSITIONS.include?(word)
        return true
      end
    end
    false
  end

  def tag_script_data(section, score)
    results = []
    section.downcase.split(/\W/).each do |split_word|
      if validTag?(split_word)
        results.append([split_word.stem, score])
      end
    end
    results
  end
end
