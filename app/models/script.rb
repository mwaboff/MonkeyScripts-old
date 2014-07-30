# == Schema Information
#
# Table name: scripts
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  user_id     :string(255)      not null
#  description :text
#  code        :text
#  downloads   :integer          default(0)
#  created_at  :datetime
#  updated_at  :datetime
#  short_desc  :text             not null
#

class Script < ActiveRecord::Base
  validates :title, presence: true
  validates :user_id, presence: true

  has_many(:tag_joins)
  has_many(:tags,
    through: :tag_joins,
    source: :tag)

  belongs_to(:owner,
    class_name: "User",
    primary_key: :id,
    foreign_key: :user_id)

  def isOwner?(aUser)
    user_id == aUser.id
  end
end
