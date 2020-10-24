// string型 username: ユーザーネーム
// string型 firstName: ユーザーの苗字
// string型 lastName: ユーザーの名前
// string型 email: 登録されたEメールアドレス
// string型 passwordHashed: ユーザーログインの確認に使われるハッシュ化されたパスワード
// int型 birthMonth: ユーザーが生まれた月。
// int型 birthYear: ユーザーが生まれた年
// string型 biographyDescription: ユーザーのプロフィールのbio
// string型 favoriteHikingLocation: ユーザーのお気に入りのハイキング場所

// 挙動
// getFullName() -> string型: ユーザーのフルネームを返します。
// getAge() -> int型: ユーザーの年齢を返します。
// birthdayCalculator() -> int型: 誕生日まであと何ヶ月あるか計算して返します。
// showProfile() -> string型: ユーザーのプロフィールを返します。
// confirmPassword(string passwordString) -> boolean型:
// 指定したpasswordStringが保存したpasswordHashedと一致しているかをブーリアン値で返します。
// セキュリティのために、パスワードのハッシュ化されたバージョンがメモリ内の状態に保存されることに注意してください。
// パスワードを文字列として受け取り、その文字列をマップし、ハッシュ化されたパスワードhashedPassword返す関数を使う必要があります。

class User {
  constructor(username, firstName, lastName, email, password, birthMonth, birthYear, biographyDescription,
      favoriteHikingLocation) {
    this.username = username
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.passwordHashed = hashPassword(password)
    this.birthMonth = birthMonth
    this.birthYear = birthYear
    this.biographyDescription = biographyDescription
    this.favoriteHikingLocation = favoriteHikingLocation
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  getAge() {
    return Date.now() - Date.new(this.birthYear, this.birthMonth, 1)
  }

  birthdayCalculator() {
    return (Date.now().getMonth() - Date.new(this.birthYear, this.birthMonth, 1).getMonth()) % 12
  }

  showProfile() {
    return `Username: ${this.username}\nAge: ${this.getAge()}\n` +
      `Bio: ${this.biographyDescription}\nFavoriteHikingLocation: ${this.favoriteHikingLocation}`
  }

  confirmPassword(passwordInput) {
    return this.hashPassword(passwordInput) === this.passwordHashed
  }

  hashPassword(password) {
    let hash = 0
    for (let i = 0; i < password.length; i++) {
      const character = password.charCodeAt(i)
      hash = ((hash<<5)-hash)+character
      hash = hash & hash
    }
    return Math.abs(hash)
  }
}

const claire = new User('clarireS', 'Claire', 'Simmons', 'clairesimmons@gmail.com', 'lmnlmn', 9, 2007,
    'Passionate gamer. Evil internet aficionado. Student. Friendly tv specialist. Introvert.', 'Hollywood Sign Hike')
console.log(claire.getFullName())
console.log(claire.getAge())
console.log(claire.getAge())
console.log(claire.birthdayCalculator())
console.log(claire.showProfile())
console.log(claire.confirmPassword('lmnlmn'))

// claireS
// Claire
// Simmons
// clairesimmons@gmail.com
// lmnlmn
// 9
// 2007
// Passionate gamer. Evil internet aficionado. Student. Friendly tv specialist. Introvert.
// Hollywood Sign Hike
