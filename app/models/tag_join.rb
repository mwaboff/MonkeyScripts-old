# == Schema Information
#
# Table name: tag_joins
#
#  id         :integer          not null, primary key
#  script_id  :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class TagJoin < ActiveRecord::Base
  validates :script_id, presence: true
  validates :tag_id, presence: true

  belongs_to(:script)
  belongs_t(:tag)
end
