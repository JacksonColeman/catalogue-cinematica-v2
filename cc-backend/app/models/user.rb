class User < ApplicationRecord
    validates :username, presence: true, length: { minimum: 3, maximum: 30 }
    validates :password, presence: true, length: { minimum: 8 }
    validate :password_complexity
    has_many :likes, dependent: :destroy
    has_many :reviews, dependent: :destroy
  
    has_secure_password
  
    private
  
    def password_complexity
      return unless password.present?
  
      unless password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)
        errors.add(:password, "must include at least one uppercase letter, one lowercase letter, one digit, and one special character")
      end
    end
  end