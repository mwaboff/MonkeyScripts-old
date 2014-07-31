# == Schema Information
#
# Table name: tag_joins
#
#  id         :integer          not null, primary key
#  script_id  :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime
#  updated_at :datetime
#  value      :integer
#

class TagJoin < ActiveRecord::Base
  validates :script_id, presence: true
  validates :tag_id, presence: true
  validates :value, presence: true

  belongs_to(:script)
  belongs_to(:tag)

  # Ranking Algorithm Scores
  TAG_SCORES = {
    title: 5,
    short_desc: 3,
    description: 1,
    author: 10
  }

  def self.score(query)
    TAG_SCORES[query]
  end
end
