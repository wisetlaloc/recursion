// Recursion のコードシェアにポストする際の補助ツール
// 提出したコードのソースの画面で、このスクリプトを保存したブックマークレットを実行すると
// 以下のようなテキストをクリップボードに追加する。
// ```
// ID 227 文字列の圧縮 JavaScript
// https://recursionist.io/dashboard/problems/submissions/24709
// ```

// javascript:
const url = location.href
const ids = document.querySelector('h3 > a').href.match(/\d+/g)
const id = ids[ids.length-1]
const ttl = document.querySelector('h3 > a').textContent
const lang = document.querySelector('.rem1:nth-child(2)').textContent
const newTextArea = document.createElement('textarea')
const container = document.querySelector('.dashboard-content .container .container')
container.appendChild(newTextArea)
newTextArea.textContent = `\`\`\`\nID ${id} ${ttl} ${lang}\n${url}\n\`\`\``
newTextArea.focus()
newTextArea.select()
try {
  const success = document.execCommand('copy')
  const msg = success ? 'クリップボードにコードシェア用のテキストを貼り付けました。' : 'コードシェア用のテキストのコピーに失敗しました。'
  alert(msg)
} catch (err) {
  alert('何らかのエラーでコピーに失敗しました。')
}
newTextArea.style = 'display: none;'
