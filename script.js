// とにかく確実に動くシンプル版パスコードロック
window.addEventListener("load", function () {
  var lockScreen = document.getElementById("lock-screen");
  var app = document.getElementById("app");
  var input = document.getElementById("accessCode");
  var button = document.getElementById("unlockButton");
  var message = document.getElementById("lockMessage");

  // 要素がなければ何もしない（エラー防止）
  if (!lockScreen || !app || !input || !button || !message) {
    return;
  }

  // ★ここが暗証番号（好きなものに変えてOK）
  var ACCESS_CODE = "ofa2025";

  function unlock() {
    var value = (input.value || "").trim();
    if (value === ACCESS_CODE) {
      // 成功 → ロック画面を隠してアプリ本体を表示
      lockScreen.classList.add("hidden");
      app.classList.remove("hidden");
      message.textContent = "";
    } else {
      // 失敗
      message.textContent = "パスコードが違います。もう一度入力してください。";
      input.value = "";
      input.focus();
    }
  }

  // ボタンを押したとき
  button.addEventListener("click", unlock);

  // Enterキーでもログイン
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      unlock();
    }
  });
});
