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
#

class Script < ActiveRecord::Base
  validates :title, presence: true
  validates :user_id, presence: true

  belongs_to(:user)

  def isOwner?(aUser)
    user_id == aUser.id
  end
end
