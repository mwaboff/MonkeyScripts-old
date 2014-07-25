# == Schema Information
#
# Table name: users
#
#  id             :integer          not null, primary key
#  email          :string(255)      not null
#  username       :string(255)      not null
#  encrypted_pass :string(255)      not null
#  session_token  :string(255)      not null
#  created_at     :datetime
#  updated_at     :datetime
#

class User < ActiveRecord::Base
  before_validation :set_session_token
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :encrypted_pass, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :session_token, presence: true

  has_many(:scripts)
  
  def self.find_by_credentials(name, pass)
    found_user = User.find_by_username(name)
    if found_user
      found_user = nil unless found_user.is_password?(pass)
    end
    
    found_user
  end
  
  def set_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
  
  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end
  
  def password=(new_pass)
    @password = new_pass
    self.encrypted_pass = BCrypt::Password.create(new_pass)
  end
  
  def is_password?(some_pass)
    BCrypt::Password.new(self.encrypted_pass).is_password?(some_pass)
  end
  
  private
  attr_reader :password
end
