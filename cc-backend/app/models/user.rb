class User < ApplicationRecord
    validates :username, presence: true, length: { minimum: 3, maximum: 30 }
    validates :password, presence: true, length: { minimum: 8 }
    validate :password_complexity
    has_many :likes, dependent: :destroy
    has_many :reviews, dependent: :destroy
    has_many :movie_lists, dependent: :destroy
  
    has_secure_password

    after_create :create_default_lists
  
    private
  
    def password_complexity
      return unless password.present?
  
      unless password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)
        errors.add(:password, "must include at least one uppercase letter, one lowercase letter, one digit, and one special character")
      end
    end

    def create_default_lists
        MovieList.create(user: self, name: 'Favorites', deletable: false)
        MovieList.create(user: self, name: 'Watchlist', deletable: false)
      end
  end